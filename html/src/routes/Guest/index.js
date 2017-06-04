export default (store) => ({
  path : 'guest',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Guest = require('./components/GuestView').default

      /*  Add the reducer to the store on key 'host'  */

      /*  Return getComponent   */
      cb(null, Guest)

    /* Webpack named bundle   */
    }, 'guest')
  }
})
