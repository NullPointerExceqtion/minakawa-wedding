import React from 'react'
import PropTypes from 'prop-types'
import ButtonFlat from '../../../components/ButtonFlat'

import './ResultView.scss'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class ResultView extends React.Component {
  static propTypes = {
    selectQuizItem     : PropTypes.object,
    nextQuizId         : PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    nextQuizPublished  : PropTypes.func,
    resultAnnouncement : PropTypes.func,
    usersInfo          : PropTypes.array
  }

  state = {
    isShowUsersResult : false
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

  typeUsersResultElement () {
    const {
      usersInfo
    } = this.props

    return (
      <div className="questionBox questionBox--large">
        {
          usersInfo.map((val, index) => {
            return (
              <Card key={index}>
                <CardHeader
                  title={`${val.name} さん`}
                  subtitle={val.correct_answer_count}
                />
              </Card>
            )
          })
        }
      </div>
    )
  }

  onTouchTapUsersResult () {
    const {
      resultAnnouncement
    } = this.props

    resultAnnouncement().then(() => {
      this.setState({
        isShowUsersResult : true
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
      isShowUsersResult
    } = this.state

    const renderElement = () => {
      // usersResultを表示
      if(isShowUsersResult) {
        return this.typeUsersResultElement()

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

    if(nextQuizId) {
      return (
        <div>
          <div className="questionNumber">Q{ selectQuizItem.no }</div>

          { renderElement() }

          <div className="usersResultButton">
            <ButtonFlat
              label='RESULT'
              onTouchTap={ () => this.onTouchTapUsersResult() }
            />
          </div>
          <div className="nextButton">
            <ButtonFlat
              label='NEXT'
              onTouchTap={ nextQuizPublished }
            />
          </div>
        </div>
      )
    }

    return (
      <div>
        {
          isShowUsersResult ? renderElement() : (
            <div className="questionBox questionBox--large">
              <p className="questionBox__tx">終わり!</p>
            </div>
          )
        }

        <div className="usersResultButton">
          <ButtonFlat
            label='RESULT'
            onTouchTap={ () => this.onTouchTapUsersResult() }
          />
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className="resultContainer">
        { this.detectRenderElement() }
      </div>
    )
  }
}

export default ResultView
