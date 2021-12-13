import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from 'react-router-dom';
import { MDBSpinner } from "mdb-react-ui-kit";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
`;
const BrCard = styled.div`
  box.shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.50)
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
  }
`;

export default class BerryCard extends Component {
  state = {
    name: '',
    imageUrl: '',
    berryIndex: '',
    tooManyRequests: false,
    imageLoading: true
  };

  async componentDidMount() {
    const { name, url } = this.props;
    const berryIndex = url.split('/')[url.split('/').length -2];
    
    const imageUrl = `https://www.serebii.net/itemdex/sprites/pgl/${name}berry.png`;

    this.setState({name, berryIndex, imageUrl})
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-3" style={{display: 'flex', justifyContent: 'center'}}>
        <BrCard style={{display: 'flex', justifyContent: 'center', width: '83%'}}>
          <StyledLink to={`berries/${this.state.berryIndex}`}>
            <div style={{alignContent: 'center !important'}}>
              <Sprite
                className="card-img-top rounded mx-auto mt-2"
                src={this.state.imageUrl}
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() => this.setState({ tooManyRequests: true })}
                style={
                  this.state.tooManyRequests
                    ? { display: 'none' }
                    : this.state.imageLoading
                    ? null
                    : { display: 'block' }
                }
              />
            </div>
            <div className="card-footer mt-3">
              <h6 className="card-title text-capitalize align-center">
                {this.state.name} Berry
              </h6>
            </div>
          </StyledLink>
        </BrCard>
      </div>
    );
  }
}
