export interface User {
  name: string;
}

export interface Pokemon {
  name: string;
  base_experience: number;
  height: number;
  order: number;
  weight: number;
  sprites: {
    default: string;
  };
}
