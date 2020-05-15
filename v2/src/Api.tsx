import axios, { AxiosInstance } from 'axios';

export enum Command {
  ROUTE_LIST = 'routeList',
  ROUTE_CONFIG = 'routeConfig',
  PREDICTION = 'prediction',
  SCHEDULE = 'schedule',
  VEHICLE_LOCATIONS = 'vehicleLocations',
  VEHICLE_LOCATION = 'vehicleLocation',
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

export interface ApiVehicle {
  dirTag: string,
  heading: number, // degrees
  id: string,
  lat: number,
  lon: number,
  predictable: boolean,
  routeTag: string,
  secsSinceReport: number,
  speedKmHr: number,
}

/**
 * docs: https://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf
 */
export default class NextBusApiClient {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'http://webservices.nextbus.com/service/publicJSONFeed?a=ttc',
      timeout: 5000,
      responseType: 'json',
      headers: {
        'Accept': 'application/json'
      }
    })
  }

  async getAllRoutes(): Promise<[ApiRoute]> {
    const { data } = await this.client.get('', {
      params: {
        command: Command.ROUTE_LIST
      },
      transformResponse: [(data: any) => data.route]
    })
    return data
  }

  /**
   * Get route data specified in ApiRouteConfig
   * @param routeTag use getAllRoutes() to find tag 
   */ 
  async getRouteConfig(routeTag: string): Promise<ApiRouteConfig> {
    const { data } = await this.client.get('', {
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

  /**
   * @param routeTag use getAllRoutes() to find tag
   * @param lastCheckTime timestamp in ms, default of 0 is 15 minutes ago 
   */
  async getVehicleLocations(routeTag: string, lastCheckTime: number = 0): Promise<[ApiVehicle]> {
    const { data } = await this.client.get('', {
      params: {
        command: Command.VEHICLE_LOCATIONS,
        r: routeTag,
        t: lastCheckTime,
      },
      transformResponse: [(data: any) => data.vehicle]
    })
    return data
  }
}