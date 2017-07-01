import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import './fullWindowCircleProgress.css'

class FullWindowCircleProgress extends React.Component {
  progressElement () {
    return (
      <div className='fullWindowCircleProgress'>
        <CircularProgress size={60} thickness={7} />
      </div>
    )
  }

  render () {
    const { isProgressShow } = this.props

    return (
      <div>
        {isProgressShow
          ? this.progressElement()
          : false
        }
      </div>
    )
  }
}

export default FullWindowCircleProgress
