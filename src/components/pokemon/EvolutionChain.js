import React, { Component } from "react";
import Axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const EvoCard = styled.div`
  box.shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0px 3px 8px 1px;
  border: solid 1.5em rgba(#000, 0.2);
  margin: 5px;
  width: auto;
  height: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

export default class EvolutionChain extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    base: "",
    baseSpriteUrl: "",
    stage1: "",
    stage1SpriteUrl: "",
    stage2: "",
    stage2SpriteUrl: "",
    evolutionChainIndex: "",
    imageUrl: "",
    imgLoading: true,
    tooManyReqs: false,
  };

  async componentDidMount() {
    const name = this.props.name;
    const pokemonIndex = this.props.pokemonIndex;

    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

    try {
      const speciesRes = await Axios.get(pokemonSpeciesUrl);
      const evolutionChainUrl = speciesRes.data.evolution_chain.url;

      const pokemonRes = await Axios.get(evolutionChainUrl);

      let {
        base,
        baseSpriteUrl,
        stage1,
        stage1SpriteUrl,
        stage2,
        stage2SpriteUrl,
      } = "";

      base = pokemonRes.data.chain.species.name;
      stage1 = pokemonRes.data.chain["evolves_to"].map((stage) => {
        return stage.species.name;
      });
      stage2 = pokemonRes.data.chain["evolves_to"].map((stage) => {
        return stage["evolves_to"].map((st) => {
          return st.species.name;
        });
      });

      baseSpriteUrl = `https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/${base}.png`;
      stage1SpriteUrl = `https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/${stage1}.png`;
      stage2SpriteUrl = `https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/${stage2}.png`;

      console.log(`STAGE  - ${stage1} ${stage1SpriteUrl}`);
      console.log(`STAGE  - ${stage2} ${stage2SpriteUrl}`);

      this.setState({
        name,
        pokemonIndex,
        base,
        baseSpriteUrl,
        stage1,
        stage1SpriteUrl,
        stage2,
        stage2SpriteUrl,
      });
      console.log(`INDEX ${this.state.pokemonIndex}`);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div
        className="text-capitalize align-items-center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <EvoCard
          style={{ display: "flex", justifyContent: "center", width: "83%" }}
        >
          <StyledLink to={`/pokemon/:${this.state.pokemonIndex}`}>
            <div className="card-body">
              <img
                className="mb-3"
                onLoad={() => this.setState({ imgLoading: false })}
                onError={() => this.setState({ tooManyReqs: true })}
                src={this.state.baseSpriteUrl}
                style={{ display: "inline" }}
              />
              <span style={{ textAlign: "center" }}>
                <h6>{this.state.base}</h6>
              </span>
            </div>
          </StyledLink>
        </EvoCard>
        <EvoCard style={{ display: "flex", justifyContent: "center" }}>
          <StyledLink to={`/pokemon/:${this.state.pokemonIndex}`}>
            <div className="card-body">
              <img
                className="rounded mb-3"
                onLoad={() => this.setState({ imgLoading: false })}
                onError={() => this.setState({ tooManyReqs: true })}
                src={this.state.stage1SpriteUrl}
                style={{ display: "inline" }}
              />
              <h6>{this.state.stage1}</h6>
            </div>
          </StyledLink>
        </EvoCard>
        <EvoCard style={{ display: "flex", justifyContent: "center" }}>
          <StyledLink to={`/pokemon/:${this.state.pokemonIndex}`}>
            <div className="card-body">
              <img
                className="rounded mb-3"
                onLoad={() => this.setState({ imgLoading: false })}
                onError={() => this.setState({ tooManyReqs: true })}
                src={this.state.stage2SpriteUrl}
                style={{ display: "inline" }}
              />
              <h6>{this.state.stage2}</h6>
            </div>
          </StyledLink>
        </EvoCard>
      </div>
    );
  }
}
