import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/Button'

import './HostView.scss'

class HostView extends React.Component {
  static propTypes = {
    quizListGiven     : PropTypes.func,
    nextQuizPublished : PropTypes.func
  }

  componentDidMount () {
    socket.emit('joinRoom', 'host')

    const { quizListGiven } = this.props
    quizListGiven()
  }

  render () {
    const { nextQuizPublished } = this.props

    return (
      <div className="hostContainer">
        <img className="hostContainer__logo" src="https://lh3.google.com/u/0/d/0B88NKwTqWU_DVlFZQXJCVmpzWTg=w2340-h1606-iv1" width="761" height="351" />

        <Button label='START' onTouchTap={ nextQuizPublished }></Button>
      </div>
    )
  }
}

export default HostView
