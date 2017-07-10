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
        <img className="hostContainer__logo" src="/img/img_logo_pc.png" width="761" height="351" />

        <Button label='START' onTouchTap={ nextQuizPublished }></Button>
      </div>
    )
  }
}

export default HostView
