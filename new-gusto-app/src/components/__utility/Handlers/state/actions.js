import {
  REMOVE_RAF_HANDLER,
  REMOVE_RESIZE_HANDLER,
  SAVE_RAF_HANDLER,
  SAVE_RESIZE_HANDLER,
} from './constants'

const saveRafHandler = (fn, position) => ({
  type: SAVE_RAF_HANDLER,
  payload: { fn, position },
})
const removeRafHandler = (fn, position) => ({
  type: REMOVE_RAF_HANDLER,
  payload: { fn, position },
})
const saveResizeHandler = (fn, position) => ({
  type: SAVE_RESIZE_HANDLER,
  payload: { fn, position },
})
const removeResizeHandler = (fn) => ({
  type: REMOVE_RESIZE_HANDLER,
  payload: { fn },
})

export {
  saveRafHandler,
  saveResizeHandler,
  removeRafHandler,
  removeResizeHandler,
}
