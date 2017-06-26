import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { browserHistory } from 'react-router'

class ResultView extends React.Component {
  componentDidMount() {
    const { setSelectedQuizId } = this.props
    const { selectedQuizId } = this.props.params
    setSelectedQuizId(selectedQuizId)
  }

  render () {
    const { selectQuizItem, nextQuizId } = this.props
    console.log(selectQuizItem, nextQuizId)

    return (
      <div>
        {
          nextQuizId
          ? selectQuizItem ? (
            <div>
              <p>正解をここにひょうじ</p>

              <RaisedButton
                label='次の問題へ'
                onTouchTap={() => browserHistory.push(`/host/question/${nextQuizId}`)}
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
