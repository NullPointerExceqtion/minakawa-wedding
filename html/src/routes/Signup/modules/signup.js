// ------------------------------------
// Constants
// ------------------------------------
export const USER_REGIST = 'USER_REGIST'
export const USER_REGIST_ID = 'USER_REGIST_ID'

// ------------------------------------
// Actions
// ------------------------------------
export function userRegist (payload) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      window.socket.emit('userRegist', payload.userName, (userId) => {
        dispatch({
          type    : USER_REGIST_ID,
          payload : {
            userId
          }
        })

        resolve()
      })

      dispatch({
        type    : USER_REGIST,
        payload
      })
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_REGIST]: (state, action) => {
    return Object.assign({}, state, {
      userName: action.payload.userName
    })
  },
  [USER_REGIST_ID]: (state, action) => {
    return Object.assign({}, state, {
      userId: action.payload.userId
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  userName: '',
  userId: ''
}

export default function hostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
