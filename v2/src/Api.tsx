import { Point } from './Interfaces'

const axios = require('axios').default

// docs: https://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf
const ttcApi = axios.create({
  baseURL: 'http://webservices.nextbus.com/service/publicJSONFeed?a=ttc',
  timeout: 1000,
  headers: {
    'Accept': 'application/json'
  }
})

/**
 * http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=ttc
 */
// export const getAllRoutes
export interface ApiRoute {
  title: string,
  tag: string,
}

/**
 * http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=<route tag>
 */
// export const getRouteConfig
export interface ApiStop {
  title: string,
  stopId: string,
  tag: string,
  lat: number,
  lon: number,

}

export interface ApiDirection {
  title: string,
  tag: string,
  name: string,
  branch: string,
  stop: [ApiStop],

}

export interface ApiPath {
  point: [Point]
}

export interface ApiRouteConfig {
  title: string,
  tag: string,
  stop: [ApiStop],
  direction: [ApiDirection],
  path: [ApiPath]
  color: string,
  oppositeColor: string,
  latMin: number,
  latMax: number,
  lonMin: number,
  lonMax: number,
}

export default ttcApi