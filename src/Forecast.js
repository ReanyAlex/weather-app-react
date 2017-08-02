import React from 'react';

const Forecast = (props) => {

  const forecast = props.forecast
  
  return (
    <div key={this.key}>
      <div className="forecast col-forecast7-md col-3-sm" >
      <div>
        <span className="forecast-date">  {forecast.date}  </span>
      </div>
      <div className="forecast-hl">
        <span className="forecast-h">  {forecast.high} </span>
        <span> | </span>
        <span className="forecast-l"> {forecast.low} </span>
      </div>
      <div>
        <img className="forecast-icon" src={forecast.condition.icon} alt='forecast icon'  />
      </div>
      <div>
        <span className="forecast-conditions"> </span>
      </div>
      <div>
        <span className="forecast-pop">☂ {forecast.precip} in.</span>
      </div>
      </div>
    </div>
  )
}

export default Forecast;
