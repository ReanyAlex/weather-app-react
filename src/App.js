import React, {Component} from 'react';
import Search from './Search';
import Weather from './Weather';
import conditionImage from './weatherJson'
import Map from './Map'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      location:{
                  city:"City",
                  region: "State",
                  lat: 0,
                  long: 0
                },
      current: {
                  currentTemp: Number,
                  condition: {},
                  high: Number,
                  low: Number,
                  humidity: Number,
                  precip: Number,
                  time: Number,
                },
      forecast: [],
      hourly: []
    }
  }

  componentWillMount(){
    this.geolocation()
  }

  componentDidMount(){
    let that = this
    document.getElementById("locationSearch").onclick = function() {
      // that.setState({location:{},current:{}, forecast:[]})
      const apiKey = "ba0e2262d3854085a9542224170208"
      let location = document.getElementById("location").value
      let locWeatherUrl = `https://api.apixu.com/v1/current.json?key=${apiKey}&q=` + location
      let weatherForecastUrl = `https://api.apixu.com/v1/forecast.json?key=${apiKey}&q=` + location + `&days=9`

      let forecastDiv = document.querySelector(".forecastDiv")
      forecastDiv.innerHTML = '<div class="row forecastDiv"></div>'
      that.weatherFetch(locWeatherUrl, apiKey, weatherForecastUrl)
    }
  }

  getTime() {
    var today = new Date();
    var day = today.getDay();
    var daylist = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday ",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let hours = today.getHours()
    let minutes = today.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var suffix = "AM";
    if (hours >= 12) {
      suffix = "PM";
      hours = hours - 12;
    }
    if (hours === 0) {
      hours = 12;
    }
    return `${daylist[day]} ${hours}:${minutes} ${suffix}`;
  }

  geolocation(){
    let that = this
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          const apiKey = "ba0e2262d3854085a9542224170208"
          let location = position.coords.latitude + "," + position.coords.longitude
          let locWeatherUrl = `https://api.apixu.com/v1/current.json?key=${apiKey}&q=${location}`

          // url for local weather based on response of your geolocation needs location code
          let weatherForecastUrl = `https://api.apixu.com/v1/forecast.json?key=${apiKey}&q=${location}&days=9`
          that.weatherFetch(locWeatherUrl, apiKey, weatherForecastUrl)


      }, function(err){console.log(err)}, {timeout: 10000})
    }
  }

  weatherFetch(locWeatherUrl, apiKey, weatherForecastUrl) {
    var local = fetch(locWeatherUrl)
    .then((res) => res.json())
    .then(function(json) {
      return json
    })

    var forecast = fetch(weatherForecastUrl)
    .then((res) => res.json())
    .then(function(json) {
      return json
    })

  Promise.all([local, forecast])
    .then(values => {
      // console.log(values);
      const location   = {
                          city: values[0].location.name,
                          region: values[0].location.region,
                          lat:values[0].location.lat,
                          long:values[0].location.lon
                        }

      const current    = {
                          currentTemp: values[0].current.temp_f,
                          condition: values[0].current.condition,
                          high: values[1].forecast.forecastday[0].day.maxtemp_f,
                          low: values[1].forecast.forecastday[0].day.mintemp_f,
                          humidity: values[0].current.humidity,
                          precip: values[0].current.precip_in,
                          time: this.getTime(),
                        }

      // this.setState({forecast:[]})
      for (let i = 2; i < 9; i++) {
        var utcSeconds = values[1].forecast.forecastday[i].date_epoch;
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds)
        let forecastDate = d.toString().split(" ")[0] + " " + d.toString().split(" ")[1] + " " + d.toString().split(" ")[2]

        this.state.forecast.push({
                        date: forecastDate,
                        high: values[1].forecast.forecastday[i].day.maxtemp_f,
                        low: values[1].forecast.forecastday[i].day.mintemp_f,
                        condition: values[1].forecast.forecastday[i].day.condition,
                        precip: values[1].forecast.forecastday[i].day.totalprecip_in
                      })

      }

      this.setState({hourly:[]})
      for (let j = 0; j <= 23; j++) {
        let hourlyTemp = values[1].forecast.forecastday[0].hour[j].temp_f
        this.state.hourly.push(hourlyTemp)
      }

      this.setState({ location,
                      current,
                      forecast: this.state.forecast,
                      hourly: this.state.hourly
                    })

      this.backgroundImage(values[0].current.condition.code)
  });
}

backgroundImage(code){
  document.body.style.backgroundImage = "url(" + conditionImage[code].photo + ")"
}

  render() {
    return (

      <div>
        <div>
          <Search location={this.state.location} />
          <div className="wrapper content-box">
            <Weather current={this.state.current}
                     forecast={this.state.forecast}
                     hourly={this.state.hourly}/>
            <Map location={this.state.location}/>
          </div>
        </div>
      </div>

    )
  }
}




export default App;
