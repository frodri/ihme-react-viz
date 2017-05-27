

import * as fetch from 'd3-fetch'

import csvData from '../data/csv/imhedata.csv'


export const REQUEST_CSV = 'REQUEST_CSV'
export const RECEIVE_CSV = 'RECEIVE_CSV'
export const POPULATE_COUNTRY_DATA = 'POPULATE_COUNTRY_DATA'
export const POPULATE_AGE_GROUP_DATA = 'POPULATE_AGE_GROUP_DATA'

export const requestCsv = () => ({
  type: REQUEST_CSV
})

export const receiveCsv = (csv) => ({
  type: RECEIVE_CSV,
  data: csv,
})

export const populateCountryData = (countryId, data) => ({
  type: POPULATE_COUNTRY_DATA,
  countryId: countryId,
  data: data
})

export const populateAgeGroupData = (ageGroupId, data) => ({
  type: POPULATE_AGE_GROUP_DATA,
  ageGroupId: ageGroupId,
  data: data
})



export const refreshCountryData = (countryId) => (dispatch, getState) => {
  const { csv } = getState();

   const parsedData = csv.data.length !== 0 ? csv.data.reduce(function (acc, cur) { 
    if (cur.location === countryId) {
      acc[cur.age_group_id] = cur.mean;
    }
    return acc;
  }, {}) : {};

  return dispatch(populateCountryData(countryId, parsedData));
}

export const refreshAgeGroupData = (ageGroupId) => (dispatch, getState) => {
  const { csv } = getState();
  

   const parsedData = csv.data.length !== 0 ? csv.data.reduce(function (acc, cur) { 
    if (cur.age_group_id === ageGroupId.toString()) {
      acc[cur.location] = cur.mean;
    }
    return acc;
  }, {}) : {};
  

  return dispatch(populateAgeGroupData(ageGroupId, parsedData));
}


const shouldFetchCsv = (state) => {
  if (state.csv.data.length === 0) {
    return true;
  }
  if (state.csv.isFetching) {
    return false;
  }
  return state.csv.isInvalidated;
}


const fetchCsv = () => dispatch => {
  dispatch(requestCsv())
  return fetch.csv(csvData)
    .then(csv => dispatch(receiveCsv(csv)))
}

export const fetchCsvIfNeeded = () => (dispatch, getState) => {;
  if (shouldFetchCsv(getState())) {
    return dispatch(fetchCsv());
  } 
}
