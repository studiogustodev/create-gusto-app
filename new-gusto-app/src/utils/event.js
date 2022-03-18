export const once = (el, event, fn, opts) => {
  const onceFn = () => {
    el.removeEventListener(event, onceFn)
    fn.apply(this)
  }
  el.addEventListener(event, onceFn, opts)
  return onceFn
}
