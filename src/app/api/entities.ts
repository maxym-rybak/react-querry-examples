export interface User {
  name: string;
}

export interface Pokemon {
  name: string;
  id: number;
  base_experience: number;
  height: number;
  order: number;
  weight: number;
  sprites: {
    back_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}
