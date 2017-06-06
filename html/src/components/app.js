import React from 'react'
import Header from'./Header'
import DialogContainer from '../container/DialogContainer'
import QuizList from '../container/QuizList'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class App extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext () {
    return {
      muiTheme: getMuiTheme(baseTheme)
    }
  }

  render () {
    return (
      <div>
        <Header />

        <DialogContainer dialogTitle="出題" />

        <QuizList />
      </div>
    )
  }
}

export default App
