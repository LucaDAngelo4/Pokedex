import axios from "axios";
import React, { Component } from "react";
import styled from "styled-components";
import BerryCard from "./BerryCard";

const Card = styled.div`
  box.shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

export default class Berries extends Component {

  state = {
    url: 'https://pokeapi.co/api/v2/berry?limit=70',
    berries: null
  }

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({berries: res.data['results']});
    
  }

  render() {
    return (
      <React.Fragment>
        {this.state.berries ? (
          <div className="row" style={{marginLeft: '100px', marginTop: '30px'}}>
            {this.state.berries.map(berry => ( 
              <BerryCard
                key={berry.name}
                name={berry.name}
                url={berry.url}
              />
            ))}
          </div>
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </React.Fragment>
    );
  }
}
