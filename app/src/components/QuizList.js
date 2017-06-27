import React, { PropTypes } from 'react'
import QuizItem from './QuizItem'

class QuizList extends React.Component {
  render() {
    const {quizItems, onTouchTap, answerStop} = this.props

    return (
      <div>
        { quizItems.map((quizItem, i) => {
          return (
            <QuizItem
              key={i}
              _id={quizItem._id}
              title={quizItem.title}
              onTouchTap={onTouchTap}
              answerStop={answerStop}
            />
          )
        })}
      </div>
    )
  }
}

export default QuizList
