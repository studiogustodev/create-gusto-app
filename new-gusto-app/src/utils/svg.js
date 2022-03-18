export const randomizePath = (linkWidth, YMax) => {
  const moveYMin = 5
  const moveYMax = 12
  const curveXMin = 20
  const curveXMax = linkWidth /* Width of the link */
  const curveYMin = 5
  const curveYMax = YMax
  const endYMin = 5
  const endYMax = 10
  const moveY = Math.floor(Math.random() * (moveYMax - moveYMin)) + moveYMin
  const curveX = Math.floor(Math.random() * (curveXMax - curveXMin)) + curveXMin
  const curveY = Math.floor(Math.random() * (curveYMax - curveYMin)) + curveYMin
  const endY = Math.floor(Math.random() * (endYMax - endYMin)) + endYMin

  const newPath = `M5 ${moveY} Q ${curveX} ${curveY} ${linkWidth - 7} ${endY}`

  return newPath
}

export const createSVG = (linkWidth, color, strokeWidth = 14, YMax = 20) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', linkWidth)
  svg.setAttribute('height', '20')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  const pathD = randomizePath(linkWidth, YMax)

  path.setAttribute('d', pathD)
  path.setAttribute('fill', 'transparent')
  path.setAttribute('stroke', color)
  path.setAttribute('stroke-width', strokeWidth)
  path.setAttribute('stroke-linecap', 'round')

  svg.appendChild(path)

  return svg
}
