import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/Button'

import ReactPlayer from 'react-player'

import './HostView.scss'

class HostView extends React.Component {
  static propTypes = {
    quizListGiven     : PropTypes.func,
    nextQuizPublished : PropTypes.func
  }

  componentDidMount () {
    const { quizListGiven, resetStoreExceptSignup, joinRoom } = this.props

    resetStoreExceptSignup().then(() => {
      joinRoom('host')
      quizListGiven()
    })
  }

  render () {
    const { nextQuizPublished } = this.props

    return (
      <div className="hostContainer">
        <div className="hostContainer__inner">
          <img className="hostContainer__logo" src="https://cdn.rawgit.com/NullPointerExceqtion/minakawa-wedding/image/public/img/img_logo_pc.png" width="761" height="351" />
          <Button label='START' onTouchTap={ nextQuizPublished }></Button>

          <ReactPlayer url="/sekai.mp3" playing width="0" height="0" volume={ 0.2 } />
        </div>
      </div>
    )
  }
}

export default HostView
