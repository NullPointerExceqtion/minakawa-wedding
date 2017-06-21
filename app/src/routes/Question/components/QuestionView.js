import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

class QuestionView extends React.Component {
  componentDidMount() {
    const { setQuiz, quizListGiven, quizItems, quizPublished } = this.props
    const { selectQuizId } = this.props.params

    if (quizItems.length === 0) {
      quizListGiven().then(() => {
        setQuiz(selectQuizId)
      })
    } else {
      setQuiz(selectQuizId)
    }

    quizPublished(selectQuizId)
  }

  emitAnswerStop(_id) {
    const { answerStop } = this.props

    answerStop(_id).then(() => {
      browserHistory.push(`/host/`)
    })
  }

  render () {
    const { selectQuizItem } = this.props

    return (
      <div>
        {selectQuizItem ? (
          <div>
            <h1>{selectQuizItem.title}</h1>
            <ul>
              <li>{selectQuizItem.answer1}</li>
              <li>{selectQuizItem.answer2}</li>
              <li>{selectQuizItem.answer3}</li>
              <li>{selectQuizItem.answer4}</li>
            </ul>

            <RaisedButton label='解答締め切り' onTouchTap={() => this.emitAnswerStop(selectQuizItem._id)} />
          </div>
        ) : ''}
      </div>
    )
  }
}

export default QuestionView
