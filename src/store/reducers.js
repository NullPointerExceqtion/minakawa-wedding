import { combineReducers } from 'redux'
import locationReducer from './location'
import appReducer from '../modules/app'

import guestReducer from '../routes/Guest/modules/guest'
import hostReducer from '../routes/Host/modules/host'
import opeReducer from '../routes/Ope/modules/ope'
import questionReducer from '../routes/Question/modules/question'
import resultReducer from '../routes/Result/modules/result'
import signupReducer from '../routes/Signup/modules/signup'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location : locationReducer,
    app      : appReducer,
    guest    : guestReducer,
    host     : hostReducer,
    ope      : opeReducer,
    question : questionReducer,
    result   : resultReducer,
    signup   : signupReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
