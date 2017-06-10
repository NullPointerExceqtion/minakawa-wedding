import React from 'react'

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { Card, CardActions, CardTitle } from 'material-ui/Card'

class GuestView extends React.Component {
  componentDidMount() {
    const {showQuizItem} = this.props
    window.socket.emit('joinRoom', 'guest')

    window.socket.on('quizPublished', (quizItem) => {
      showQuizItem(quizItem)
    })

    window.socket.on('answerStop', () => {
      
    })
  }

  render() {
    const {answerSubmitted, quizItem} = this.props
    console.log(quizItem)

    return (
      <div>
        {
          quizItem.title ? (
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
          ) : ''
        }
      </div>
    )
  }
}

export default GuestView
