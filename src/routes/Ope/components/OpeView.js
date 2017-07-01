import React from 'react'
import QuizList from '../../../components/QuizList'

class HostView extends React.Component {
  componentDidMount() {
    socket.emit('joinRoom', 'host')

    const {quizListGiven} = this.props
    quizListGiven()
  }

  render () {
    const {quizItems, quizPublished, answerStop} = this.props

    return (
      <div>
        <QuizList
          quizItems={quizItems}
          onTouchTap={quizPublished}
          answerStop={answerStop}
        />
      </div>
    )
  }
}

export default HostView
