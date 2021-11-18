export const getSliderMarks = (timeFormat) => {
  let res = []
  switch (timeFormat) {
    case 'HOUR':
      for (let i = 0; i <= 23; i++) {
        res.push({ label: i, value: i })
      }
      break;
    case 'DAYOFWEEK':
      let week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      for (let i = 0; i < 7; i++) {
        res.push({ label: week[i], value: i })
      }
      break;
    case 'MONTH':
      let month = ['Jan', 'Fen', "Mar", 'Apr', 'May', 'Jun', 'Jul', 'Aug', "Sep", "Oct", 'Nov', 'Dec']
      for (let i = 0; i < 12; i++) {
        res.push({ label: month[i], value: i })
      }
      break;
  }
  return res
}

export const getTime = unixTimestamp => {
  const date = new Date(unixTimestamp * 1000)
  return {
    Hour: date.getHours(),
    DOW: date.getDay(),
    Month: date.getMonth()
  }
}