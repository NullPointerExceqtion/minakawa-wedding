import React from 'react'
import { Dialog, FlatButton, RaisedButton, TextField } from 'material-ui'

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
const textFieldCss = {
  width: '50%'
}

export default class QuizDialog extends React.Component {
  state = {
    open: false,
    title: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: ''
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render () {
    const actions = [
      <FlatButton
        label="キャンセル"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="出題"
        primary={true}
        keyboardFocused={true}
        onTouchTap={e => {
          this.props.submit(this.state)
          this.handleClose()
        }}
      />
    ]

    return (
      <div>
        <RaisedButton label={this.props.dialogTitle} onTouchTap={this.handleOpen} />
        <Dialog
          title='問題を入力してください'
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <TextField
            hintText="クイズ題名"
            fullWidth={true}
            style={{
              margin: '15px auto 10px'
            }}

            ref="title"
            onChange={(e) => {
              this.setState({title: e.target.value})
            }}
          />

          <TextField
            hintText="問1"
            style={textFieldCss}

            ref="answer1"
            onChange={(e) => {
              this.setState({answer1: e.target.value})
            }}
          />
          <TextField
            hintText="問2"
            style={textFieldCss}

            ref="answer2"
            onChange={(e) => {
              this.setState({answer2: e.target.value})
            }}
          />
          <TextField
            hintText="問3"
            style={textFieldCss}

            ref="answer3"
            onChange={(e) => {
              this.setState({answer3: e.target.value})
            }}
          />
          <TextField
            hintText="問4"
            style={textFieldCss}

            ref="answer4"
            onChange={(e) => {
              this.setState({answer4: e.target.value})
            }}
          />
        </Dialog>
      </div>
    )
  }
}
