import React from 'react'
import PropTypes from 'prop-types'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import './GuestView.scss'

import Button from '../../../components/Button'

class GuestView extends React.Component {
  static propTypes = {
    answerSubmitted     : PropTypes.func,
    showQuizItem        : PropTypes.func,
    showIsCorrectDialog : PropTypes.func,
    quizItem            : PropTypes.object.isRequired,
    userInfo            : PropTypes.object.isRequired
  }

  state = {
    selectedRadio       : false
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

  onChange (selectedRadio) {
    if(selectedRadio === false) {
      this.setState({
        selectedRadio: true
      })
    }
  }

  answerSubmitted(_id, userId) {
    const { answerSubmitted } = this.props
    const selectedNumber = this.refs.radioButtonGroup.state.selected

    answerSubmitted(selectedNumber, _id, userId)
  }

  resetState() {
    this.setState({
      selectedRadio: false
    })
  }

  render () {
    const { quizItem, userInfo } = this.props
    const { selectedRadio } = this.state
    const radioGroupClassName = selectedRadio === false ? 'answerBox' : 'answerBox answerBox--selected'

    let renderElement = ''

    const uncheckedIcon = (number) => (
      <div className="answerBox__icon answerBox__icon--unchecked">{number}</div>
    )
    const checkedIcon = () => (
      <div className="answerBox__icon answerBox__icon--checked">
        <img src="/img/img_check.png" width="30" height="auto" />
      </div>
    )

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
    const resultElement = (type) => (
      <div className="resultContainer">
        <img src={`/img/img_${type}.png`} width="180" height="180"/>
        <h1 className="resultContainer__ttl">{resultElementTitle[type]}</h1>
        <p className="resultContainer__tx">{resultElementText[type]}</p>

        <div className="logo-sm logo-sm--lowerRight">
          <img src="/img/img_logo_sp.png" width="97" height="auto"/>
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
          className='answerBox__item'
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
            onChange={ () => this.onChange(selectedRadio) }
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
