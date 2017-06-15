import React from 'react'

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { Card, CardActions, CardTitle } from 'material-ui/Card'

class GuestView extends React.Component {
  componentDidMount() {
    const {showQuizItem, answerSubmitted, showSubmittedDialog, showIsCorrectDialog} = this.props
    window.socket.emit('joinRoom', 'guest')

    window.socket.on('quizPublished', (quizItem) => {
      showQuizItem(quizItem)
    })

    window.socket.on('answerStop', () => {
      showIsCorrectDialog({
        isAnswerStop: true
      })
    })
  }

  render() {
    const {answerSubmitted, quizItem} = this.props
    let renderElement = ''

    if (quizItem.isAnswerStop) {
      if (quizItem.isCorrect) {
        renderElement = <p>正解です</p>
      } else {
        renderElement = <p>不正解です</p>
      }
    } else if (quizItem.isSubmitted) {
      renderElement = <p>回答済みです</p>
    } else if (quizItem.title) {
      renderElement = (
        <Card>
          <CardTitle title={quizItem.title} />
          <CardActions>
            <RadioButtonGroup name='answer'>
              <RadioButton
                value='1'
                label={quizItem.answer1}
                onTouchTap={() => answerSubmitted(1)}
              />
              <RadioButton
                value='2'
                label={quizItem.answer2}
                onTouchTap={() => answerSubmitted(2)}
              />
              <RadioButton
                value='3'
                label={quizItem.answer3}
                onTouchTap={() => answerSubmitted(3)}
              />
              <RadioButton
                value='4'
                label={quizItem.answer4}
                onTouchTap={() => answerSubmitted(4)}
              />
            </RadioButtonGroup>
          </CardActions>
        </Card>
      )
    }

    return (
      <div>
        {renderElement}
      </div>
    )
  }
}

export default GuestView
