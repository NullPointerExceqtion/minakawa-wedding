// We only need to import the modules necessary for initial render
// import CoreLayout from '../layouts/CoreLayout'

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Host from './Host'
import Guest from './Guest'
import Signup from './Signup'
import Question from './Question'
import Result from './Result'
import Ope from './Ope'
import Home from './Home'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Signup(store),
  childRoutes : [
    Host(store),
    Guest(store),
    Question(store),
    Result(store),
    Ope(store),
    Home(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
