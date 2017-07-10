import React from 'react'
import PropTypes from 'prop-types'
import ButtonFlat from '../../../components/ButtonFlat'

import './ResultView.scss'

class ResultView extends React.Component {
  static propTypes = {
    nextQuizId        : PropTypes.string.isRequired,
    selectQuizItem    : PropTypes.object.isRequired,
    nextQuizPublished : PropTypes.func
  }

  render () {
    const { selectQuizItem, nextQuizId, nextQuizPublished } = this.props

    return (
      <div className="resultContainer">
        {
          nextQuizId
          ? selectQuizItem ? (
            <div>
              <div className="questionNumber">Q1</div>

              <div className="textBox textBox--large">
                <p className="textBox__tx">{ selectQuizItem.description }</p>
              </div>

              <div className="nextButton">
                <ButtonFlat
                  label='NEXT'
                  onTouchTap={ nextQuizPublished }
                />
              </div>
            </div>
          ) : '' : (
            <div className="textBox textBox--large">
              <p className="textBox__tx">終わり!</p>
            </div>
          )
        }
      </div>
    )
  }
}

export default ResultView
