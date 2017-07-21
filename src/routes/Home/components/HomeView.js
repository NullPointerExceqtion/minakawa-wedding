import React from 'react'

import { browserHistory } from 'react-router'

import Button from '../../../components/Button'

import './HomeView.scss'

class HomeView extends React.Component {
  handleTouchTap () {
    browserHistory.push('/host')
  }

  render () {

    return (
      <div className="homeContainer">
        <div className="homeContainer__inner">
          <img src='https://cdn.rawgit.com/NullPointerExceqtion/minakawa-wedding/image/public/img/qr.png' width="auto" height="300" />

          <div className="homeContainer__tx-wrap">
            <p className="homeContainer__tx-sup">または...</p>
            <p className="homeContainer__tx-lar">minakawa.site</p>
          </div>

          <Button label='Host' onTouchTap={ this.handleTouchTap }></Button>
        </div>
      </div>
    )
  }
}

export default HomeView
