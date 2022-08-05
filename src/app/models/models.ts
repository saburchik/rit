export interface IPlanet {
  climate: string
  created: Date
  diameter: string
  edited: Date
  films: string[]
  gravity: string
  name: string
  orbital_period: string
  population: string
  residents: Array<string> | IPeople[]
  rotation_period: string
  surface_water: string
  terrain: string
  url: string
}

export interface APIResponse<T> {
  results: Array<T>
}

export interface IPeople {
  birth_year: string
  eye_color: string
  films: string[]
  gender: string
  hair_color: string
  height: string
  homeworld: string | IPlanet
  mass: string
  name: string
  skin_color: string
  created: Date
  edited: Date
  species: string[]
  starships: string[]
  url: string
  vehicles: string[]
}
