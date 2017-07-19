import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

import cowntDownCreator from '../modules/cowntDownCreator.js'

import './QuestionView.scss'

class QuestionView extends React.Component {
  static propTypes = {
    answerStop     : PropTypes.func,
    selectQuizItem : PropTypes.object
  }

  state = {
    finishTime              : 40,
    progressTimeOfCowntDown : 40
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

    this.cowntDown = cowntDownCreator(this.state.finishTime * 1000,
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

    this.cowntDown.create()
  }

  componentWillUnmount () {
    this.cowntDown.cancel()
  }

  typeSentenceElement (body) {
    return (
      <div className="questionBox">
        <p className="questionBox__tx">{body}</p>
      </div>
    )
  }

  typeImageElement (imagePath1, imagePath2, imagePath3, body) {
    return (
      <div className="questionBox">
        <ul className="imageBox">
          <li className="imageBox__item">
            <div className="imageBox__wrapImage">
              <img src={imagePath1} />
            </div>
          </li>
          <li className="imageBox__item">
            <div className="imageBox__wrapImage">
              <img src={imagePath2} />
            </div>
          </li>
          <li className="imageBox__item">
            <div className="imageBox__wrapImage">
              <img src={imagePath3} />
            </div>
          </li>
          <li className="imageBox__item questionBox__tx">
            <p>{body}</p>
          </li>
        </ul>
      </div>
    )
  }

  render () {
    const { selectQuizItem } = this.props
    const { progressTimeOfCowntDown } = this.state

    return (
      <div className="questionContainer">
        {selectQuizItem ? (
          <div>
            <div className="questionNumber">Q{selectQuizItem.no}</div>

            {
              selectQuizItem.type === 'sentence' ? this.typeSentenceElement(selectQuizItem.body) : ''
            }

            {
              selectQuizItem.type === 'image' ? this.typeImageElement(
                selectQuizItem.image_path1,
                selectQuizItem.image_path2,
                selectQuizItem.image_path3,
                selectQuizItem.body
              ) : ''
            }

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
