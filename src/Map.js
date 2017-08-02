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
    return (
      <div className="map col-4-md col-0-sm"
            style={{ height: '400px'}}>

       <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDqUk3ftTjvc_A0pTkUcktz6157RIly514',
            language: 'en'}}
          center= {{lat: this.props.location.lat, lng: this.props.location.long }}
          defaultZoom={12}
      />
      </div>
    );
  }
}

export default Map;
