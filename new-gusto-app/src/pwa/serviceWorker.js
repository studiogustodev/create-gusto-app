import { Workbox } from 'workbox-window'

const registerServiceWorker = () => {
  if (process.env.NODE_ENV !== 'production') return
  // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
  if ('serviceWorker' in navigator) {
    const wb = new Workbox(`${process.env.CONFIG.URL_BASE}/sw.js`)

    wb.register()
  }
}

export default registerServiceWorker
