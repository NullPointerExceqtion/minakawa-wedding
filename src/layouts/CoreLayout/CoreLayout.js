import React from 'react'
import PropTypes from 'prop-types'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import './CoreLayout.scss'

// const font = "'Arial', 'Mplus 1p'"
const font = "'Mplus 1p'"

class CoreLayout extends React.Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  getChildContext () {
    return {
      muiTheme: getMuiTheme({
        fontFamily: font
      })
    }
  }

  render () {
    const {children} =  this.props

    return (
      <div>
        <div className='core-layout__viewport'>
          {children}
        </div>
      </div>
    )
  }
}

export default CoreLayout
