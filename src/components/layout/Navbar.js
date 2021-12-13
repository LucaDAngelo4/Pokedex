import React, { Component, useState } from 'react'
import styled from 'styled-components'
import Search from '../utils/Search';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const navbarStyled = styled.nav``;
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
        <nav 
          className='navbar navbar-expand-md navbar-dark fixed-top'
          style={{backgroundColor: '#ef5350'}}
        >
          <div style={{ justifyContent: 'center', marginBottom: '30px'}}>
            <StyledLink to={'/'}>
              <a style={{fontWeight: 'bold', marginLeft: '20px', position: 'absolute'}}>Pokédex</a>
            </StyledLink>
          </div>
          <div className='container align-items-center' style={{maxWidth: '80%'}}>
            <span className='float-center'>
              <Search placeholder='Start writing a name...' data={this.data} />
            </span>
          </div>
          <div style={{float: 'right', marginRight: '30px'}}>
            <div style={{marginRight: '10'}}>
              <Link to={'/berries'}>
                <button 
                  className='button btn-outline-success'
                  style={{borderRadius: '10px', opacity: '0.9'}}
                >Berrydex</button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      )
    }
  }
