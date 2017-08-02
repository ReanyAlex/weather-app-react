import React from 'react';


const Current = (props) => {
  let current = props.current
  return (
    <div>
      <div className="row">
        <div className="current col-2-md">
          <span className="current-condition">
            <img className="current-condition-icon" src={current.condition.icon} alt='' />
            <p className="current-condition-text">{current.condition.text}</p>
          </span>
        </div>
          <div className="col-4-md current__temp-box">
            <span className="current__temp-text">{current.currentTemp}</span>
          </div>
          <div className="col-6-md current__temp-box">
            <span className="current__time-text">{current.time}</span>
          </div>
      </div>
      <div className="row row-padding-b">
        <div className="col-6-md">
          <h3 className="current__temp-head">Today</h3>
          <span className="current__temp-high-title">High:</span>
          <span className="current__temp-value-high">{current.high}</span>
          <span className="divide">|</span>
          <span className="current__temp-low-title">Low:</span>
          <span className="current__temp-value-low">{current.low}</span>
        </div>
        <div className="col-6-md">
          <div className="">
          </div>
          <div className="">
            <div className="current__percip-head">
              Humidty:
            </div>
            <span className="current-humidity">{current.humidity}</span>
          </div>
          <div className="">
            <div className="current__percip-head">
              Total Precip:
            </div>
            <span className="current-percip">{current.precip}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

  export default Current;
