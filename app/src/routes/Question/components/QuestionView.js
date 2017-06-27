import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

class QuestionView extends React.Component {
  emitAnswerStop(_id) {
    const { answerStop } = this.props

    answerStop(_id).then(() => {
      browserHistory.push(`/host/result/${_id}`)
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

            <RaisedButton
              label='解答締め切り'
              onTouchTap={() => this.emitAnswerStop(selectQuizItem._id)}
            />
          </div>
        ) : ''}
      </div>
    )
  }
}

export default QuestionView
