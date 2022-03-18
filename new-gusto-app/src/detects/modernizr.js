import Modernizr from '@/vendors/modernizr'

Modernizr.addTest('devicehastouch', () => {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
})

Modernizr.addTest('ios', () => {
  return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
})

Modernizr.addTest('safari', () => {
  return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf('CriOS') === -1 && navigator.userAgent.indexOf('FxiOS') === -1
})

Modernizr.addTest('ie11', () => {
  return !!window.MSInputMethodContext && !!document.documentMode
})

Modernizr.addTest('nativescroll', () => {
  return ('ontouchstart' in document && window.innerWidth <= 1085) || (!!window.MSInputMethodContext && !!document.documentMode)
})
