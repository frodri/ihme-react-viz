
import isoData from '../data/json/iso3166.json'

export const ageGroups = [
  {id:34, label:"Ages 2 to 4"},
  {id:6	, label:"Ages 5 to 9"},
  {id:7	, label:"Ages 10 to 14"},
  {id:8	, label:"Ages 15 to 19"},
  {id:9	, label:"Ages 20 to 24"},
  {id:10, label:"Ages 25 to 29"},
  {id:11, label:"Ages 30 to 34"},
  {id:12, label:"Ages 35 to 39"},
  {id:13, label:"Ages 40 to 44"},
  {id:14, label:"Ages 45 to 49"},
  {id:15, label:"Ages 50 to 54"},
  {id:16, label:"Ages 55 to 59"},
  {id:17, label:"Ages 60 to 64"},
  {id:18, label:"Ages 65 to 69"},
  {id:19, label:"Ages 70 to 74"},
  {id:20, label:"Ages 75 to 79"},
  {id:21, label:"Ages 80+"}
];

export const countriesByAlpha3 = isoData.reduce(function ( acc, cur ) {
    acc[ cur['alpha-3'] ] = {'country-code': cur['country-code'], 'name': cur.name };
    return acc;
}, {});

export const countriesByNumericCode = isoData.reduce(function ( acc, cur ) {
    acc[ cur['country-code'] ] = {'alpha-3': cur['alpha-3'], 'name': cur.name };
    return acc;
}, {});