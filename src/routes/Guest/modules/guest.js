// ------------------------------------
// Constants
// ------------------------------------
// クイズ情報を画面に表示する
export const SHOW_QUIZ_ITEM = 'SHOW_QUIZ_ITEM'
// 回答を送信する
export const ANSWER_SUBMITTED = 'ANSWER_SUBMITTED'
// 回答したことを画面に表示する
export const SHOW_SUBMITTED_DIALOG = 'SHOW_SUBMITTED_DIALOG'
// 正解・不正解を登録する
export const SET_IS_CORRECT = 'SET_IS_CORRECT'
// 正解・不正解を画面に表示する
export const SHOW_IS_CORRECT_DIALOG = 'SHOW_IS_CORRECT_DIALOG'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export const answerSubmitted = (submittedNumber, _id, userId) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      window.socket.emit('answerSubmitted', submittedNumber, _id, userId, (isCorrect) => {
        dispatch({
          type    : SET_IS_CORRECT,
          payload : {
            isCorrect
          }
        })
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
    type    : SHOW_QUIZ_ITEM,
    payload
  }
}

export const showSubmittedDialog = (payload) => {
  return {
    type    : SHOW_SUBMITTED_DIALOG,
    payload
  }
}

export const setIsCorrect = (payload) => {
  return {
    type    : SET_IS_CORRECT,
    payload
  }
}

export const showIsCorrectDialog = (payload) => {
  return {
    type    : SHOW_IS_CORRECT_DIALOG,
    payload
  }
}

export const actions = {
  answerSubmitted,
  showQuizItem,
  showSubmittedDialog,
  showIsCorrectDialog
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_QUIZ_ITEM]: (state, action) => {
    let {
      title,
      answer1,
      answer2,
      answer3,
      answer4,
      _id
    } = action.payload

    return Object.assign({}, state, {
      title,
      answer1,
      answer2,
      answer3,
      answer4,
      _id,
      isSubmitted   : false,
      isAnswerStop  : false,
      isGetQuizItem : true
    })
  },

  [SHOW_SUBMITTED_DIALOG]: (state, action) => {
    return Object.assign({}, state, {
      isSubmitted: action.payload.isSubmitted
    })
  },

  [SET_IS_CORRECT]: (state, action) => {
    return Object.assign({}, state, {
      isCorrect: action.payload.isCorrect
    })
  },

  [SHOW_IS_CORRECT_DIALOG]: (state, action) => {
    return Object.assign({}, state, {
      isAnswerStop: action.payload.isAnswerStop
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  title         : '',
  answer1       : '',
  answer2       : '',
  answer3       : '',
  answer4       : '',
  _id           : false,
  isSubmitted   : false,
  isCorrect     : null,
  isAnswerStop  : false,
  isGetQuizItem : false
}

export default function guestReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
