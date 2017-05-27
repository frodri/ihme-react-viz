import React from 'react'
import { feature, mesh } from 'topojson-client'

import * as geo from 'd3-geo'
import * as chromatic from 'd3-scale-chromatic'
import * as scale from 'd3-scale'
import * as arrays from 'd3-array'


import worldmap from '../data/topology/world-110m.json'
import { countriesByNumericCode } from '../data'



const x = scale.scaleLinear()
      .domain([0, 1])
      .rangeRound([350, 610]);

const color = scale.scaleThreshold()
  .domain(arrays.ticks(0, 1, 10))
  .range(arrays.ticks(0, 1, 10).map(chromatic.interpolateYlOrRd));

const thresholds = color.range().map(function(d){
    d = color.invertExtent(d);
    if (d[0] == null) d[0] = x.domain()[0];
    if (d[1] == null) d[1] = x.domain()[1];
    return d;       
});


const boundary = mesh(worldmap, worldmap.objects.countries, function(a, b) { return a !== b; });
const countries = feature(worldmap, worldmap.objects.countries).features
const projection = geo.geoMercator()
  .scale(152.5)
  .translate([480, 340])
  .precision(.1);
const path = geo.geoPath().projection(projection);


const defaultProps = {
  onPathClick: Function.prototype, 
  onPathMouseOut: Function.prototype, 
  onPathMouseOver: Function.prototype, 
  onPathMouseMove: Function.prototype
};

class Map extends React.PureComponent { 

  render() {
    const {
      onPathClick, 
      onPathMouseOut, 
      onPathMouseOver, 
      onPathMouseMove, 
      data } = this.props;
    return (
      <svg width="960" height="600" className="choropleth-svg">
        <g className="key" transform="translate(0,550)">
          {thresholds.map(function(d, i){
            return (<rect key={i} height="8" x={x(d[0])} width={x(d[1]) - x(d[0])} fill={color(d[0])}/>)
          })}
          <g className="tick" opacity="1" transform={"translate("+x(0)+",0)"}>
            <text fill="#000" y="16" dy="0.71em">0%</text>
          </g>
          <g className="tick" opacity="1" transform={"translate("+x(1)+",0)"}>
            <text fill="#000" y="16" dy="0.71em">100%</text>
          </g>
        </g>
        {countries.map((country, i) => {
            const alpha3 = countriesByNumericCode[country.id]['alpha-3'];
            return (<path 
                      key={i} 
                      className={"country"} 
                      d={path(country)} 
                      fill={color(data[alpha3]) ? color(data[alpha3]) : 'rgb(211,211,211)'}
                      onClick={(evt) => onPathClick(evt, alpha3)}
                      onMouseOver={(evt) => onPathMouseOver(evt, alpha3)}
                      onMouseOut={(evt) => onPathMouseOut(evt, alpha3)}
                      onMouseMove={(evt) => onPathMouseMove(evt)}
                      />);
        })}
        <path className="boundary" d={path(boundary)}/>
      </svg>
    );
  }
}

Map.defaultProps = defaultProps;


export default Map