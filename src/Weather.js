import React, {Component} from 'react';
import Current from './Current';
import Forecast from './Forecast'
import Chart from './Chart'

class Weather extends Component {
  constructor(props){
    super(props)

    this.state ={
                  showForecast: false,
                  showChart: false
                }
  }

  createForecastComponet(forecast, key){
    return(
      <Forecast key={key}
                forecast={forecast}/>
    )
  }

  componentDidMount(){


  }


  render() {

    return (
      <div className="col-8-md col-12-sm">
        <Current current={this.props.current}/>


          <div id="forecast" className="row forecastDiv">
            {this.props.forecast.map((forecast, key) => this.createForecastComponet(forecast,key))}
          </div>

          <div id="forecast" className="row forecastDiv" onClick={() => this.setState({showChart:!this.state.showChart})}>
            {this.state.showChart ? <div><Chart hourly={this.props.hourly} /></div>
                                  : <div className="forecast">Click To View Hourly Temperature Chart</div>}

          </div>

      </div>
    )
  }
}

export default Weather;
