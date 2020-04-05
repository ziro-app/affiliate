import { post } from 'axios'

export const hourFormat = (hour) => {
  let partsHour = hour.split(':')
  let hourUtc3 = (parseInt(partsHour[0]) + 21) % 24
  return `${hourUtc3 >= 10 ? hourUtc3 : `0${hourUtc3}`}:${partsHour[1]}:${partsHour[2]}`

},
  dateHourFormatterUTC3 = (date) => {
    let utc = date.toUTCString()
    let parts = utc.substr(5).split(' ')
    return `${date.getDate()}/${date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}/${parts[2]} ${hourFormat(parts[3])}`
  },
  findAffiliateRow = async cpf => {
    const url = process.env.SHEET_URL
    let pos
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': process.env.SHEET_TOKEN
      }
    }
    const body = {
      "apiResource": "values",
      "apiMethod": "get",
      "range": "Afiliados",
      "spreadsheetId": process.env.SHEET_ID_REGISTER_APPEND,
    }
    const { data: { values } } = await post(url, body, config)
    values.map((user, index) => {
      if (user[1] === cpf) {
        pos = index
      }
    })
    return pos + 1
  }