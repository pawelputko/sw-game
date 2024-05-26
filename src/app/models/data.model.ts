export interface SWResponse {
  message: string;
  next: string;
  previous: string;
  results: SWPeopleResults[] | SWStarshipsResults[];
  total_pages: number;
  total_records: number;
}

export interface SWResults {
  name: string;
  uid: number;
  url: string;
  result: {
    description: string;
  };
}

export interface SWPeopleResults extends SWResults {
  result: {
    description: string;
    properties: PeopleProperties;
  };
}

export interface SWStarshipsResults extends SWResults {
  result: {
    description: string;
    properties: StarshipsProperties;
  };
}

export interface PeopleProperties {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  url: string;
  imageUrl?: string;
}

export interface StarshipsProperties {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  starship_class: string;
  url: string;
  imageUrl?: string;
}

export type CardType = 'People' | 'Starships'
