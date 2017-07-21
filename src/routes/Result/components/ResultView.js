import React from 'react'
import PropTypes from 'prop-types'
import ButtonFlat from '../../../components/ButtonFlat'

import './ResultView.scss'

class ResultView extends React.Component {
  static propTypes = {
    selectQuizItem     : PropTypes.object,
    nextQuizId         : PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    nextQuizPublished  : PropTypes.func,
    resultAnnouncement : PropTypes.func,
    usersInfo          : PropTypes.array
  }

  state = {
    isShowUsersRanking : false
  }

  typeSentenceElement (description) {
    return (
      <div className="questionBox questionBox--large">
        <div className="questionBox__inner">
          <p className="questionBox__tx">{ description }</p>
        </div>
      </div>
    )
  }

  typeImageElement (description, imagePath) {
    return (
      <div className="questionBox questionBox--large questionBox--image">
        <div className="questionBox__inner">
          <div className="imageBox">
            <div className="imageBox__item">
              <div className="imageBox__wrapImage">
                <img src={ imagePath } />
              </div>
            </div>
          </div>

          <p className="questionBox__tx">{ description }</p>
        </div>
      </div>
    )
  }

  typeUsersRankingElement () {
    const {
      usersInfo
    } = this.props

    return (
      <div className="questionBox questionBox--large questionBox--ranking">
        <div className="questionBox__inner">
          <div className="rankingBox">
            <p className="rankingBox__ttl">ランキング</p>
            {
              usersInfo.map((val, index) => {
                return (
                  <div className="rankingItem">
                    <p className="rankingItem__name">{val.name}<span>さん</span></p>
                    <p className="rankingItem__point">{val.correct_answer_count}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }

  onTouchTapUsersRanking () {
    const {
      resultAnnouncement
    } = this.props

    resultAnnouncement().then(() => {
      this.setState({
        isShowUsersRanking : true
      })
    })
  }

  detectRenderElement () {
    const {
      selectQuizItem,
      nextQuizId,
      nextQuizPublished,
    } = this.props

    const {
      isShowUsersRanking
    } = this.state

    const renderElement = () => {
      // usersResultを表示
      if(isShowUsersRanking) {
        return this.typeUsersRankingElement()

      } else if(selectQuizItem.type === 'sentence') {
        // type : sentenceの結果
        return this.typeSentenceElement(selectQuizItem.description)

      } else if(selectQuizItem.type === 'image') {
        // type : imageの結果
        return this.typeImageElement(
          selectQuizItem.description,
          selectQuizItem[`image_path${selectQuizItem.correct_answer}`]
        )
      }
    }

    return (
      <div>
        { renderElement() }

        {
          !isShowUsersRanking ? (
            <div>
              <div className="questionNumber">Q{ selectQuizItem.no }</div>
              <div className="usersRankingButton">
                <ButtonFlat
                  label='Ranking'
                  onTouchTap={ () => this.onTouchTapUsersRanking() }
                />
              </div>
            </div>
          ) : ''
        }

        {
          nextQuizId ? (
            <div className="nextButton">
              <ButtonFlat
                label='NEXT'
                onTouchTap={ nextQuizPublished }
              />
            </div>
          ) : ''
        }
      </div>
    )
  }

  render () {
    return (
      <div className="resultContainer resultContainer--host">
        { this.detectRenderElement() }
      </div>
    )
  }
}

export default ResultView
