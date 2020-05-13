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

