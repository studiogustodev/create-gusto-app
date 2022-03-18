export function mapRange(num, inMin, inMax, outMin, outMax) {
  // eslint-disable-next-line no-mixed-operators
  return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

export const newMapRange = (value, rangeA, rangeB, limit) => {
  if (limit == null) {
    limit = false; // eslint-disable-line
  }
  const [fromLow, fromHigh] = Array.from(rangeA)
  const [toLow, toHigh] = Array.from(rangeB)
  const result = toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow)

  if (limit === true) {
    if (toLow < toHigh) {
      if (result < toLow) {
        return toLow
      }
      if (result > toHigh) {
        return toHigh
      }
    } else {
      if (result > toLow) {
        return toLow
      }
      if (result < toHigh) {
        return toHigh
      }
    }
  }

  return result
}

export const lerp = (a, b, n) => (1 - n) * a + n * b

export const clamp = (value, min, max) => Math.max(Math.min(max, value), min)

export const range = (value, min, max) => Math.min(Math.max(value, min), max)

export const shuffle = (array) => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export const chunk = (array, size) => {
  const chunked = []
  for (let i = 0; i < array.length; i += 1) {
    const last = chunked[chunked.length - 1]
    if (!last || last.length === size) {
      chunked.push([array[i]])
    } else {
      last.push(array[i])
    }
  }
  return chunked
}

export const nearValue = (val, breakpoint, threshold) => {
  return val > (breakpoint - threshold) && val < (breakpoint + threshold)
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
