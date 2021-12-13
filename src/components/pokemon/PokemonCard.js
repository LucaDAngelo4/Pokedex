import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
  margin-left: 50px !important;
  margin-bottom: 3px !important;
  margin-top: 3px !important
`;

const Card = styled.div`
  width: 70%;
  box.shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
  background-color: rgba(255, 255, 255, 0.30);
  border-radius: 0px 3px 8px 1px;
  border: solid 1.5em rgba(#000, 0.2)
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
    color: black
  }
`;

const StyledBall = styled.img`
  width: 25px;
  height: 25px;
  margin-top: 5px;
  margin-left: 20px;
  opacity: .25;
  box.shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

export default class PokemonCard extends Component {

  constructor(props) {
    super(props);
    this.increaseCount = this.increaseCount.bind(this);
  }
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imgLoading: true,
    tooManyReqs: false,
    isCaught: false,
    caughtCount: 0,
    caughtList: []
  };


  componentDidMount() {
    const { name, url } = this.props;
    console.log(this.props);

    const pokemonIndex = url.split("/")[url.split("/").length - 2];

    const imageUrl = `https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/${name}.png`;

    this.setState({ name, pokemonIndex, imageUrl });
    console.log(`ISCAUGHT   ${this.state.isCaught}`)
  }


  increaseCount() {
    const name = this.props.name;
    
    console.log(`IS CAUGHT 1 ${this.state.isCaught}`)
    this.state.isCaught = !this.state.isCaught;
    let isCaught = this.state.isCaught;
    console.log(`IS CAUGHT 2 ${isCaught}`)
    
    let newCaughtList = this.state.caughtList;
    let newCaughtCount = this.state.caughtCount;
    
    if (isCaught == true) {
      
      newCaughtList.push(name)
      newCaughtCount +=1
      //this.setState({isCaught, caughtList, caughtCount})

      console.log(`TRUE, ADDING ${name}: ${newCaughtList} ${newCaughtCount}`)
      
    } else if (isCaught == false) {
      var remove = name;
      for (var i = 0; i < newCaughtList.length; i++) {
        if (newCaughtList[i] === remove) {
          newCaughtList.splice(remove, 1);
        }
      }
      newCaughtCount -= 1;
      //console.log('' + JSON.stringify(this.state))
      //this.setState({isCaught, caughtList, caughtCount})

      console.log(`FALSE, REMOVING ${name}: ${newCaughtList} ${newCaughtCount}`)

    }
    this.setState({isCaught, caughtList: newCaughtList, caughtCount: newCaughtCount}, () => {
      console.log(`STATE UPDATED: ${this.state.isCaught} - ${this.state.caughtCount} - ${this.state.caughtList}`)
    })
  }

  render() {
    return (
      <div style={{ height: "100%", width: "60vw", maxWidth: "55vw" }}>
        <div
          className="col-md-3 col-sm-6 mb-2"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Card>
            <button
              style={{
                width: "17px",
                height: "17px",
                margin: "30 30 30 30",
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={ this.increaseCount}
            >
              {this.state.isCaught ? (
                <StyledBall
                  src={process.env.PUBLIC_URL + "/Poké_Ball_caught.png"}
                  style={{ opacity: "100" }}
                />
              ) : (
                <StyledBall
                  src={process.env.PUBLIC_URL + "/pokeball_gray.png"}
                />
              )}
            </button>
              <Sprite
                className="rounded mx-auto"
                onLoad={() => this.setState({ imgLoading: false })}
                onError={() => this.setState({ tooManyReqs: true })}
                src={this.state.imageUrl}
                style={
                  this.state.tooManyReqs
                    ? { display: "none" }
                    : this.state.imgLoading
                    ? null
                    : { display: "inline" }
                }
              />
              <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
              <div
                className="card-body"
                style={{ float: "right", width: '50%', justifyContent: 'left' }}
              >
                <p
                  className="text-capitalize"
                  style={{
                    marginTop: "15px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    fontSize: "20px",
                  }}
                >
                  #{this.state.pokemonIndex} {this.state.name}
                </p>
              </div>
            </StyledLink>
          </Card>
        </div>
      </div>
    );
  }
}
