import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Planet } from '../types/types';

export const fetchPlanetsData = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    if (!response.ok) {
      throw new Error('Erro na requisição à API de Star Wars');
    }
    const data = await response.json();
    const { results: planets } = data;
    const planetsWithoutResidents = planets.map((planet: Planet) => {
      const { residents, ...restOfPlanetData } = planet;
      return restOfPlanetData;
    });
    return planetsWithoutResidents;
  } catch (error) {
    console.error('Erro ao buscar dados da API de Star Wars:', error);
    throw error;
  }
};

type FilterContextType = {
  filterText: string;
  updateFilterText: (text: string) => void;
  filterPlanets: (planets: Planet[]) => Planet[];
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filterText, setFilterText] = useState('');

  const updateFilterText = (text: string) => {
    setFilterText(text);
  };

  const filterPlanets = (planets: Planet[]) => {
    return planets.filter((planet) => planet.name.toLowerCase()
      .includes(filterText.toLowerCase()));
  };

  return (
    <FilterContext.Provider value={ { filterText, updateFilterText, filterPlanets } }>
      { children }
    </FilterContext.Provider>
  );
}
