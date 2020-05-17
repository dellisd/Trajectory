export interface TransitIconImages {
  [gotrain: string]: string,
  viarail: string,
  streetcar: string,
  subway: string,
  bus: string
}

export interface ActiveTransit {
  [gotrain: string]: boolean,
  viarail: boolean,
  streetcar: boolean,
  subway: boolean,
  bus: boolean
}

export interface CarouselVehicle {
  type: 'gotrain' | 'viarail' | 'streetcar' | 'subway' | 'bus',
  route: number,
  direction: 'Northbound' | 'Southbound' | 'Westbound' | 'Eastbound',
  terminal: string,
  delay: number,
  nextStation: string
}

export interface CarouselCardProps extends CarouselVehicle {
  icon: string,
  dividerAnimation: string,
  followVehicle: Function,
  minimized: boolean,
}
