import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FullWindowCircleProgress from '../../../components/FullWindowCircleProgress/fullWindowCircleProgress.js'
import { browserHistory } from 'react-router'

class SignupView extends React.Component {
  static propTypes = {
    userRegist : PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      userName: '',
      errorText: '',
      isProgressShow: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    window.socket.emit('joinRoom', 'guest')
  }

  handleChange (e) {
    const userName = e.target.value

    this.setState({
      userName
    })

    if (userName.length === 0) {
      this.setState({
        errorText: '名前が入力されていません!'
      })
    } else {
      this.setState({
        errorText: ''
      })
    }
  }

  handleSubmit (e) {
    const { userName } = this.state
    const { userRegist } = this.props

    if (userName.length === 0) {
      this.handleChange()
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
    const { errorText, isProgressShow } = this.state

    return (
      <div>
        <TextField
          hintText='名前を入力してください'
          name='userName'
          errorText={errorText}
          onChange={this.handleChange}
        />
        <RaisedButton label='送信する' onTouchTap={this.handleSubmit} />
        <FullWindowCircleProgress isProgressShow={isProgressShow} />
      </div>
    )
  }
}

export default SignupView
