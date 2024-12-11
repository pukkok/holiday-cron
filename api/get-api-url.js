import config from "./config.js"

const today = new Date()
const currentYear = today.getFullYear()

const getApiUrl = (year = currentYear) => {
  const getPoint = '/getRestDeInfo'

  const querys = ["_type=json", `solYear=${year}`, "numOfRows=30"]
  const API_URL = config.BASE_URL+getPoint+"?"+querys.join("&")+`&ServiceKey=${config.SECRET_KEY}`

  return API_URL
}

export default getApiUrl