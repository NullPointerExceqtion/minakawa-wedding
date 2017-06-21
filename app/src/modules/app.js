// ------------------------------------
// Constants
// ------------------------------------
export const REGIST_QUIZ = 'REGIST_QUIZ'
export const QUIZ_PUBLISHED = 'QUIZ_PUBLISHED'
export const ANSWER_STOP = 'ANSWER_STOP'

// ------------------------------------
// Actions
// ------------------------------------
export function registQuiz (payload) {
  return {
    type    : REGIST_QUIZ,
    payload
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const quizListGiven = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      window.socket.emit('quizListGiven', (quizItems) => {
        quizItems.map((quizItem) => {
          dispatch({
            type    : REGIST_QUIZ,
            payload : quizItem
          })
        })

        resolve(quizItems)
      })
    })
  }
}

export function quizPublished (payload) {
  window.socket.emit('quizPublished', payload)

  return {
    type    : QUIZ_PUBLISHED,
    payload
  }
}

export const answerStop = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      window.socket.emit('answerStop', payload)
      dispatch({
        type    : ANSWER_STOP,
        payload
      })

      resolve()
    })
  }
}

export const actions = {
  registQuiz,
  quizListGiven,
  quizPublished,
  answerStop
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGIST_QUIZ]    : (state, action) => {
    const quizInfo = {
      _id     : action.payload._id,
      title   : action.payload.title,
      answer1 : action.payload.answer1,
      answer2 : action.payload.answer2,
      answer3 : action.payload.answer3,
      answer4 : action.payload.answer4
    }

    return Object.assign({}, state, {
      quizItems: [...state.quizItems, quizInfo]
    })
  },
  [QUIZ_PUBLISHED] : (state, action) => {
    return state
  },
  [ANSWER_STOP]    : (state, action) => {
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  quizItems: []
}

export default function hostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
