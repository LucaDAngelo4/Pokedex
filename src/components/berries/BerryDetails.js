import Axios from "axios";
import React, { Component } from "react"; 
import styled from "styled-components";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

const BerryData = styled.span`
  margin: 20px;
  width: auto
`;
const ImageDiv = styled.div`
  width: '20%',
  height: '20%', 
  float: 'left',
  display: 'flex',
  justifyContent: 'center'
`;
const ImageCont = styled.div``;

export default class BerryDetails extends Component {
  state = {
    name: '',
    berryIndex: '',
    imageUrl: '',
    firmness: '',
    flavor: '',
    growthTime: '',
    maxHarvest: '',
    size: '',
    smoothness: '',
    soilDryness: '',
    naturalGiftType: '',
    naturalGiftPower: ''
  }

  async componentDidMount(){
    const { berryIndex } = this.props.match.params;
    const berryDetailsUrl = `https://pokeapi.co/api/v2/berry/${berryIndex}`;
    
    const res = await Axios.get(berryDetailsUrl);
    const name = res.data.name;

    const firmness = res.data.firmness.name;
    
    let flavors = res.data.flavors;
    const flavor = flavors.filter(item => item.potency != 0).map(flavor => flavor.flavor.name);
    const growthTime = res.data['growth_time'];
    const maxHarvest = res.data['max_harvest'];
    const size = res.data.size;
    const smoothness = res.data.smoothness;
    const soilDryness = res.data['soil_dryness'];

    const naturalGiftType = res.data['natural_gift_type'].name;
    const naturalGiftPower =  res.data['natural_gift_power'];
    console.log('TYPE: ' + naturalGiftType+ ' POW ' + naturalGiftPower)


    const imageUrl = `https://www.serebii.net/itemdex/sprites/pgl/${name}berry.png`;

    this.setState({
      name,
      berryIndex,
      imageUrl,
      firmness,
      flavor,
      growthTime,
      maxHarvest,
      size,
      smoothness,
      soilDryness,
      naturalGiftType,
      naturalGiftPower
    });
  }

  render() {
    return (
      <div className="col">
        <div className="card" style={{width: '80%', marginLeft: '100px'}}>
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5 className="text-capitalize">{this.state.name} Berry</h5>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div 
              style={{
                float: 'left',
                display: 'flex',
                justifyContent: 'center',
                width: '40%',
                marginTop: '10px'
              }}>
              <ImageDiv className=" col-md-3 ">
                <img
                  src={this.state.imageUrl}
                  className="card-img-top rounded mx-auto mt-2"
                  style={{
                      padding: '7px',
                      width: '100px',
                      height: '100px'
                  }}
                />
              </ImageDiv>
            </div>
            <div 
              style={{
                width: '50%',
                display: 'flex',
                justifyContent: 'center', 
                float: 'right',
                marginRight: '100px'
              }}>
              <BerryData className="text-capitalize">
                <p><b>Flavor </b>{this.state.flavor}</p>
                <p><b>Growth Time </b>{this.state.growthTime}</p>
                <p><b>Max Harvest </b>{this.state.maxHarvest}</p>
              </BerryData>
              <BerryData className="text-capitalize" style={{marginLeft: '40px'}}>
                <p><b>Size </b>{this.state.size}</p>
                <p><b>Smoothness </b>{this.state.smoothness}</p>
                <p><b>Soil Dryness </b>{this.state.soilDryness}</p>
              </BerryData>
            </div>
          </div>

          <hr />

          <div className="card-body float-right">
            <h5>Natural Gift Data</h5>
            <span className="text-capitalize">
                <b> Type </b>
                      <span
                        key={this.state.naturalGiftType}
                        className="badge badge-pill mr-1 text-capitalize"
                        style={{
                          backgroundColor: `#${TYPE_COLORS[this.state.naturalGiftType]}`,
                          color: "white",
                          margin: '3px'
                        }}
                      >
                        {this.state.naturalGiftType}
                      </span>
                <b> Power </b>{this.state.naturalGiftPower}
            </span>
          </div>
          <div className="card-footer text-muted">
            Data From{" "}
            <a href="https://pokeapi.co/" target="_blank" className="card-link">
              PokeAPI.co
            </a>
          </div>
        </div>
      </div>
    );
  }
}
