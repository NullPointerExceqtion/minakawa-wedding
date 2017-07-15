import { createSelector } from 'reselect'

// ------------------------------------
// Constants
// ------------------------------------
export const REGIST_QUIZ = 'REGIST_QUIZ'
export const QUIZ_PUBLISHED = 'QUIZ_PUBLISHED'
export const ANSWER_STOP = 'ANSWER_STOP'
export const SET_SELECTED_QUIZID = 'SET_SELECTED_QUIZID'
export const SET_NEXT_QUIZID = 'SET_NEXT_QUIZID'

// Action自体はreducers.jsに記入
export const RESET_STORE_EXCEPT_SIGNUP = 'RESET_STORE_EXCEPT_SIGNUP'

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
        dispatch({
          type    : REGIST_QUIZ,
          payload : quizItems
        })

        resolve(quizItems)
      })
    })
  }
}

export const quizPublished = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      window.socket.emit('quizPublished', payload)
      dispatch({
        type    : QUIZ_PUBLISHED,
        payload
      })

      dispatch({
        type    : SET_SELECTED_QUIZID,
        payload
      })

      dispatch({
        type    : SET_NEXT_QUIZID,
        payload
      })

      resolve()
    })
  }
}

export const nextQuizPublished = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const state = getState()
      const promises = []

      if (state.app.quizItems.length === 0) {
        promises.push(quizListGiven())
      }

      Promise.all(promises).then((values) => {
        let payloadQuizId

        if (!state.app.nextQuizId) {
          payloadQuizId = state.app.quizItems[0]._id
        } else {
          payloadQuizId = state.app.nextQuizId
        }

        dispatch(quizPublished(payloadQuizId)).then(() => {
          resolve(payloadQuizId)
        })
      })
    })
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

export const resetStoreExceptSignup = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type   : RESET_STORE_EXCEPT_SIGNUP
      })

      resolve()
    })
  }
}


export const setSelectedQuizId = (payload) => {
  return {
    type    : SET_SELECTED_QUIZID,
    payload
  }
}

export const setNextQuizId = (payload) => {
  return {
    type    : SET_NEXT_QUIZID,
    payload
  }
}

export const actions = {
  registQuiz,
  quizListGiven,
  quizPublished,
  answerStop,
  setSelectedQuizId,
  setNextQuizId
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGIST_QUIZ]    : (state, action) => {
    return Object.assign({}, state, {
      quizItems: action.payload
    })
  },
  [QUIZ_PUBLISHED] : (state, action) => {
    return state
  },
  [ANSWER_STOP]    : (state, action) => {
    return state
  },
  [SET_SELECTED_QUIZID] : (state, action) => {
    return Object.assign({}, state, {
      selectedQuizId: action.payload
    })
  },
  [SET_NEXT_QUIZID]     : (state, action) => {
    const quizItems = state.quizItems

    if (quizItems.length === 0) return state

    const quizItemsIndex = quizItems.length
    let selectedQuizItemsIndex

    quizItems.forEach((val, index) => {
      if (val._id === action.payload) {
        selectedQuizItemsIndex = index
        return false
      }
    })

    if (selectedQuizItemsIndex === quizItemsIndex - 1) {
      return Object.assign({}, state, {
        nextQuizId: false
      })
    } else {
      return Object.assign({}, state, {
        nextQuizId: quizItems[selectedQuizItemsIndex + 1]._id
      })
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  quizItems: [],
  selectedQuizId: false,
  nextQuizId: false
}

export default function hostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

// ------------------------------------
// Selector
// ------------------------------------
const selectQuizIdSelector = (state) => {
  return state.app.selectedQuizId
}
const quizItemsSelector = (state) => {
  return state.app.quizItems
}

export const selectQuizItemSelector = createSelector(
  [selectQuizIdSelector, quizItemsSelector],
  (selectQuizId, quizItems) => {
    const quizItemFilterById = quizItems.filter((quizItem) => {
      return quizItem._id === selectQuizId
    })
    return quizItemFilterById[0]
  }
)
