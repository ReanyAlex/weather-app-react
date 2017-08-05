import React, {Component} from 'react';
import * as d3 from "d3";
import './App.css'

class Chart extends Component {

  createLineChart(){
    let temp = this.props.hourly
    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    var margin = {top: 50, right: 50, bottom: 50, left: 50}
      , width = document.getElementById("forecast").offsetWidth - margin.left - margin.right
      , height = 400 - margin.top - margin.bottom;

    var n = temp.length;

    var xScale = d3.scaleLinear()
        .domain([0, 23])
        .range([0, width]);


    var yScale = d3.scaleLinear()
        .domain([d3.min(temp)-5, d3.max(temp)+5])
        .range([height, 0]);

    var line = d3.line()
        .x(function(d, i) { return xScale(i); })
        .y(function(d, i) { return yScale(d.y); })
        .curve(d3.curveCardinal)


    var dataset = d3.range(n).map(function(d,i) { return {"y": temp[i]} })

    var svg = d3.select(".d3--line").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).ticks(12).tickFormat(function(d) {
          if (d >= 13) {
            return d-12+" PM"
          }
          return d+" AM"
          })
        )
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)"
                });

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale).ticks(8).tickFormat(function(d) {
          return d+"°F"
          })
        )

    svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line)


    svg.selectAll(".dot")
        .data(dataset)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d, i) { return xScale(i) })
        .attr("cy", function(d) { return yScale(d.y) })
        .attr("r", 4)
        .on("mouseover", function(d) {console.log(d);
       div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html(`${d.y} °F`)
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });

  }
    componentDidMount() {
      document.getElementById('d3').innerHTML=""
        this.createLineChart()
    }


   componentDidUpdate() {
     document.getElementById('d3').innerHTML=""
      this.createLineChart()
   }


  render(){
    return (
        <div id="d3" className="d3 d3--line"></div>
    )
  }

}

export default Chart
