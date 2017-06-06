import React from 'react'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

class QuizListiItem extends React.Component {
  render() {
    const { title, id, quizPublished } = this.props

    return (
      <Card>
        <CardHeader
          title={ title }
        />
        <CardActions>
          <FlatButton label='開始' onTouchTap={() => quizPublished(id) } />
          <FlatButton label='解答締め切り' />
        </CardActions>
      </Card>
    )
  }
}

export default QuizListiItem
