import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../../components/Button'
import TextField from 'material-ui/TextField'
import FullWindowCircleProgress from '../../../components/FullWindowCircleProgress/fullWindowCircleProgress.js'
import { browserHistory } from 'react-router'


import './SignupView.scss'

class SignupView extends React.Component {
  static propTypes = {
    userRegist : PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      errorText: '',
      isProgressShow: false,
      isNormalUserName: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    window.socket.emit('joinRoom', 'guest')
  }

  handleChange (e) {
    const userName = this.refs.userName.input.value

    if (userName.length === 0) {
      this.setState({
        errorText        : 'ハンドルネームが入力されていません!',
        isNormalUserName : false
      })
    } else {
      this.setState({
        errorText        : '',
        isNormalUserName : true
      })
    }
  }

  handleSubmit (e) {
    const userName = this.refs.userName.input.value
    const { userRegist } = this.props

    if (userName.length === 0) {
      this.handleChange(userNameRef)
      return
    }

    const userRegistPromise = userRegist(this.state)

    this.setState({
      isProgressShow: true
    })

    userRegistPromise.then(() => {
      setTimeout(() => {
        this.setState({
          isProgressShow: false
        })

        browserHistory.push('/guest')
      }, 3000)
    })
  }

  render () {
    const { errorText, isProgressShow, isNormalUserName } = this.state

    return (
      <div className="signupContainer">
        <img src="https://lh3.google.com/u/0/d/0B88NKwTqWU_DS3FqQUZzNm54OU0=w1740-h1606-iv1" width="100%" height="auto" />

        <TextField
          hintText='ハンドルネームを登録してください'
          name='userName'
          errorText={errorText}
          onChange={this.handleChange}
          ref="userName"

          style={{
            margin: '48px 0 40px',
            padding: '0 15px',
            borderRadius: '6px',
            width: '100%',
            height: 40,
            lineHeight: '40px',
            border: '3px solid #fff'
          }}

          underlineStyle={{
            display: 'none'
          }}

          inputStyle={{
            position: 'absolute',
            color: '#fff',
            lineHeight: '34px',
            fontSize: '12px',
            bottom: 'inherit'
          }}

          hintStyle={{
            color: '#fff',
            lineHeight: '34px',
            fontSize: '12px',
            bottom: 'inherit'
          }}

          errorStyle={{
            position: 'absolute',
            bottom: '-24px'
          }}
        />

        <Button label='OK' disabled={!isNormalUserName} onTouchTap={this.handleSubmit} />
        <FullWindowCircleProgress isProgressShow={isProgressShow} />
      </div>
    )
  }
}

export default SignupView
