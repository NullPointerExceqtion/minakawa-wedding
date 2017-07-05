import React from 'react'
import QuizList from '../../../components/QuizList'
import RaisedButton from 'material-ui/RaisedButton'

class HostView extends React.Component {
  componentDidMount() {
    socket.emit('joinRoom', 'host')

    const {quizListGiven} = this.props
    quizListGiven()
  }

  clearStorage () {
    localStorage.clear()
  }

  render () {
    const { quizItems, quizPublished, answerStop } = this.props

    return (
      <div>
        <QuizList
          quizItems={quizItems}
          onTouchTap={quizPublished}
          answerStop={answerStop}
        />

        <RaisedButton label='Clear Storage' onTouchTap={this.clearStorage} />
      </div>
    )
  }
}

export default HostView
