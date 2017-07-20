import React from 'react'
import PropTypes from 'prop-types'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import './GuestView.scss'
import Button from '../../../components/Button'

import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

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
  answer: 'https://cdn.rawgit.com/NullPointerExceqtion/minakawa-wedding/image/public/img/img_answer.png',
  correct: 'https://cdn.rawgit.com/NullPointerExceqtion/minakawa-wedding/image/public/img/img_correct.png',
  incorrect: 'https://cdn.rawgit.com/NullPointerExceqtion/minakawa-wedding/image/public/img/img_incorrect.png'
}

/**
 * Element
 */
// ①~④のボタンElement
const uncheckedIcon = (number) => (
  <div className="answerBox__icon answerBox__icon--unchecked">{number}</div>
)

// ①~④のcheckパターン
const checkedIcon = () => (
  <div className="answerBox__icon answerBox__icon--checked">
    <img src="https://cdn.rawgit.com/NullPointerExceqtion/minakawa-wedding/image/public/img/img_check.png" width="30" height="auto" />
  </div>
)

// 正解結果画面
const resultElement = (type) => (
  <div className="resultContainer">
    <div className="resultContainer__inner">
      <img src={resultElementImage[type]} width="180" height="180"/>
      <h1 className="resultContainer__ttl">{resultElementTitle[type]}</h1>
      <p className="resultContainer__tx">{resultElementText[type]}</p>

      <div className="logo-sm logo-sm--lowerRight">
        <img src="https://cdn.rawgit.com/NullPointerExceqtion/minakawa-wedding/image/public/img/img_logo_sp.png" width="97" height="auto"/>
      </div>
    </div>
  </div>
)

class GuestView extends React.Component {
  static propTypes = {
    answerSubmitted     : PropTypes.func,
    showQuizItem        : PropTypes.func,
    showIsCorrectDialog : PropTypes.func,
    quizItem            : PropTypes.object,
    userInfo            : PropTypes.object
  }

  state = {
    selectedRadio  : false,
    selectedNumber : false
  }

  componentDidMount () {
    const { showQuizItem, showIsCorrectDialog, joinRoom } = this.props
    joinRoom('guest')

    // 問題をサーバーから受け取る
    window.socket.on('quizPublished', (quizItem) => {
      this.resetState()
      showQuizItem(quizItem)
    })

    // 問題停止をサーバーから受け取る
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

  answerSubmitted (_id, userId) {
    const { answerSubmitted } = this.props
    const selectedNumber = this.state.selectedNumber

    answerSubmitted(selectedNumber, _id, userId)
  }

  resetState () {
    this.setState({
      selectedRadio  : false,
      selectedNumber : false
    })
  }

  radioButtonsElement (radioNum) {
    const { quizItem, userInfo } = this.props
    const { selectedRadio, selectedNumber } = this.state

    const radioGroupClassName = selectedRadio === false ? 'answerBox' : 'answerBox answerBox--selected'

    const radioNumArray = []
    for(let i = 1; i < radioNum + 1; i++) {
      radioNumArray.push(i)
    }

    let radioButtonItems = radioNumArray.map((val, index) => {
      return (
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
    })

    return (
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

  render () {
    const { quizItem, userInfo } = this.props
    const questionNumber = quizItem.no ? `Q${quizItem.no}` : ''

    let renderElement = ''
    let key = ''

    if(!quizItem.isAnswerStop && quizItem.isGetQuizItem) {
      key = 'radio'
      renderElement = this.radioButtonsElement(quizItem.type === 'sentence' ? 4 : 3)
    }

    if (quizItem.isAnswerStop) {
      if (quizItem.isCorrect) {
        key = 'correct'
        renderElement = resultElement('correct')
      } else {
        key = 'incorrect'
        renderElement = resultElement('incorrect')
      }
    } else if (quizItem.isSubmitted) {
      key = 'answer'
      renderElement = resultElement('answer')
    }

    return (
      <TransitionGroup className="transitionGroup">
        <CSSTransition appear timeout={{appear:1000, enter:2000, exit:1000}} classNames="pageFade" key={key}>
          <div className="guestContainer">
            <div className="questionNumber">{questionNumber}</div>
            {renderElement}
          </div>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default GuestView
