const env = require('../config/env')

const EVENT = 'cms-publish'

function actionsUrl() {
  return `https://github.com/${env.githubRepo}/actions`
}

// Asks GitHub to run the deploy workflow, which pulls fresh content from
// this API and rebuilds the site. Needs a token with Contents: write.
async function triggerPublish(fetchImpl = fetch) {
  if (!env.githubToken) {
    const err = new Error('Publishing is not set up: GITHUB_TOKEN is missing on the server')
    err.status = 501
    err.expose = true
    throw err
  }

  const response = await fetchImpl(`https://api.github.com/repos/${env.githubRepo}/dispatches`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${env.githubToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'amirlearner-cms'
    },
    body: JSON.stringify({ event_type: EVENT })
  })

  if (response.status !== 204) {
    const text = await response.text().catch(() => '')
    const err = new Error(`GitHub refused the publish request (${response.status}). Check the token and repository name.`)
    err.status = 502
    err.expose = true
    err.detail = text.slice(0, 300)
    throw err
  }

  return { actionsUrl: actionsUrl() }
}

module.exports = { triggerPublish, actionsUrl, EVENT }
