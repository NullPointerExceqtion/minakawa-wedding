// ------------------------------------
// Constants
// ------------------------------------
export const REGIST_QUIZ = 'REGIST_QUIZ'
export const QUIZ_PUBLISHED = 'QUIZ_PUBLISHED'
export const STOP_QUIZ = 'STOP_QUIZ'

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
      window.socket.emit('quizListGiven', (quizList) => {
        quizList.map((quizItem) => {
          dispatch({
            type    : REGIST_QUIZ,
            payload : quizItem
          })
        })

        resolve()
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

export const actions = {
  registQuiz,
  quizPublished
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGIST_QUIZ]    : (state, action) => {
    const quizData = {
      title: action.payload.title,
      answer1: action.payload.answer1,
      answer2: action.payload.answer2,
      answer3: action.payload.answer3,
      answer4: action.payload.answer4
    }

    return Object.assign({}, state, {
      quizList: [...state.quizList, quizData]
    })
  },
  [QUIZ_PUBLISHED]    : (state, action) => {
    console.log(state, action)
    return state
  },
  [STOP_QUIZ]     : (state, action) => {

  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  quizList: []
}

export default function hostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
