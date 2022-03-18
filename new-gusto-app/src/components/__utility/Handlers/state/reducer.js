import {
  REMOVE_RAF_HANDLER,
  REMOVE_RESIZE_HANDLER,
  SAVE_RAF_HANDLER,
  SAVE_RESIZE_HANDLER,
} from './constants'

const initialState = {
  raf: [],
  resize: [],
}

const saveHandler = (key, state, action) => {
  const { position, fn } = action.payload
  const newHandler = state[key].slice()
  if (typeof (position) !== 'undefined') { newHandler.splice(position, 0, fn) } else newHandler.push(fn)
  return { ...state, [key]: newHandler }
}

const removeHandler = (key, state, action) => {
  const index = state[key].findIndex((f) => f === action.payload.fn)
  if (index > -1) state[key].splice(index, 1)
  return state
}

export default (state = initialState, action) => {
  if (typeof action === 'undefined') return state

  switch (action.type) {
    case SAVE_RAF_HANDLER:
      return saveHandler('raf', state, action)
    case SAVE_RESIZE_HANDLER:
      return saveHandler('resize', state, action)
    case REMOVE_RAF_HANDLER:
      return removeHandler('raf', state, action)
    case REMOVE_RESIZE_HANDLER:
      return removeHandler('resize', state, action)
    default: return state
  }
}
