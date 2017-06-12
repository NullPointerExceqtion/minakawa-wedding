import React, { PropTypes } from 'react'
import QuizItem from './QuizItem'

class QuizList extends React.Component {
  render() {
    const { quizItems, quizPublished } = this.props

    return (
      <div>
        { quizItems.map((quizItem, i) => {
          return (
            <QuizItem
              key={ i }
              _id={ quizItem._id }
              title={ quizItem.title }
              quizPublished={ quizPublished }
            />
          )
        })}
      </div>
    )
  }
}

export default QuizList
