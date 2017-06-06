import React from 'react'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const QuizListiItem = (props) => (
  <Card>
    <CardHeader
      title={ props.title }
    />
    <CardActions>
      <FlatButton label='開始' onTouchTap={ props.quizPublished(props.id) } />
      <FlatButton label='解答締め切り' />
    </CardActions>
  </Card>
)

export default QuizListiItem
