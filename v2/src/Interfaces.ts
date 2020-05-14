export interface TransitIconImages {
  [gotrain: string]: string,
  via: string,
  streetcar: string,
  subway: string,
  bus: string
}

export interface ActiveTransit {
  [gotrain: string]: boolean,
  via: boolean,
  streetcar: boolean,
  subway: boolean,
  bus: boolean
}

export interface CarouselVehicle {
  type: 'gotrain' | 'via' | 'streetcar' | 'subway' | 'bus',
  route: number,
  direction: 'Northbound' | 'Southbound' | 'Westbound' | 'Eastbound',
  terminal: string,
  delay: number
}

export interface Point {
  lon: number,
  lat: number
}
