import {
  FAKEROUTER_CHANGE_LOCATION,
  FAKEROUTER_MOVE_FORWARD,
  FAKEROUTER_MOVE_BACKWARD,
  FAKEROUTER_RESET,
} from '@/actions/types'

const initialState = {
  location: 'home', // da cambiare se si vuole partire da un'altra pagina
  locations: [
    { id: 0, name: 'home' },
    { id: 1, name: 'names' },
    { id: 2, name: 'berlin' },
    { id: 3, name: 'final' },
    { id: 99, name: 'debug' },
  ],
}

export default (state = initialState, action) => {
  const currentIndex = state.locations.find((l) => l.name === state.location).id

  switch (action.type) {
    case FAKEROUTER_CHANGE_LOCATION:
      state = {
        ...state,
        location: action.payload,
        index: state.locations.find((l) => l.name === action.payload).id,
      }
      break
    case FAKEROUTER_MOVE_FORWARD:
      state = {
        ...state,
        location: state.locations.find((l) => l.id === currentIndex + 1).name,
        index: currentIndex + 1,
      }
      break
    case FAKEROUTER_MOVE_BACKWARD:
      state = {
        ...state,
        location: state.locations.find((l) => l.id === currentIndex - 1).name,
        index: currentIndex - 1,
      }
      break
    case FAKEROUTER_RESET:
      state = {
        ...state,
        location: 'home',
        index: 0,
      }
      break
    default:
      return { ...state }
  }
  return { ...state }
}
