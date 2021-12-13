import React, { Component } from 'react'

import PokedexList from '../pokemon/PokedexList'

export default class Dashboard extends Component {

  render() {
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col' style={{maxWidth: '60%'}}>
            <PokedexList />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
