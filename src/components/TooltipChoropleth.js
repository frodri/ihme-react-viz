
/* --------------------------------------------------------------
   TooltipChoropleth.js
   Container component that stores a Choropleth Map component,
   an HTML tootlip, and the tooltip's non-persistent state. 
   Since React rerenders all of its its components by default upon
   receiving state changes, we delegate the actual D3-related map 
   rendering to Map component limit its potentially expensive
   rerenders.
-------------------------------------------------------------- */

import React from 'react'
import { format } from 'd3-format'

import Map from './Map' 
import { countriesByAlpha3 } from '../data'

import './TooltipChoropleth.css'


class TooltipChoropleth extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      tooltipLocation: {x: 0, y: 0},
      tooltipText: null
    };
  }

  onPathMouseMove = (event) => {
    const paddingFromCursor = 5;
    const tooltipBounds = this.tooltipNode.getBoundingClientRect();
    const mapBounds = event.target.parentNode.getBoundingClientRect();
    const x = event.clientX - mapBounds.left - (tooltipBounds.width/2);
    const y = event.clientY - mapBounds.top - tooltipBounds.height - paddingFromCursor;
    this.setState({tooltipLocation: {x: x, y: y}})
    
  }

  onPathMouseOver = (evt, alpha3) => {
    const {data} = this.props;
    if(data[alpha3]) {
      const countryName = countriesByAlpha3[alpha3]['name'];
      const dataValue = format(".1%")(data[alpha3]);
      this.setState({tooltipText: countryName + " - " + dataValue});
    }    
  }

  onPathMouseOut = (evt, alpha3) => {
    this.setState({tooltipText: null});
  }


  render() {
    const { tooltipLocation, tooltipText } = this.state;

    const tooltipStyle = {
      'left': tooltipLocation.x,
      'top': tooltipLocation.y,
      'display': tooltipText ? 'block' : 'none'
    }

    const {onPathClick, data} = this.props;

    return (
      <div className="choropleth-container">
        <Map onPathClick={onPathClick} 
             onPathMouseOver={this.onPathMouseOver} 
             onPathMouseOut={this.onPathMouseOut}
             onPathMouseMove={this.onPathMouseMove}
             data={data} />
        <div className="choropleth-tooltip" 
             ref={(tooltip) => { this.tooltipNode = tooltip; }} 
             style={tooltipStyle}>
             {tooltipText}
        </div>
      </div>
    );
  }
}


export default TooltipChoropleth