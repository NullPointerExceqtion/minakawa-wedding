import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

import cowntDownCreator from '../modules/cowntDownCreator.js'

class QuestionView extends React.Component {
  static propTypes = {
    answerStop     : PropTypes.func,
    selectQuizItem : PropTypes.object.isRequired,
  }

  state = {
    finishTime              : 5,
    progressTimeOfCowntDown : 5
  }

  emitAnswerStop (_id) {
    const { answerStop } = this.props

    answerStop(_id).then(() => {
      browserHistory.push(`/host/result/${_id}`)
    })
  }

  formatProgressTime (progressTime) {
    return parseInt(progressTime.toString().slice(0, -3))
  }

  componentDidMount () {
    const { selectQuizItem } = this.props

    cowntDownCreator(this.state.finishTime * 1000,
      (progressTime) => {
        const time = this.formatProgressTime(progressTime)
        this.setState({
          progressTimeOfCowntDown : this.state.finishTime - time
        })
      },
      (progressTime) => {
        this.emitAnswerStop(selectQuizItem._id)
      }
    )
  }

  render () {
    const { selectQuizItem } = this.props
    const { progressTimeOfCowntDown } = this.state

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

            <p>{progressTimeOfCowntDown}</p>

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
