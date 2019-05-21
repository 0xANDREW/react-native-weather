const BASE = 'https://api.openweathermap.org/data/2.5'
const IMG_BASE = 'http://openweathermap.org/img/w'

async function currentWeather(conf){
  var params = `appid=${conf.apiKey}&zip=${conf.zip},us&units=${conf.units}`
  var url = `${BASE}/weather?${params}`
  var resp = await fetch(url)
  return await resp.json()
}

function getIconUrl(icon){
  return `${IMG_BASE}/${icon}.png`
}

export default {
  currentWeather: currentWeather,
  getIconUrl: getIconUrl
}

