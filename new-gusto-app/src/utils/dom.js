export const getBoundingClientRect = (element, extra) => {
  if (!element) return false
  const bounding = {}
  const boundingRect = element.getBoundingClientRect();
  ['top', 'right', 'bottom', 'left', 'width', 'height'].forEach(
    (k) => (bounding[k] = boundingRect[k]),
  )

  if (extra) {
    const style = window.getComputedStyle(element)
    const styleKeys = [
      'margin-bottom',
      'margin-left',
      'margin-right',
      'margin-top',
      'padding-bottom',
      'padding-left',
      'padding-right',
      'padding-top',
    ]
    styleKeys.forEach((k) => {
      const edge = k.split('-')[1]
      const number = style[k].includes('px')
        ? Number(style[k].match(/\d/g).join(''))
        : 0
      bounding[edge] += number
      const size = ['left', 'right'].includes(edge) ? 'width' : 'height'
      bounding[size] += number
    })
  }
  return bounding
}

export const isInViewport = (el) => {
  const { top, height, left, width } = el.getBoundingClientRect()
  return (top + height > 0 && top <= window.innerHeight && left + width > 0 && left <= window.innerWidth)
}

export const externalPreload = (callback) => {
  if (document.documentElement.classList.contains('ready')) {
    callback(true)
  } else {
    document.documentElement.classList.add('ready')
    setTimeout(() => {
      callback(true)
    }, 500)
  }
}

export const insertAfter = (el, referenceNode) => {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling)
}

export const triggerATag = (url, title, target = '_blank') => {
  const aTag = document.createElement('a')
  aTag.href = url
  aTag.setAttribute('target', target)
  aTag.setAttribute('download', title)
  aTag.click()
}

export const fileDownload = (data, filename, mime, bom) => {
  const blobData = (typeof bom !== 'undefined') ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename)
  } else {
    const blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob)
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', filename)

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }

    // if (navigator.userAgent.match('CriOS')) {
    //   window.alert('chrome ios') // eslint-disable-line
    //   const blobFile = new Blob(blobData, { type: mime || 'video/mp4' })
    //   window.open(URL.createObjectURL(blobFile))
    //   // const video = new Blob(blobData, { type: mime || 'application/octet-stream' })
    //   // const reader = new FileReader()
    //   // reader.onload = (e) => {
    //   //   window.location.href = reader.result

    //   //   const buffer = e.target.result
    //   //   // We have to convert the buffer to a blob:
    //   //   const videoBlob = new Blob([new Uint8Array(buffer)], { type: 'video/mp4' })

    //   //   // The blob gives us a URL to the video file:
    //   //   const url = window.URL.createObjectURL(videoBlob)

    //   //   video.src = url
    //   // }
    //   // reader.readAsArrayBuffer(video)
    //   return
    // }

    document.body.appendChild(tempLink)
    tempLink.click()

    // Fixes "webkit blob resource error 1"
    setTimeout(() => {
      document.body.removeChild(tempLink)
      window.URL.revokeObjectURL(blobURL)
    }, 200)
  }
}
