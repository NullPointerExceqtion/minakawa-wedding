import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

import cowntDownCreator from '../modules/cowntDownCreator.js'

import './QuestionView.scss'

class QuestionView extends React.Component {
  static propTypes = {
    answerStop     : PropTypes.func,
    selectQuizItem : PropTypes.object.isRequired,
  }

  state = {
    finishTime              : 10,
    progressTimeOfCowntDown : 10
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

    console.log(selectQuizItem)

    return (
      <div className="questionContainer">
        {selectQuizItem ? (
          <div>
            <div className="questionNumber">Q1</div>

            <div className="questionInfoBox">
              <p className="questionInfoBox__tx">{selectQuizItem.body}</p>
            </div>

            <div className="progressTimeOfCowntDown">
              <span className="progressTimeOfCowntDown__subTx">残り</span>
              {progressTimeOfCowntDown}
            </div>
          </div>
        ) : ''}
      </div>
    )
  }
}

export default QuestionView
