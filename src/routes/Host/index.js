import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'host',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    // require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Host = require('./containers/HostContainer').default
      // const reducer = require('./modules/host').default

      /*  Add the reducer to the store on key 'host'  */
      // injectReducer(store, { key: 'host', reducer })

      /*  Return getComponent   */
      cb(null, Host)

    /* Webpack named bundle   */
    // }, 'host')
  }
})
