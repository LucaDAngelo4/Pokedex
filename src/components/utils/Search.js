import React, { Component, useState } from "react";
import PokemonCard from "../pokemon/PokemonCard";
import axios, { Axios } from "axios";

export default class Search extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon?limit=151",
    pokemon: null,
    res: null
  };

  async componentDidMount(){

    const res = await axios.get(this.state.url);

    this.setState({ res})

  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
