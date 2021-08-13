module.exports = function generateMonthList () {
  const today = new Date()
  const monthList = []
  for (let i = 0; i < 12; i++) {
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    if (month - i < 1) {
      year = year - 1
      month = 12 + month - i
    } else {
      month = month - i
    }
    if (month < 10) {
      monthList.push(`${year}-0${month}`)
    } else {
      monthList.push(`${year}-${month}`)
    }
  }
  return monthList
}
