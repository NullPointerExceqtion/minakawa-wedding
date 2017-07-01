import React from 'react'
import PropTypes from 'prop-types'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { Card, CardActions, CardTitle } from 'material-ui/Card'

class GuestView extends React.Component {
  static propTypes = {
    answerSubmitted     : PropTypes.func,
    showQuizItem        : PropTypes.func,
    showIsCorrectDialog : PropTypes.func,
    quizItem            : PropTypes.object.isRequired,
    userInfo            : PropTypes.object.isRequired
  }

  componentDidMount () {
    const { showQuizItem, showIsCorrectDialog } = this.props
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

  render () {
    const { answerSubmitted, quizItem, userInfo } = this.props
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
                onTouchTap={() => answerSubmitted('1', quizItem._id, userInfo.userId)}
              />
              <RadioButton
                value='2'
                label={quizItem.answer2}
                onTouchTap={() => answerSubmitted('2', quizItem._id, userInfo.userId)}
              />
              <RadioButton
                value='3'
                label={quizItem.answer3}
                onTouchTap={() => answerSubmitted('3', quizItem._id, userInfo.userId)}
              />
              <RadioButton
                value='4'
                label={quizItem.answer4}
                onTouchTap={() => answerSubmitted('4', quizItem._id, userInfo.userId)}
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
