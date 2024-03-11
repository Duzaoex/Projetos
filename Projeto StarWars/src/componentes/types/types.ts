export type Planet = {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  residents?: string[];
  surface_water: number;
  population: number;
  films: string[];
  created: string;
  edited: string;
  url: string;
  [key: string]: string | number | string[] | undefined;
};
