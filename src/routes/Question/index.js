import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'host/question/:selectedQuizId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    // require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Question = require('./containers/QuestionContainer').default
      // const reducer = require('./modules/question').default

      /*  Add the reducer to the store on key 'question'  */
      // injectReducer(store, { key: 'question', reducer })

      /*  Return getComponent   */
      cb(null, Question)

    /* Webpack named bundle   */
    // }, 'question')
  }
})
