import {
  FAKEROUTER_CHANGE_LOCATION,
  FAKEROUTER_MOVE_FORWARD,
  FAKEROUTER_MOVE_BACKWARD,
} from '@/actions/types'

const changeLocation = (slug) => (dispatch) => {
  dispatch({
    type: FAKEROUTER_CHANGE_LOCATION,
    payload: slug,
  })
}

const moveForward = () => (dispatch) => dispatch({ type: FAKEROUTER_MOVE_FORWARD })

const moveBackward = () => (dispatch) => dispatch({ type: FAKEROUTER_MOVE_BACKWARD })

export {
  changeLocation,
  moveForward,
  moveBackward,
}
