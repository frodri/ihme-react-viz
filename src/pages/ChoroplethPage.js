
/* --------------------------------------------------------------
   ChoroplethPage.js
   Serves as the root of all Choropleth related components.
   Handles map state, redirects and Ajax requests using 
   the Redux dispatch.
-------------------------------------------------------------- */

import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import find from 'lodash/find'

import { fetchCsvIfNeeded, refreshAgeGroupData } from '../actions'
import { ageGroups } from '../data'

import './ChoroplethPage.css'

import TooltipChoropleth from '../components/TooltipChoropleth'



class ChoroplethPage extends React.Component {

  componentDidMount() {
    const { dispatch , ageGroupData } = this.props;
    dispatch(fetchCsvIfNeeded());
    dispatch(refreshAgeGroupData(ageGroupData.ageGroupId));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.csv.data !== this.props.csv.data) {
      const { dispatch , ageGroupData } = this.props;
      dispatch(refreshAgeGroupData(ageGroupData.ageGroupId));
    }
  }

  handleAgeGroupChange = (evt) => {
    const { dispatch } = this.props;
    const nextAgeGroupId = ageGroups[evt.target.value].id;
    dispatch(refreshAgeGroupData(nextAgeGroupId));
  }

  handlePathClick = (evt, alpha3) => {
    const { dispatch, ageGroupData } = this.props;
    if (ageGroupData.data[alpha3]) {
      dispatch(push('/country/'+alpha3));
    }
  }

  render() {
    const { ageGroupData } = this.props;
    
    const currentAgeGroup = find(
      ageGroups, 
      ['id', ageGroupData.ageGroupId]
    );

    return (
      <div className="choropleth-page transitionable">
        <h1>Overweight (BMI>25) Prevalence, 2013</h1>
        <h2>{currentAgeGroup.label}</h2>
        <div className="options">
          <select value="" onChange={this.handleAgeGroupChange}>
            <option disabled value=""> -- select an age range -- </option>
            {ageGroups.map(function(ageGroup, i){
              return (<option key={i} value={i}>{ageGroup.label}</option>)
            })} 
          </select>
        </div>
        <TooltipChoropleth onPathClick={this.handlePathClick} data={ageGroupData.data}/>

      </div>
    );
  }
}

const mapStateToProps = state => {
  const { csv, ageGroupData } = state
  return { csv, ageGroupData }
}

export default connect(mapStateToProps)(ChoroplethPage)