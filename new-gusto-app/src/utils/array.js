export const loopArray = (arr, active, dir) => {
  if (active + dir >= arr.length) return 0
  if (active + dir <= -1) return arr.length - 1
  return active + dir
}

export function checkEmpty (el) {
  return el.id !== undefined
}

export function removeEmpty (el) {
  return el.filter((n) => n)
}

export const distinct = (el, attr) => {
  const map = new Map()
  let result = el.map((item) => {
    if (!map.has(item[attr])) {
      map.set(item[attr], true)
      return item
    }
    return null
  })
  result = removeEmpty(result)
  return result
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

export const containsObject = (obj, list = [], prop) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i][prop] === obj[prop]) {
      return true
    }
  }
  return false
}

export const mergeArrays = (originalArray, updateArray, prop = 'id') => {
  const array = [...originalArray, ...updateArray]
  const newArray = new Map()

  array.forEach((item) => {
    const propertyValue = item[prop]
    /* eslint-disable-next-line */
    newArray.has(propertyValue)
      ? newArray.set(propertyValue, { ...item, ...newArray.get(propertyValue) })
      : newArray.set(propertyValue, item)
  })

  return Array.from(newArray.values())
}

export const removeDuplicates = (array, prop) => {
  return array.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}

export const removeUndefined = (array) => {
  return array.filter((item) => item.src !== undefined)
}

export const getLastItems = (array, i = 3) => (array.length > i ? array.slice(Math.max(array.length - i, 1)) : array)

export const composeBreadcrumb = (item, array) => {
  const itemIndex = array.findIndex((it) => it.id === item.id)
  if (itemIndex === -1) {
    return [...array, item]
  } return array.slice(0, itemIndex + 1)
}
