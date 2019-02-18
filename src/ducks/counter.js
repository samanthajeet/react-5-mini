const initialState = {
  currentValue: 0,
  futureValues: [],
  previousValues: []
}

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const UNDO = 'UNDO'
const REDO = 'REDO'

export default function counter(state =  initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        currentValue: state.currentValue + action.payload,
        previousValues: [state.currentValue, ...state.previousValues],
        futureValues: [],
      }

    case DECREMENT:
      return {
        ...state,
        currentValue: state.currentValue - action.payload,
        previousValues: [state.currentValue, ...state.previousValues],
        futureValues: [],
      }

    case UNDO:
      return{
        ...state,
        currentValue: state.previousValues[0],
        futureValues: [state.currentValue, ...state.futureValues],
        previousValues: state.previousValues.slice(1)
      }

    case REDO:
      return {
        ...state,
        currentValue: state.futureValues[0],
        futureValues: state.futureValues.slice(1),
        previousValues: [state.currentValue, ...state.previousValues]
      }

    default:
      return state
  }
}

export function increment(amount) {
  return {
    type: INCREMENT, 
    payload: amount
  }
}

export function decrement(amount) {
  return {
    type: DECREMENT, 
    payload: amount
  }
}

export function undo() {
  return {
    type: UNDO, 
  }
}

export function redo() {
  return {
    type: REDO, 
  }
}