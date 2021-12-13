import React, { Component, useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios';
import { Link } from 'react-router-dom';

const NavbarStyled = styled.nav`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: #ef5350
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


export default class Navbar extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon?limit=151",
    pokemon: null
  } ;

  async componentDidMount(){
    
    const data = await Axios.get(this.state.url);

  }

  render() {
    return (
      <div>
        <NavbarStyled 
          className='navbar navbar-expand-md navbar-dark fixed-top'
        >
          <div style={{ justifyContent: 'center', marginBottom: '30px', width: '90%', height: '30px'}}>
            <div style={{marginTop: '10px', marginLeft: '7px'}} >
              <StyledLink to={'/'}>
                  <h4>Pokédex</h4>
              </StyledLink>
            </div>
          </div>
          <div style={{ width: '5%', justifyContent: 'right'}}>
            <div style={{display: 'flex', position: 'relative'}}>
              <Link to={'/berries'}>
                <button 
                  className='button btn-outline-success'
                  style={{borderRadius: '10px', opacity: '0.9'}}
                >Berrydex</button>
              </Link>
            </div>
          </div>
        </NavbarStyled>
      </div>
      )
    }
  }
