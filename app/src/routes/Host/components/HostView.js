import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

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
      <div>
        <RaisedButton
          label='START!!!'
          onTouchTap={nextQuizPublished}
        />
      </div>
    )
  }
}

export default HostView
