import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'

class ButtonFlat extends React.Component {
  static propTypes = {
    label      : PropTypes.string.isRequired,
    onTouchTap : PropTypes.func
  }

  render () {
    const { label, onTouchTap } = this.props

    return (
      <div className="buttonFlatContainer">
        <FlatButton
          label={ label }
          style={{
            width: 'auto',
            height: 56,
            lineHeight: '56px'
          }}
          labelStyle={{
            paddingLeft: 10,
            paddingRight: 10,
            fontWeight: 'bold',
            fontSize: 32,
            color: '#fff'
          }}
          onTouchTap={ onTouchTap }
        />
      </div>
    )
  }
}

export default ButtonFlat
