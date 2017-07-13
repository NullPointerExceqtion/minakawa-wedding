import React from 'react'
import PropTypes from 'prop-types'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import './GuestView.scss'
import Button from '../../../components/Button'

const resultElementTitle = {
  answer: '回答しました',
  correct: '正解！',
  incorrect: 'はずれ..'
}
const resultElementText = {
  answer: '回答発表までしばし待たれよ！',
  correct: 'おめでとうございます！',
  incorrect: 'どんまい！がんばろう！'
}
const resultElementImage = {
  answer: 'https://lh3.google.com/u/0/d/0B88NKwTqWU_DZ1JrN0ZqY2NuZHM=w2880-h1606-iv1',
  correct: 'https://lh3.google.com/u/0/d/0B88NKwTqWU_DTlE3S2lwa21Nb3c=w2880-h1606-iv1',
  incorrect: 'https://lh3.google.com/u/0/d/0B88NKwTqWU_DTUNJMTItMTVHcHc=w2340-h1606-iv1'
}

class GuestView extends React.Component {
  static propTypes = {
    answerSubmitted     : PropTypes.func,
    showQuizItem        : PropTypes.func,
    showIsCorrectDialog : PropTypes.func,
    quizItem            : PropTypes.object,
    userInfo            : PropTypes.object.isRequired
  }

  state = {
    selectedRadio  : false,
    selectedNumber : false
  }

  componentDidMount () {
    const { showQuizItem, showIsCorrectDialog } = this.props
    window.socket.emit('joinRoom', 'guest')

    window.socket.on('quizPublished', (quizItem) => {
      this.resetState()
      showQuizItem(quizItem)
    })

    window.socket.on('answerStop', () => {
      showIsCorrectDialog({
        isAnswerStop: true
      })
    })
  }

  onChange (e, val) {
    const selectedNumber = parseInt(val)

    this.setState({
      selectedRadio  : true,
      selectedNumber
    })
  }

  answerSubmitted(_id, userId) {
    const { answerSubmitted } = this.props
    const selectedNumber = this.state.selectedNumber

    answerSubmitted(selectedNumber, _id, userId)
  }

  resetState() {
    this.setState({
      selectedRadio: false
    })
  }

  render () {
    const { quizItem, userInfo } = this.props
    const { selectedRadio, selectedNumber } = this.state
    const radioGroupClassName = selectedRadio === false ? 'answerBox' : 'answerBox answerBox--selected'

    let renderElement = ''

    const uncheckedIcon = (number) => (
      <div className="answerBox__icon answerBox__icon--unchecked">{number}</div>
    )
    const checkedIcon = () => (
      <div className="answerBox__icon answerBox__icon--checked">
        <img src="https://lh3.google.com/u/0/d/0B88NKwTqWU_DTzZ2R2w3d29uWFE=w2340-h1606-iv1" width="30" height="auto" />
      </div>
    )

    const resultElement = (type) => (
      <div className="resultContainer">
        <img src={resultElementImage[type]} width="180" height="180"/>
        <h1 className="resultContainer__ttl">{resultElementTitle[type]}</h1>
        <p className="resultContainer__tx">{resultElementText[type]}</p>

        <div className="logo-sm logo-sm--lowerRight">
          <img src="https://lh3.google.com/u/0/d/0B88NKwTqWU_DS3FqQUZzNm54OU0=w1740-h1606-iv1" width="97" height="auto"/>
        </div>

      </div>
    )

    if (quizItem.isAnswerStop) {
      if (quizItem.isCorrect) {
        renderElement = resultElement('correct')
      } else {
        renderElement = resultElement('incorrect')
      }
    } else if (quizItem.isSubmitted) {
      renderElement = resultElement('answer')
    } else if (quizItem.title) {
      let radioButtonItems = [1, 2, 3, 4].map((val, index) =>
        <RadioButton
          className={selectedNumber === val ? 'answerBox__item is-selected' : 'answeraBox__item' }
          label={quizItem[`answer${val}`]}

          style={{
            marginBottom: '6px'
          }}

          labelStyle={{
            fontSize: '20px',
            fontWeight: 'bold',
            lineHeight: 1,
            color: '#fff'
          }}

          value={val}

          key={val}

          uncheckedIcon={uncheckedIcon(val)}
          checkedIcon={checkedIcon()}

        />
      )

      renderElement = (
        <div>
          <RadioButtonGroup
            name='guestAnswer'
            className={ radioGroupClassName }
            onChange={(e, val) => this.onChange(e, val) }
            ref='radioButtonGroup'
          >
            { radioButtonItems }
          </RadioButtonGroup>

          <div className='answerButtonContainer'>
            <p className='answerButtonContainer__tx'>正解を選んでタップしてね!</p>
            <Button label='OK' onTouchTap={() => this.answerSubmitted(quizItem._id, userInfo.userId)} disabled={!selectedRadio}></Button>
          </div>
        </div>
      )
    }

    return (
      <div className="guestContainer">
        <div className="questionNumber">Q1</div>
        {renderElement}
      </div>
    )
  }
}

export default GuestView
