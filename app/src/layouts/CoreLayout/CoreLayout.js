import React from 'react'
import PropTypes from 'prop-types'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Header from '../../components/Header'

class CoreLayout extends React.Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  getChildContext () {
    return {
      muiTheme: getMuiTheme(baseTheme)
    }
  }

  render () {
    const {children} =  this.props

    return (
      <div>
        <Header />

        <div className='core-layout__viewport'>
          {children}
        </div>
      </div>
    )
  }
}

export default CoreLayout
