import { once } from '@/utils/event'

export const precacheMedia = async (sourceList, cb = () => {}) => {
  const images = sourceList?.filter((src) => src.type === 'image').map((item) => item.src)
  const videos = sourceList?.filter((src) => src.type === 'video').map((item) => item.src)

  const promisesImage = await images.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = resolve()
      img.onerror = reject()
    })
  })
  const promisesVideo = await videos.map((src) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()
      req.open('GET', src, true)
      req.responseType = 'blob'
      req.onload = () => {
        if (req.status === 200) {
          const videoBlob = req.response
          URL.createObjectURL(videoBlob)
          resolve()
        }
      }
      req.onerror = () => reject()
      req.send()
    })
  })

  await Promise.all([
    ...promisesImage,
    ...promisesVideo,
  ]).then(() => cb())
}

export const ensurePrevPlayedSegments = (url, videoObj) => {
  setTimeout(() => {
    if (window.fetch) {
      fetch(url)
        .then((response) => response.blob())
        .then((response) => {
          const blobURL = URL.createObjectURL(response)

          const t = videoObj.currentTime
          once(document.documentElement, 'touchstart', () => {
            videoObj.play()
            videoObj.pause()
          })

          videoObj.setAttribute('src', blobURL)
          videoObj.currentTime = t + 0.01
        })
    }
  }, 1000)
}
