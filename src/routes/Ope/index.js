import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'ope',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    // require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Ope = require('./containers/OpeContainer').default
      // const reducer = require('./modules/ope').default

      /*  Add the reducer to the store on key 'ope'  */
      // injectReducer(store, { key: 'ope', reducer })

      /*  Return getComponent   */
      cb(null, Ope)

    /* Webpack named bundle   */
    // }, 'ope')
  }
})
