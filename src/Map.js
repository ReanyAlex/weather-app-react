import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';




class Map extends Component {
  constructor(props){
    super(props)
    this.state = {
      center: {lat: this.props.location.lat, lng: this.props.location.long },
      zoom: 11
    }

  };


  render() {
    console.log(this.props);
    console.log(this.state.center);
    return (
      <div className="map col-4-md col-0-sm"
            style={{ height: '450px'}}>

       <GoogleMapReact
         bootstrapURLKeys={{
           key: 'AIzaSyDqUk3ftTjvc_A0pTkUcktz6157RIly514',
           language: 'en',
         }}
        center= {{lat: this.props.location.lat, lng: this.props.location.long }}
        defaultZoom={12}
      >
      </GoogleMapReact>
    </div>
    );
  }
}

export default Map;
