const axios = require('axios').default

// docs: https://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf
const ttcApi = axios.create({
  baseURL: 'http://webservices.nextbus.com/service/publicJSONFeed?a=ttc',
  timeout: 5000,
  responseType: 'json',
  headers: {
    'Accept': 'application/json'
  }
})

export async function getAllRoutes(): Promise<[ApiRoute]> {
  const { data } = await ttcApi.get('', {
    params: {
      command: Command.ROUTE_LIST
    },
    transformResponse: [(data: any) => data.route]
  })
  return data
}

export async function getRouteConfig(routeTag: string): Promise<ApiRouteConfig> {
  const { data } = await ttcApi.get('', {
    params: {
      command: Command.ROUTE_CONFIG,
      r: routeTag
    },
    transformResponse: [function (data: any) {
      const { route } = data;
      route.path = route.path.map((path: any) =>
        path.point.map((point: any) =>
          [point.lon, point.lat]))

      return route
    }],
  })
  return data
}

export enum Command {
  ROUTE_LIST = 'routeList',
  ROUTE_CONFIG = 'routeConfig',
  PREDICTION = 'prediction',
}

export interface ApiRoute {
  title: string,
  tag: string,
}

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
  /* [[lon, lat]] */
  point: [[number, number]] 
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