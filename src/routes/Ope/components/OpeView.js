import React from 'react'
import QuizList from '../../../components/QuizList'
import RaisedButton from 'material-ui/RaisedButton'

import { Link } from 'react-router'

class HostView extends React.Component {
  componentDidMount() {
    socket.emit('joinRoom', 'host')

    const {quizListGiven} = this.props
    quizListGiven()
  }

  clearStorage () {
    localStorage.clear()
  }

  render () {
    const { quizItems, quizPublished, answerStop } = this.props

    return (
      <div>
        <QuizList
          quizItems={quizItems}
          onTouchTap={quizPublished}
          answerStop={answerStop}
        />

        <RaisedButton label='Clear Storage' onTouchTap={this.clearStorage} />

        <ul>
          <li><Link to='/guest'>Guest</Link></li>
          <li><Link to='/host'>Host</Link></li>
          <li><Link to='/'>Signup</Link></li>
          <li><Link to='/ope'>Ope</Link></li>
        </ul>
      </div>
    )
  }
}

export default HostView
