import React from 'react'
import QuizList from '../../../components/QuizList'

class HostView extends React.Component {
  componentDidMount() {
    const { quizListGiven } = this.props
    quizListGiven()
  }

  render () {
    const { quizItems, quizPublished } = this.props

    return (
      <div>
        <QuizList quizItems={ quizItems } quizPublished={ quizPublished } />
      </div>
    )
  }
}

export default HostView
