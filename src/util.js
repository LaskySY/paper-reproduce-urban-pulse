

export const getMarks = (timeFormat) => {
  let res = []
  switch(timeFormat){
    case 'HOUR':
      for (let i = 0; i <= 23; i++) {
        res.push({label: i, value: i})
      }
      break;
    case 'DAYOFWEEK':
      let week=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
      for (let i = 1; i <= 7; i++) {
        res.push({label: week[i-1], value: i})
      }
      break;
    case 'MONTH':
      let month=['Jan','Fen',"Mar",'Apr','May','Jun','Jul','Aug',"Sep","Oct",'Nov','Dec']
      for (let i = 1; i <= 13; i++) {
        res.push({label: month[i-1], value: i})
      }
      break;
  }
  return res
}
