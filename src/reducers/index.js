import {
  REQUEST_CSV, RECEIVE_CSV, POPULATE_COUNTRY_DATA, POPULATE_AGE_GROUP_DATA
} from '../actions'



export const csv = (state = {
  isFetching: false,
  isInvalidated: false,
  data: []
 }, action) => {
  switch (action.type) {
    case REQUEST_CSV:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_CSV:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}


export const countryData = (state = {
  countryId: null,
  data: {}
 }, action) => {
  switch (action.type) {
    case POPULATE_COUNTRY_DATA:
      return {
        ...state,
        countryId: action.countryId,
        data: action.data
      }
    default:
      return state
  }
}

export const ageGroupData = (state = {
  ageGroupId: 9,
  data: {}
 }, action) => {
  switch (action.type) {
    case POPULATE_AGE_GROUP_DATA:
      return {
        ...state,
        ageGroupId: action.ageGroupId,
        data: action.data
      }
    default:
      return state
  }
}
