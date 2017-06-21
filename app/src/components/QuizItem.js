import React from 'react'
import {Card, CardActions, CardHeader} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { browserHistory } from 'react-router'

class QuizListiItem extends React.Component {
  render() {
    const {title, _id, quizPublished, answerStop} = this.props

    return (
      <Card>
        <CardHeader
          title={title}
        />
        <CardActions>
          <FlatButton label='開始' onTouchTap={() => {
            // quizPublished(_id)
            browserHistory.push(`/host/question/${_id}`)
          }} />
          <FlatButton label='解答締め切り' onTouchTap={() => answerStop(_id)} />
        </CardActions>
      </Card>
    )
  }
}

export default QuizListiItem
