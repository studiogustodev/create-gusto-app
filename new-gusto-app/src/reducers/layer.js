import {
  OPEN_LAYER,
  CLOSE_LAYER,
  CLOSE_ALL_LAYER,
} from '@/actions/types'

const getLayerModel = ({ id }) => ({
  id,
  isOpen: false,
})

const initialState = {
  layers: [
    getLayerModel({ id: 'restart' }),
    getLayerModel({ id: 'share' }),
    getLayerModel({ id: 'in-app' }),
  ],
  layerIsOpen: false,
}

export default (state = initialState, action) => {
  if (typeof action === 'undefined') return state

  switch (action.type) {
    case OPEN_LAYER: {
      return { ...state,
        layerIsOpen: true,
        layers: state.layers.map((l) => (l.id === action.payload.id
          ? ({ ...l,
            ...action.payload,
            isOpen: true,
          })
          : l)) }
    }

    case CLOSE_LAYER: {
      return { ...state,
        layerIsOpen: false,
        layers: state.layers.map((l) => (l.id === action.payload.id
          ? ({ ...l,
            ...action.payload,
            isOpen: false,
          })
          : l)) }
    }

    case CLOSE_ALL_LAYER: {
      return { ...state,
        layerIsOpen: false,
        layers: state.layers.map((l) => ({ ...l,
          ...action.payload,
          isOpen: false,
        })) }
    }
    default:
      return state
  }
}
