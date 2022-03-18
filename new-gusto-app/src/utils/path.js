import { SITE, LANGUAGES } from '@/constants'

export const cleanOrigin = (path = '') => {
  const origin = SITE || window.location.origin
  const clean = path.replace(origin, '')
  if (clean.startsWith('/')) {
    return clean
  }
  return `/${clean}`
}

export const isInternal = (to) => {
  if (to === '') return false
  const linkSplit = to.split('/')
  if (to.indexOf(SITE) === 0) return true
  if (to.indexOf('://') === -1) return true
  if (linkSplit[linkSplit.length - 1].indexOf('.') === -1) return false
  return window.location.hostname === to.hostname
}

export const getSlug = (pathname = '') => {
  const pathArray = pathname.split('/').filter((p) => p !== '')
  return pathArray.slice(pathArray.length - 1)[0]
}

export const slugify = (string) => {
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
  const to = 'aaaaaeeeeeiiiiooooouuuunc------'

  const newText = string.split('').map(
    (letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)),
  )

  return newText
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-y-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // eslint-disable-line
    .replace(/\-\-+/g, '-') // eslint-disable-line
}

export const internazionalizePath = (path, langs = LANGUAGES) => {
  if (langs.length < 2) return path
  const originalPaths = Array.isArray(path) ? path : Array(path)
  const intPaths = originalPaths.reduce((acc, item) => {
    return acc.concat(langs.map((l) => `/${l}${item}`))
  }, [])
  return originalPaths.concat(intPaths)
}

export const getPathFromCpt = (routing, cpt, param = '') => {
  return routing.map((route) => {
    if (route.cpt === cpt) return `/${route.slug}${param !== '' ? `/:${param}` : ''}`
    return null
  }).filter((el) => el !== null)
}

export const removeTrailingSlash = (str) => (str.endsWith('/') ? str.slice(0, -1) : str)

export const checkSubcategorySlug = (slug, string) => (slug.toLowerCase() === string?.toLowerCase() ? '' : slug)

export const containsUrl = (url, string) => {
  const origin = SITE || window.location.origin
  const clean = string.replace(origin, '')
  return url.includes(clean.toLowerCase())
}

export const replaceLastSegment = (url, string) => {
  const str = removeTrailingSlash(url)
  const newStr = str.slice(0, str.lastIndexOf('/'))
  return `${newStr}/${string}`
}

export const getExtension = (path) => path.split('.').pop()
