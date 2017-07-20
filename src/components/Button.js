import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

class Button extends React.Component {
  static propTypes = {
    label      : PropTypes.string.isRequired,
    onTouchTap : PropTypes.func
  }

  render () {
    const { label, onTouchTap, disabled, type } = this.props

    return (
      <div className="buttonContainer">
        <RaisedButton
          className="buttonContainer__btn"
          label={ label }
          disabledBackgroundColor='#fff'
          disabledLabelColor="#000"
          type={type}

          style={{
            borderRadius: 100,
            width: 232,
            opacity: disabled ? 0.3 : 1
          }}

          buttonStyle={{
            borderRadius: 100,
            overflow: 'hidden'
          }}

          labelStyle={{
            padding: '12px 0 10px',
            fontWeight: 'bold',
            fontSize: 20
          }}

          onTouchTap={ onTouchTap }

          disabled={ disabled }
        />
      </div>
    )
  }
}

export default Button
