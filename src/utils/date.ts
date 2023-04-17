function getTimegap(nowdate: Date, agodate: Date): string {
  let now = {
    year: nowdate.getFullYear(),
    month: nowdate.getMonth() + 1,
    day: nowdate.getDate(),
  }
  let ago = {
    year: agodate.getFullYear(),
    month: agodate.getMonth() + 1,
    day: agodate.getDate(),
  }

  if (now.year > ago.year && now.month >= ago.month) {
    return now.year - ago.year + '年前'
  }
  if (now.year - ago.year == 1 && now.month < ago.month) {
    return now.month + 12 - ago.month + '月前'
  }
  let days = [
    0,
    31,
    isLeapYear(ago.year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]
  if (now.month - ago.month > 1) {
    return now.month - ago.month + '月前'
  }
  if (now.month - ago.month == 1) {
    if (now.day < ago.day) {
      return now.day + days[ago.month] - ago.day + '天前'
    } else {
      return now.month - ago.month + '月前'
    }
  }
  return now.day - ago.day == 0 ? '今天' : now.day - ago.day + '天前'
}

function isLeapYear(year: number): boolean {
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    return true
  }
  return false
}

export { getTimegap }
