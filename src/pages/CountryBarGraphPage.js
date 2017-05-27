import React from 'react'
import { connect } from 'react-redux'
import { refreshCountryData, fetchCsvIfNeeded } from '../actions'
import { Link } from 'react-router-dom'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  Hint
} from 'react-vis'


import isEmpty from 'lodash/isEmpty'
import { format } from 'd3-format'

import {ageGroups, countriesByAlpha3} from '../data'
import "./CountryBarGraphPage.css"


class CountryBarGraphPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }  

  componentDidMount() {
    const { dispatch, match } = this.props

    dispatch(fetchCsvIfNeeded());
    dispatch(refreshCountryData(match.params.countryId));
  }

  componentWillReceiveProps(nextProps) { 
    if (nextProps.csv.data !== this.props.csv.data) {
      const { dispatch, countryData } = nextProps
      dispatch(refreshCountryData(countryData.countryId))
    }
  }

  rememberValue = (value) => {
    this.setState({value});
  }

  forgetValue = () => {
    this.setState({
      value: null
    });
  }

  formatValue(value) {
    return {title: value.x, value: 'ashbhsdabhsdb'};
  }


  render() {
    const {countryData} = this.props;
    const {value} = this.state;

    const margins = {left: 50, right: 10, top: 10, bottom: 120} 

    const bargraphData =  !isEmpty(countryData.data) ? 
      ageGroups.map(function(x) {
        return {x: x.label, y: countryData.data[x.id]};
      }) : null;


    return (
      <div className="bargraph-page transitionable">
        <h1>Overweight (BMI>25) Prevalence By Age, 2013</h1>
        {countryData.countryId &&
          <h2>{countriesByAlpha3[countryData.countryId].name}</h2>
        }
        <div className="options">
          <Link className="bargraph-link" to="/choropleth">Back to the map</Link>
        </div>
        <div className="bargraph-container">
          {bargraphData &&
             <XYPlot
                xType="ordinal"
                width={960}
                height={600}
                margin={margins}>
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis tickLabelAngle={-35} />
                  <YAxis 
                    tickFormat={v => (format('.0%')(v))} />
                  <VerticalBarSeries 
                    data={bargraphData}
                    onValueMouseOver={this.rememberValue}
                    onValueMouseOut={this.forgetValue}/>
                  {value ?
                    <Hint value={value}>
                      <div className="bargraph-tooltip">
                        {value.x} : {format('.1%')(value.y)}
                      </div>
                    </Hint> :
                    null
                  }
            </XYPlot>
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  const { csv, countryData } = state
  return { csv, countryData }
}

export default connect(mapStateToProps)(CountryBarGraphPage)