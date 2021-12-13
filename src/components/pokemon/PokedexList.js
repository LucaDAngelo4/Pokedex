import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import PokemonCard from './PokemonCard'

export default class PokedexList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon?limit=151",
    pokemon: null,
    caughtCount: null
  }

  async componentDidMount(){
    const res = await axios.get(this.state.url);
    this.setState({pokemon: res.data['results']});
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <div className='col'>
            {this.state.pokemon.map(pokemon => (
              <PokemonCard
                key={pokemon.name} 
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
        
      </React.Fragment>
    )
  }
}
