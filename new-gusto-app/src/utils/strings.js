export const titleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ')
  for (let i = 0; i < splitStr.length; i += 1) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}

export const truncateString = (str, n, useWordBoundary = true, trunc = '...') => {
  if (str.length <= n) { return str }
  const subString = str.substr(0, n - 1)
  return (useWordBoundary
    ? `${subString.substr(0, subString.lastIndexOf(' '))}${trunc}`
    : `${subString}${trunc}`)
}

export const pad = (size, length = 3) => {
  let s = String(size)
  while (s.length < length) { s = `0${s}` }
  return s
}

export const removeParagraph = (str = '') => str.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '')

export const insertBr = (str = '') => str.replace(' ', '<br />')

export const removeBr = (str = '') => str.replace(/<br\s*\/?>/gi, ' ')

export const cutExcerpt = (str = '', limit = 145) => str.length > limit ? `${str.substring(0, limit)}...` : '' // eslint-disable-line

export const splitAfterBr = (str = '') => {
  return str.split('<br />')
}

export const splitAfterFirstSpace = (str = '') => {
  const firstWord = str.split(' ')
  const otherWords = str.split(' ')
  return [firstWord[0], otherWords.slice(1, otherWords.length).join(' ')]
}

export const insertBrAfterFirstSpace = (str = '') => {
  const firstWord = str.split(' ')
  const otherWords = str.split(' ')
  if (str.includes('<br />' || '<br>')) {
    return str
  }
  return `${firstWord[0]}<br />${otherWords.slice(1, otherWords.length).join(' ')}`
}

export const getFileExtension = (url = '') => url.split('.').pop()

export const wrapSpecificWorldWithSpan = (str = '') => {
  return str.replace(/\b(lun|mar|mer|gio|ven|sab|dom)\b/gi, '<span>$1</span>')
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
