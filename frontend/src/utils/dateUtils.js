// Nepali Date Converter (Bikram Sambat)
// Reference: https://www.ashesh.com.np/nepali-calendar/

const bsMonths = [
  'बैशाख', 'जेष्ठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन',
  'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'
]

const bsMonthsEn = [
  'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
]

const bsDaysOfWeek = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार']
const bsDaysOfWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// BS year data (days in each month for BS years 2000-2090)
const bsCalendarData = {
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2081: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2083: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2084: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2085: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2086: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2087: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
  2088: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2089: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2090: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]
}

// Reference date: 2000-01-01 BS (Baisakh 1) = 1943-04-14 AD (April 14)
const refBsYear = 2000
const refAdDate = new Date(1943, 3, 14) // April 14, 1943 (month is 0-indexed: 3 = April)

function getTotalDaysInBsYear(year) {
  const monthDays = bsCalendarData[year]
  if (!monthDays) {
    // Log warning and use approximate fallback for years outside range
    console.warn(`BS calendar data not available for year ${year}, using approximate value`)
    return 365
  }
  return monthDays.reduce((sum, days) => sum + days, 0)
}

function convertAdToBs(adDate) {
  const date = new Date(adDate)
  const diffDays = Math.floor((date - refAdDate) / (1000 * 60 * 60 * 24))
  
  let bsYear = refBsYear
  let remainingDays = diffDays
  
  // Add days from reference year
  while (remainingDays >= getTotalDaysInBsYear(bsYear)) {
    remainingDays -= getTotalDaysInBsYear(bsYear)
    bsYear++
  }
  
  // Find month and day
  let bsMonth = 0
  const monthDays = bsCalendarData[bsYear] || [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]
  
  while (remainingDays >= monthDays[bsMonth]) {
    remainingDays -= monthDays[bsMonth]
    bsMonth++
  }
  
  return {
    year: bsYear,
    month: bsMonth + 1,
    day: remainingDays + 1,
    dayOfWeek: date.getDay()
  }
}

export function formatNepaliDate(adDate, format = 'full', lang = 'ne') {
  const bs = convertAdToBs(adDate)
  const months = lang === 'ne' ? bsMonths : bsMonthsEn
  const days = lang === 'ne' ? bsDaysOfWeek : bsDaysOfWeekEn
  
  switch (format) {
    case 'full':
      return `${bs.day} ${months[bs.month - 1]}, ${bs.year} (${days[bs.dayOfWeek]})`
    case 'short':
      return `${bs.day} ${months[bs.month - 1]}, ${bs.year}`
    case 'numeric':
      return `${bs.year}/${String(bs.month).padStart(2, '0')}/${String(bs.day).padStart(2, '0')}`
    default:
      return `${bs.day} ${months[bs.month - 1]}, ${bs.year}`
  }
}

export function formatEnglishDate(date, format = 'full') {
  const d = new Date(date)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  switch (format) {
    case 'full':
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} (${days[d.getDay()]})`
    case 'short':
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    case 'numeric':
      return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
    default:
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  }
}

export function formatDate(date, format = 'short', dateSystem = 'AD') {
  if (dateSystem === 'BS') {
    return formatNepaliDate(date, format, 'en')
  }
  return formatEnglishDate(date, format)
}

export function getCurrentNepaliDate() {
  return formatNepaliDate(new Date(), 'full', 'ne')
}

export function getCurrentEnglishDate() {
  return formatEnglishDate(new Date(), 'full')
}
