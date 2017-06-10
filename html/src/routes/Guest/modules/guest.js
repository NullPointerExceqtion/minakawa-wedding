// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_QUIZ_ITEM = 'SHOW_QUIZ_ITEM'
export const ANSWER_SUBMITTED = 'ANSWER_SUBMITTED'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const answerSubmitted = (submittedNumber) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      window.socket.emit('answerSubmitted', submittedNumber, () => {
        resolve()
      })
    })
  }
}

export const showQuizItem = (payload) => {
  return {
    type: SHOW_QUIZ_ITEM,
    payload
  }
}

export const actions = {
  answerSubmitted,
  showQuizItem
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_QUIZ_ITEM]: (state, action) => {
    return Object.assign({}, state, {
      quizItem: {
        title: action.payload.title,
        answer1: action.payload.answer1,
        answer2: action.payload.answer2,
        answer3: action.payload.answer3,
        answer4: action.payload.answer4
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  quizItem: {
    title: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: ''
  }
}

export default function guestReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
