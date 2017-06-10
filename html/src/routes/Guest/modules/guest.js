// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_QUIZ_ITEM = 'SHOW_QUIZ_ITEM'
export const ANSWER_SUBMITTED = 'ANSWER_SUBMITTED'
export const SHOW_SUBMITTED_DIALOG = 'SHOW_SUBMITTED_DIALOG'

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
      dispatch({
        type        : SHOW_SUBMITTED_DIALOG,
        payload     : {
          isSubmitted : true
        }
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

export const showSubmittedDialog = () => {
  return {
    type: SHOW_SUBMITTED_DIALOG,
    payload: false
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
        answer4: action.payload.answer4,
        isSubmitted: false
      }
    })
  },
  [SHOW_SUBMITTED_DIALOG]: (state, action) => {
    console.log(action)
    return Object.assign({}, state, {
      quizItem: {
        title: state.quizItem.title,
        answer1: state.quizItem.answer1,
        answer2: state.quizItem.answer2,
        answer3: state.quizItem.answer3,
        answer4: state.quizItem.answer4,
        isSubmitted: action.payload.isSubmitted
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
    answer4: '',
    isSubmitted: false
  }
}

export default function guestReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
