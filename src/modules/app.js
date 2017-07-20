import { createSelector } from 'reselect'

// ------------------------------------
// Constants
// ------------------------------------
export const REGIST_QUIZ = 'REGIST_QUIZ'
export const QUIZ_PUBLISHED = 'QUIZ_PUBLISHED'
export const ANSWER_STOP = 'ANSWER_STOP'
export const SET_SELECTED_QUIZID = 'SET_SELECTED_QUIZID'
export const SET_NEXT_QUIZID = 'SET_NEXT_QUIZID'
export const RESULT_ANNOUNCEMENT = 'RESULT_ANNOUNCEMENT'
export const JOIN_ROOM = 'JOIN_ROOM'

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

/**
 * quizListGiven
 * 全ての問題を取得する
 */
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

/**
 * quizPublished
 * @param {Number} payload quizID
 */
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

/**
 * nextQuizPublished
 * 次の問題のQuizIDを判定しquizPublishedする
 */
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

/**
 * answerStop
 * @param {Number} payload quizID
 * 問題の出題を停止する
 */
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

/**
 * resetStoreExceptSignup
 * signup以外のstoreをresetする
 */
export const resetStoreExceptSignup = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      window.persistorPromise.then(() => {
        dispatch({
          type   : RESET_STORE_EXCEPT_SIGNUP
        })

        resolve()
      })
    })
  }
}

/**
 * resultAnnouncement
 * 全ユーザーのユーザー名と正解数を取得する
 */
export const resultAnnouncement = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      window.socket.emit('resultAnnouncement', (payload) => {
        dispatch({
          type    : RESULT_ANNOUNCEMENT,
          payload,
        })

        resolve()
      })
    })
  }
}

/**
 * setSelectedQuizId
 * @param {Number} payload quizID
 */
export const setSelectedQuizId = (payload) => {
  return {
    type    : SET_SELECTED_QUIZID,
    payload
  }
}

/**
 * setNextQuizId
 * @param {Number} payload quizID
 */
export const setNextQuizId = (payload) => {
  return {
    type    : SET_NEXT_QUIZID,
    payload
  }
}

/**
 * joinRoom
 * @param {String} payload roomName
 */
export const joinRoom = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      window.socket.emit('joinRoom', payload)
      dispatch({
        type   : JOIN_ROOM,
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
  answerStop,
  setSelectedQuizId,
  setNextQuizId,
  resultAnnouncement,
  joinRoom
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
  },
  [RESULT_ANNOUNCEMENT] : (state, action) => {
    return Object.assign({}, state, {
      usersInfo : action.payload
    })
  },
  [JOIN_ROOM]           : (state, action) => {
    return Object.assign({}, state, {
      roomName  : action.payload
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  quizItems      : [],
  selectedQuizId : false,
  nextQuizId     : false,
  roomName       : ''
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
