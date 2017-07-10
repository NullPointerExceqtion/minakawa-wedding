import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

class Button extends React.Component {
  static propTypes = {
    label      : PropTypes.string.isRequired,
    onTouchTap : PropTypes.func
  }

  render () {
    const { label, onTouchTap } = this.props

    return (
      <div className="buttonContainer">
        <RaisedButton
          label={ label }
          style={{
            borderRadius: 100,
            width: 232
          }}
          buttonStyle={{
            borderRadius: 100
          }}
          labelStyle={{
            padding: '12px 0 10px',
            fontWeight: 'bold',
            fontSize: 20
          }}
          onTouchTap={ onTouchTap }
        />
      </div>
    )
  }
}

export default Button
