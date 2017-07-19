import React from 'react'
import PropTypes from 'prop-types'

import Snackbar from 'material-ui/Snackbar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import './CoreLayout.scss'

// const font = "'Arial', 'Mplus 1p'"
const font = "'Mplus 1p'"

class CoreLayout extends React.Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  state = {
    open            : false,
    message         : false,
    isSocketConnect : false
  }

  componentDidMount () {  
    window.socket.on('connect', () => {
      this.setSocketStatus('connect')
      this.setMessage('接続しました！')
      this.showSnack()

      setTimeout(() => {
        this.hideSnack()
      }, 4000)
    })

    window.socket.on('disconnect', () => {
      this.setSocketStatus('disconnect')
      this.setMessage('接続が切れました...')
      this.showSnack()
    })
  }

  getChildContext () {
    return {
      muiTheme: getMuiTheme({
        fontFamily: font
      })
    }
  }

  setMessage = (message) => {
    this.setState({
      message
    })
  }

  setSocketStatus = (status) => {
    if(status === 'connect') {
      this.setState({
        isSocketConnect : true
      })
    } else if(status === 'disconnect') {
      this.setState({
        isSocketConnect : false
      })
    }
  }

  showSnack = () => {
    this.setState({
      open: true,
    })
  }

  hideSnack = () => {
    this.setState({
      open: false,
    });
  }

  reconnect = () => {
    try {
      socket.open()
    } catch (e) {
      console.warn(e)
    }
  }

  render () {
    const { children } = this.props
    const { message, open, isSocketConnect } = this.state

    return (
      <div>
        <div className='core-layout__viewport'>
          <TransitionGroup className="transitionGroup">
            <CSSTransition appear timeout={{appear:1000,enter:2000,exit:1000}} classNames="pageFade" key={this.props.location.key}>
              { children }
            </CSSTransition>
          </TransitionGroup>
        </div>

        <Snackbar
          open={ open }

          message={ message }
          action={ !isSocketConnect ? '再接続する' : '' }
          onActionTouchTap={ !isSocketConnect ? this.reconnect : ''}
          onRequestClose={(e) => console.log(e)}

          contentStyle={{
            textAlign: 'center'
          }}

          bodyStyle={{
            height: 'auto'
          }}

          className='snackbar'
        />
      </div>
    )
  }
}

export default CoreLayout
