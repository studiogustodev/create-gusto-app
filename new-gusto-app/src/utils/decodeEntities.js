export const decodeSingle = (str, search, replace) => {
  return str.replace(new RegExp(search, 'g'), replace)
}

export const decodeEntities = (str, arr = []) => {
  const defaults = [{ search: '&#038;', replace: '&' }, { search: '&#8211;', replace: '-' }, { search: '&amp;', replace: '&' }, { search: '&#039;', replace: "'" }, { search: '&#8217;', replace: "'" }]
  const t = arr.length > 0 ? arr : defaults
  let hay = str
  for (let i = 0; i < t.length; i += 1) {
    hay = decodeSingle(hay, t[i].search, t[i].replace)
  }
  return hay
}

export const htmlEntity = (str) => {
  const m = str.match(/&#[0-9]{4};|&#[0-9]{3};|&#[0-9]{2};/g)
  if (m && m.length > 0) {
    for (let i = 0; i < m.length; i += 1) {
      const t = m[i].replace('&#', '').replace(';', '')
      str = str.replace(m[i], String.fromCharCode(t))
    }
  }
  return str
}

export const cleanHtml = (html) => {
  return html.replace(/&#[0-9]{4};|&#[0-9]{3};|&#[0-9]{2};/g, '')
}
