import React, { useEffect, useContext } from 'react';
import ProjectContext from '../contextAPI/ProjectContext';
import Search from './Search';

function Table() {
  const {
    filterData,
    setFilterData,
    getData,
    searchInput,
    data,
    numericFilter,
    deleteFilter,
    removeFilters,
  } = useContext(ProjectContext);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filterName = data.filter((planet) => (
      planet.name.toLowerCase().includes(searchInput)
    ));

    const filterResult = numericFilter.reduce((acc, filter) => acc.filter((e) => {
      switch (filter.operator) {
      case 'maior que':
        return e[filter.columnFilter] > Number(filter.filterValue); // teste não passa sem a conversão Number() //
      case 'menor que':
        return e[filter.columnFilter] < Number(filter.filterValue); // teste não passa sem a conversão Number() //
      case 'igual a':
        return e[filter.columnFilter] === filter.filterValue; // teste não passa com a conversão Number() //
      default:
        return '';
      }
    }), filterName);

    setFilterData(filterResult);
  }, [searchInput, numericFilter]);

  return (
    <div>
      <Search />
      <p>
        { numericFilter.map((e, i) => (
          <p key={ i } data-testid="filter">
            {`${e.columnFilter} ${e.operator} ${e.filterValue}`}
            {' '}
            <button
              type="button"
              onClick={ () => deleteFilter(e) }
            >
              x
            </button>
          </p>
        ))}
        <button
          type="button"
          onClick={ removeFilters }
          data-testid="button-remove-filters"
        >
          Remover filtros
        </button>
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
