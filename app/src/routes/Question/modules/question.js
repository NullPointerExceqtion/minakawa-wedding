import { createSelector } from 'reselect'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_QUIZ = 'SET_QUIZ'

// ------------------------------------
// Actions
// ------------------------------------
export function setQuiz (payload, state) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type    : SET_QUIZ,
        payload
      })
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_QUIZ]: (state, action) => {
    return {
      selectQuizId: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  selectQuizId   : ''
}

export default function hostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

// ------------------------------------
// Selector
// ------------------------------------
const selectQuizIdSelector = (state) => {
  return state.question.selectQuizId
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
