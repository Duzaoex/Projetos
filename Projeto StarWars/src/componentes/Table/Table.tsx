import React, { useEffect, useState } from 'react';
import { fetchPlanetsData, useFilter } from '../Context/FIlterContext';
import './Table.css';

function Table() {
  const [planetsData, setPlanetsData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const { filterPlanets, filterText, updateFilterText } = useFilter();
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [allColumns, setAllColumns] = useState<string[]>([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [sorting, setSorting] = useState({ column: 'population', sort: 'ASC' });

  useEffect(() => {
    setSelectedColumns([]);
    fetchPlanetsData()
      .then((data) => {
        setPlanetsData(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API de Star Wars:', error);
      });
  }, []);

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedColumn(selected);
    setAllColumns((prevColumns) => prevColumns.filter((column) => column !== selected));
  };

  const handleComparisonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComparison(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const handleFilter = () => {
    const filterNumber = parseFloat(filterValue);

    const filtered = planetsData.filter((planet) => {
      const planetValue = parseFloat(planet[selectedColumn]);

      if (selectedComparison === 'maior que') {
        return planetValue > filterNumber;
      } if (selectedComparison === 'menor que') {
        return planetValue < filterNumber;
      } if (selectedComparison === 'igual a') {
        return planetValue === filterNumber;
      }

      return true;
    });

    setAllColumns((prevColumns) => prevColumns
      .filter((column) => column !== selectedColumn));

    setPlanetsData(filtered);
  };

  const filteredPlanets = filterPlanets(planetsData);

  if (filteredPlanets.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  const headers = Object.keys(filteredPlanets[0]).filter((key) => key !== 'residents');

  const sortByColumn = (data, column, sortDirection) => {
    return data.sort((a, b) => {
      const valueA = parseFloat(a[column]);
      const valueB = parseFloat(b[column]);

      if (sortDirection === 'ASC') {
        return valueA - valueB;
      }
      return valueB - valueA;
    });
  };

  const handleSort = () => {
    const sortedData = [...planetsData];
    if (sortedData.length === 0) {
      return;
    }
    sortByColumn(sortedData, sorting.column, sorting.sort);
    sortedData.sort((a, b) => {
      if (a[sorting.column] === 'unknown') return 1;
      if (b[sorting.column] === 'unknown') return -1;
      return 0;
    });
    setPlanetsData(sortedData);
  };

  return (
    <div className="filter" data-testid="filter">
      <div data-testid="table-component">
        <header className="header">
          <img src="https://mcdn.wallpapersafari.com/medium/12/3/ITmMEW.jpg" alt="Minha Imagem" />
        </header>
        <div className="filter">
          <label htmlFor="name-filter">Filtrar por nome:</label>
          <input
            type="text"
            id="name-filter"
            data-testid="name-filter"
            value={ filterText }
            onChange={ (e) => updateFilterText(e.target.value) }
          />
        </div>
        <div className="filter">
          <select
            data-testid="column-filter"
            value={ selectedColumn }
            onChange={ handleColumnChange }
          >
            {allColumns.map((column) => (
              <option key={ column } value={ column }>
                {column}
              </option>
            ))}
          </select>
          <select
            data-testid="comparison-filter"
            value={ selectedComparison }
            onChange={ handleComparisonChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>

          <input
            type="number"
            value={ filterValue }
            onChange={ handleValueChange }
            data-testid="value-filter"
          />

          <button
            onClick={ handleFilter }
            data-testid="button-filter"
          >
            Filtrar
          </button>
        </div>
        <label htmlFor="column-sort">Ordenar por:</label>
        <select
          id="column-sort"
          data-testid="column-sort"
          value={ sorting.column }
          onChange={ (e) => setSorting({ ...sorting, column: e.target.value }) }
        >
          <option value="population">População</option>
          <option value="orbital_period">Período Orbital</option>
          <option value="diameter">Diâmetro</option>
          <option value="rotation_period">Período de Rotação</option>
          <option value="surface_water">Água na Superfície</option>
        </select>

        <div className="sorting-options">
          <label>
            Ascendente
            <input
              type="radio"
              data-testid="column-sort-input-asc"
              value="ASC"
              checked={ sorting.sort === 'ASC' }
              onChange={ () => setSorting({ ...sorting, sort: 'ASC' }) }
            />
          </label>
          <label>
            Descendente
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              value="DESC"
              checked={ sorting.sort === 'DESC' }
              onChange={ () => setSorting({ ...sorting, sort: 'DESC' }) }
            />
          </label>
        </div>

        <button
          data-testid="column-sort-button"
          onClick={ handleSort }
        >
          Ordenar
        </button>
        <table>
          <thead>
            <tr>
              { headers.map((header) => (
                <th key={ header }>{ header }</th>
              )) }
            </tr>
          </thead>
          <tbody>
            {filteredPlanets.map((planet, index) => (
              <tr
                key={ index }
              >
                {headers.map((header) => (
                  <td
                    key={ header }
                    data-testid={ header === 'name' ? 'planet-name' : undefined }
                  >
                    {planet[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Table;
