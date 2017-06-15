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
export const answerSubmitted = (submittedNumber) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      window.socket.emit('answerSubmitted', submittedNumber, (isCorrect) => {
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
    return Object.assign({}, state, {
      quizItem: {
        title        : action.payload.title,
        answer1      : action.payload.answer1,
        answer2      : action.payload.answer2,
        answer3      : action.payload.answer3,
        answer4      : action.payload.answer4,
        isSubmitted  : action.payload.isSubmitted,
        isCorrect    : action.payload.isCorrect,
        isAnswerStop : action.payload.isAnswerStop
      }
    })
  },

  [SHOW_SUBMITTED_DIALOG]: (state, action) => {
    return Object.assign({}, state, {
      quizItem: {
        title       : state.quizItem.title,
        answer1     : state.quizItem.answer1,
        answer2     : state.quizItem.answer2,
        answer3     : state.quizItem.answer3,
        answer4     : state.quizItem.answer4,
        isSubmitted : action.payload.isSubmitted,
        isCorrect   : state.quizItem.isCorrect,
        isAnswerStop: state.quizItem.isAnswerStop
      }
    })
  },

  [SET_IS_CORRECT]: (state, action) => {
    return Object.assign({}, state, {
      quizItem: {
        title        : state.quizItem.title,
        answer1      : state.quizItem.answer1,
        answer2      : state.quizItem.answer2,
        answer3      : state.quizItem.answer3,
        answer4      : state.quizItem.answer4,
        isSubmitted  : state.quizItem.isSubmitted,
        isCorrect    : action.payload.isCorrect,
        isAnswerStop : state.quizItem.isAnswerStop
      }
    })
  },

  [SHOW_IS_CORRECT_DIALOG]: (state, action) => {
    return Object.assign({}, state, {
      quizItem: {
        title        : state.quizItem.title,
        answer1      : state.quizItem.answer1,
        answer2      : state.quizItem.answer2,
        answer3      : state.quizItem.answer3,
        answer4      : state.quizItem.answer4,
        isSubmitted  : state.quizItem.isSubmitted,
        isCorrect    : state.quizItem.isCorrect,
        isAnswerStop : action.payload.isAnswerStop
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
    isSubmitted: false,
    isCorrect: null,
    isAnswerStop: false
  }
}

export default function guestReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
