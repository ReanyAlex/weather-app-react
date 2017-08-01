import React, {Component} from 'react';
import Current from './Current';
import Forecast from './Forecast'


class Weather extends Component {
  constructor(props){
    super(props)

    this.state ={show: true}
  }

  createForecastComponet(forecast, key){
    return(
      <Forecast key={key}
                forecast={forecast}/>
    )
  }

  render() {
    return (


      <div className="col-8-md col-12-sm">
        <Current current={this.props.current}/>
        <div className="row forecastDiv" onClick={() => this.setState({show: !this.state.show})}>
          {this.state.show ? this.props.forecast.map((forecast, key) => this.createForecastComponet(forecast,key))
          : <div className="forecast"> Click for 7 Day Forecast</div>}
        </div>
      </div>


    )
  }
}

export default Weather;
