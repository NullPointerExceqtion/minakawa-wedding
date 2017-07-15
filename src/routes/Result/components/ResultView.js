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

  typeSentenceElement (description) {
    return (
      <div className="questionBox questionBox--large">
        <p className="questionBox__tx">{ description }</p>
      </div>
    )
  }

  typeImageElement (description, imagePath) {
    return (
      <div className="questionBox questionBox--large">

        <div className="imageBox">
          <div className="imageBox__item">
            <div className="imageBox__wrapImage">
              <img src={ imagePath } />
            </div>
          </div>
        </div>

        <p className="questionBox__tx">{ description }</p>
      </div>
    )
  }

  render () {
    const { selectQuizItem, nextQuizId, nextQuizPublished } = this.props
    if(selectQuizItem) {
      console.log(selectQuizItem)
      console.log(selectQuizItem.type === 'image')
      console.log(this.typeImageElement)
    }

    return (
      <div className="resultContainer">
        {
          nextQuizId
          ? selectQuizItem ? (
            <div>
              <div className="questionNumber">Q{ selectQuizItem.no }</div>

              {
                selectQuizItem.type === 'sentence' ? this.typeSentenceElement(selectQuizItem.description) : ''
              }

              {
                selectQuizItem.type === 'image' ? this.typeImageElement(
                  selectQuizItem.description,
                  selectQuizItem[`image_path${selectQuizItem.correct_answer}`]
                ) : ''
              }

              <div className="nextButton">
                <ButtonFlat
                  label='NEXT'
                  onTouchTap={ nextQuizPublished }
                />
              </div>
            </div>
          ) : '' : (
            <div className="questionBox questionBox--large">
              <p className="questionBox__tx">終わり!</p>
            </div>
          )
        }
      </div>
    )
  }
}

export default ResultView
