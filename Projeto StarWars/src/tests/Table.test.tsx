import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FilterProvider } from '../componentes/Context/FIlterContext';
import Table from '../componentes/Table/Table';

test('renders Table component', async () => {
  const { getByTestId } = render(
    <FilterProvider>
      <Table />
    </FilterProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const tableComponent = getByTestId('table-component');
  expect(tableComponent).toBeInTheDocument();
});

test('another test that waits for 5 seconds', async () => {
  const { getByTestId } = render(
    <FilterProvider>
      <Table />
    </FilterProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const someOtherElement = getByTestId('filter');
  expect(someOtherElement).toBeInTheDocument();
});

test('handleComparisonChange updates selectedComparison correctly', async () => {
  const { getByTestId } = render(
    <FilterProvider>
      <Table />
    </FilterProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const comparisonFilter = getByTestId('comparison-filter') as HTMLInputElement;

  fireEvent.change(comparisonFilter, { target: { value: 'menor que' } });

  expect(comparisonFilter.value).toBe('menor que');
});

test('filter by name', async () => {
  const { getByTestId } = render(
    <FilterProvider>
      <Table />
    </FilterProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const nameFilter = getByTestId('name-filter');
  
  fireEvent.change(nameFilter, { target: { value: 'Nome do Planeta' } });

  const planetNameCells = getByTestId('planet-name');
  planetNameCells.forEach((cell) => {
    expect(cell.textContent).toContain('Nome do Planeta');
  });
});

test('sort by column', async () => {
  const { getByTestId } = render(
    <FilterProvider>
      <Table />
    </FilterProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const columnSort = getByTestId('column-sort');
  
  fireEvent.change(columnSort, { target: { value: 'population' } });

  const populationCells = getAllByTestId('population');
  const populationValues = populationCells.map((cell) => parseInt(cell.textContent));
  
  expect(populationValues).toEqual([...populationValues].sort((a, b) => a - b));
});

test('renders Table component and checks for data-testid elements', async () => {
  const { getByTestId, queryAllByTestId } = render(
    <FilterProvider>
      <Table />
    </FilterProvider>
  );

  await waitFor(() => {
    const tableComponent = getByTestId('table-component');
    expect(tableComponent).toBeInTheDocument();

    const nameFilter = getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();

    const columnFilter = getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();

    const comparisonFilter = getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();

    const valueFilter = getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();

    const buttonFilter = getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();

    const columnSort = getByTestId('column-sort');
    expect(columnSort).toBeInTheDocument();

    const columnSortInputAsc = getByTestId('column-sort-input-asc');
    expect(columnSortInputAsc).toBeInTheDocument();

    const columnSortInputDesc = getByTestId('column-sort-input-desc');
    expect(columnSortInputDesc).toBeInTheDocument();

    const columnSortButton = getByTestId('column-sort-button');
    expect(columnSortButton).toBeInTheDocument();

    // Assuming headers is an array of column names
    headers.forEach((header) => {
      const planetName = queryAllByTestId('planet-name');
      if (header === 'name') {
        // Check if planet name cells are present for the 'name' column
        expect(planetName).toHaveLength(filteredPlanets.length);
      } else {
        // Check if other column cells are present
        const columnHeader = queryAllByTestId(header);
        expect(columnHeader).toHaveLength(filteredPlanets.length);
      }
    });
  });
});