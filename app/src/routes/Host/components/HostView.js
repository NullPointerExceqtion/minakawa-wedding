import React from 'react'
import QuizList from '../../../components/QuizList'

class HostView extends React.Component {
  componentDidMount() {
    socket.emit('joinRoom', 'host')

    const {quizListGiven} = this.props
    quizListGiven()
  }

  render () {
    const {quizItems, nextQuizPublished, answerStop} = this.props

    return (
      <div>
        <QuizList
          quizItems={quizItems}
          onTouchTap={nextQuizPublished}
          answerStop={answerStop}
        />
      </div>
    )
  }
}

export default HostView
