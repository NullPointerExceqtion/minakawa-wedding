import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'signup',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    // require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      window.persistorPromise.then(() => {
        const Signup = require('./containers/SignupContainer').default
        // const reducer = require('./modules/signup').default

        /*  Add the reducer to the store on key 'signup'  */
        // injectReducer(store, { key: 'signup', reducer })

        /*  Return getComponent   */
        cb(null, Signup)
      })

    /* Webpack named bundle   */
    // }, 'signup')
  }
})
