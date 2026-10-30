// End-to-end API tests against an in-memory MongoDB.
//   npm test
const { test, before, after } = require('node:test')
const assert = require('node:assert/strict')

process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-secret-that-is-long-enough-for-tests-123'
process.env.ALLOWED_ORIGINS = 'http://localhost:5173'
process.env.GITHUB_TOKEN = ''

const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const request = require('supertest')
const { connectDB } = require('../src/config/db')
const { createApp } = require('../src/app')
const { seedContent, ensureAdmin } = require('../src/lib/seed')
const { content, Profile, Message } = require('../src/models')

let mongo
let app
let token
const ADMIN = { email: 'admin@example.test', password: 'correct-horse-battery' }

before(async () => {
  mongo = await MongoMemoryServer.create()
  await connectDB(mongo.getUri('test'))
  await Promise.all(Object.values(content).map((M) => M.init()))
  await ensureAdmin({ ...ADMIN, log: () => {} })
  await seedContent({ log: () => {} })
  app = createApp()
})

after(async () => {
  await mongoose.disconnect()
  await mongo.stop()
})

test('starter content is loaded from the frontend defaults', async () => {
  assert.equal(await content.projects.countDocuments(), 5)
  assert.equal(await content.skills.countDocuments(), 4)
  assert.ok(await Profile.findOne({ name: 'Amir Bahadur Shrestha' }))
  // Running the seed again changes nothing
  assert.deepEqual(await seedContent({ log: () => {} }), [])
})

test('public content returns published items in order, without internal fields', async () => {
  const res = await request(app).get('/api/content').expect(200)
  assert.equal(res.body.projects[0].title, 'Nevan Handicraft Store')
  assert.equal(res.body.profile.name, 'Amir Bahadur Shrestha')
  assert.equal(res.body.profile.stats.length, 4)
  assert.ok(res.body.projects[0].id)
  for (const key of ['_id', 'isPublished', 'order', 'createdAt']) {
    assert.equal(key in res.body.projects[0], false, `${key} should be hidden`)
  }
  assert.deepEqual(res.body.skills[0].items.slice(0, 1), ['Full MERN Architecture'])
})

test('login rejects wrong passwords and accepts the right one', async () => {
  await request(app).post('/api/auth/login').send({ email: ADMIN.email, password: 'nope' }).expect(401)
  // NoSQL injection attempt is not treated as a match
  await request(app).post('/api/auth/login').send({ email: { $ne: null }, password: { $ne: null } }).expect(400)
  const res = await request(app).post('/api/auth/login').send(ADMIN).expect(200)
  assert.ok(res.body.token)
  token = res.body.token
})

test('admin routes require a valid token', async () => {
  await request(app).get('/api/admin/summary').expect(401)
  await request(app).get('/api/admin/summary').set('Authorization', 'Bearer not-a-token').expect(401)
  const res = await request(app).get('/api/admin/summary').set('Authorization', `Bearer ${token}`).expect(200)
  assert.equal(res.body.counts.projects, 5)
})

test('create, update, unpublish and delete a project', async () => {
  const auth = { Authorization: `Bearer ${token}` }
  const bad = await request(app).post('/api/admin/projects').set(auth).send({ title: 'No slug' }).expect(400)
  assert.ok(bad.body.fields.slug)

  const created = await request(app).post('/api/admin/projects').set(auth)
    .send({ title: 'Test Project', slug: 'test-project', description: 'A test', _id: 'ignored', evil: 'ignored' })
    .expect(201)
  const id = created.body.item.id
  assert.equal(created.body.item.evil, undefined)
  assert.equal(created.body.item.order, 5)

  await request(app).post('/api/admin/projects').set(auth)
    .send({ title: 'Dup', slug: 'test-project', description: 'x' }).expect(409)

  await request(app).put(`/api/admin/projects/${id}`).set(auth).send({ isPublished: false }).expect(200)
  const pub = await request(app).get('/api/content').expect(200)
  assert.equal(pub.body.projects.some((p) => p.slug === 'test-project'), false)

  await request(app).delete(`/api/admin/projects/${id}`).set(auth).expect(204)
  await request(app).get(`/api/admin/projects/${id}`).set(auth).expect(404)
  await request(app).get('/api/admin/projects/not-an-id').set(auth).expect(404)
})

test('profile can be edited', async () => {
  const auth = { Authorization: `Bearer ${token}` }
  const res = await request(app).put('/api/admin/profile').set(auth)
    .send({ stats: [{ value: '5', label: 'Live projects' }] }).expect(200)
  assert.deepEqual(res.body.item.stats, [{ value: '5', label: 'Live projects' }])
  assert.equal(res.body.item.name, 'Amir Bahadur Shrestha')
})

test('reorder changes the list order and marks content as changed', async () => {
  const auth = { Authorization: `Bearer ${token}` }
  const before = await request(app).get('/api/admin/summary').set(auth).expect(200)
  const list = await request(app).get('/api/admin/services').set(auth).expect(200)
  const ids = list.body.items.map((s) => s.id).reverse()

  for (const bad of [{}, { ids: [] }, { ids: ['not-an-id'] }, { ids: [ids[0], ids[0]] }, { ids: [{ $ne: null }] }]) {
    await request(app).put('/api/admin/services/reorder').set(auth).send(bad).expect(400)
  }

  const res = await request(app).put('/api/admin/services/reorder').set(auth).send({ ids }).expect(200)
  assert.deepEqual(res.body.items.map((s) => s.id), ids)
  const pub = await request(app).get('/api/content').expect(200)
  assert.equal(pub.body.services[0].title, list.body.items.at(-1).title)

  const after = await request(app).get('/api/admin/summary').set(auth).expect(200)
  assert.ok(after.body.contentUpdatedAt)
  assert.ok(!before.body.contentUpdatedAt || new Date(after.body.contentUpdatedAt) >= new Date(before.body.contentUpdatedAt))
})

test('contact form saves messages; honeypot and bad input are handled', async () => {
  await request(app).post('/api/contact')
    .send({ name: 'Visitor', email: 'v@example.com', subject: 'project', message: 'Hello', status: 'replied' })
    .expect(201)
  const saved = await Message.findOne({ email: 'v@example.com' })
  assert.equal(saved.status, 'new', 'visitors cannot set the status')

  await request(app).post('/api/contact').send({ name: 'Bot', email: 'b@example.com', message: 'spam', website: 'x' }).expect(201)
  assert.equal(await Message.countDocuments({ name: 'Bot' }), 0)

  await request(app).post('/api/contact').send({ name: 'X', email: 'not-an-email', message: 'Hi' }).expect(400)

  const auth = { Authorization: `Bearer ${token}` }
  const inbox = await request(app).get('/api/admin/messages').set(auth).expect(200)
  assert.equal(inbox.body.items.length, 1)
  await request(app).put(`/api/admin/messages/${saved.id}`).set(auth).send({ status: 'read' }).expect(200)
})

test('publish explains when GitHub is not configured', async () => {
  const res = await request(app).post('/api/admin/publish').set('Authorization', `Bearer ${token}`).expect(501)
  assert.match(res.body.error, /GITHUB_TOKEN/)
})

test('CORS blocks unknown websites and allows the configured one', async () => {
  await request(app).get('/api/health').set('Origin', 'https://evil.example').expect(403)
  const ok = await request(app).get('/api/health').set('Origin', 'http://localhost:5173').expect(200)
  assert.equal(ok.headers['access-control-allow-origin'], 'http://localhost:5173')
})

test('password change needs the current password', async () => {
  const auth = { Authorization: `Bearer ${token}` }
  await request(app).put('/api/auth/password').set(auth).send({ currentPassword: 'wrong', newPassword: 'another-long-pass' }).expect(400)
  await request(app).put('/api/auth/password').set(auth).send({ currentPassword: ADMIN.password, newPassword: 'short' }).expect(400)
  await request(app).put('/api/auth/password').set(auth).send({ currentPassword: ADMIN.password, newPassword: 'another-long-pass' }).expect(200)
  await request(app).post('/api/auth/login').send({ email: ADMIN.email, password: 'another-long-pass' }).expect(200)
})
