import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

class HostView extends React.Component {
  componentDidMount() {
    socket.emit('joinRoom', 'host')

    const {quizListGiven} = this.props
    quizListGiven()
  }

  render () {
    const {nextQuizPublished} = this.props

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
