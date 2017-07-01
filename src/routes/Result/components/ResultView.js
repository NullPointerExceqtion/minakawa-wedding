import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

class ResultView extends React.Component {
  static propTypes = {
    nextQuizId        : PropTypes.string.isRequired,
    selectQuizItem    : PropTypes.object.isRequired,
    nextQuizPublished : PropTypes.func
  }

  render () {
    const { selectQuizItem, nextQuizId, nextQuizPublished } = this.props

    return (
      <div>
        {
          nextQuizId
          ? selectQuizItem ? (
            <div>
              <p>正解をここにひょうじ</p>

              <RaisedButton
                label='次の問題へ'
                onTouchTap={nextQuizPublished}
              />
            </div>
          ) : '' : (
            <p>終わり</p>
          )
        }
      </div>
    )
  }
}

export default ResultView
