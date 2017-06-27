import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

class ResultView extends React.Component {
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
