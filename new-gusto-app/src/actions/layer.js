import {
  OPEN_LAYER,
  CLOSE_LAYER,
  CLOSE_ALL_LAYER,
} from '@/actions/types'

const openLayer = (data) => (dispatch) => {
  dispatch({
    type: OPEN_LAYER,
    payload: data,
  })
}

const closeLayer = (data) => (dispatch) => {
  dispatch({
    type: CLOSE_LAYER,
    payload: data,
  })
}

const closeAllLayer = () => (dispatch) => dispatch({ type: CLOSE_ALL_LAYER })

const openMenu = (data) => (dispatch) => {
  dispatch(openLayer({ ...data, id: 'menu' }))
}

const closeMenu = (data) => (dispatch) => {
  dispatch(closeLayer({ ...data, id: 'menu' }))
}

export {
  openLayer,
  closeLayer,
  closeAllLayer,
  openMenu,
  closeMenu,
}
