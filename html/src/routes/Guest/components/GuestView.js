import React from 'react'

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { Card, CardActions, CardTitle } from 'material-ui/Card'

class GuestView extends React.Component {
  constructor() {
    super()

    this.state = {
      title: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: ''
    }
  }

  componentDidMount() {
    socket.emit('joinRoom', 'guest')

    window.socket.on('quizPublished', (quizItem) => {
      this.setState(quizItem)
    })
  }

  render() {
    return (
      <div>
        {
          this.state.title ? (
            <Card>
              <CardTitle title={ this.state.title } />
              <CardActions>
                <RadioButtonGroup name='answer'>
                  <RadioButton
                    value='1'
                    label={ this.state.answer1 }
                  />
                  <RadioButton
                    value='2'
                    label={ this.state.answer2 }
                  />
                  <RadioButton
                    value='3'
                    label={ this.state.answer3 }
                  />
                  <RadioButton
                    value='4'
                    label={ this.state.answer4 }
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
