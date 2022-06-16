import React, { useContext } from 'react';
import ProjectContext from '../contextAPI/ProjectContext';

function Search() {
  const {
    searchInput,
    handleInputChange,
    filters,
    setFilters,
    handleChange,
    setNumericFilter,
    numericFilter,
    columns,
    setColumns,
  } = useContext(ProjectContext);

  const { columnFilter, operator, filterValue } = filters;

  const handleNumericFilter = (e) => {
    e.preventDefault();
    const newFilter = { columnFilter, operator, filterValue };
    setNumericFilter([...numericFilter, newFilter]);
    const filteredColumns = (columns.filter((el) => el !== columnFilter));
    setColumns(filteredColumns);
    setFilters({
      columnFilter: filteredColumns[0],
      operator: 'maior que',
      filterValue: 0,
    });
  };

  return (
    <div>
      <form>
        <label htmlFor="searchInput">
          <input
            type="text"
            placeholder="Search"
            name="searchInput"
            value={ searchInput }
            id="searchInput"
            onChange={ handleInputChange }
            data-testid="name-filter"
          />
        </label>
        <label htmlFor="columnFilter">
          {' '}
          Filtrar por:
          {' '}
          <select
            onChange={ handleChange }
            name="columnFilter"
            value={ columnFilter }
            id="columnFilter"
            data-testid="column-filter"
          >
            {
              columns.map((e, i) => (
                <option key={ i } value={ e }>{ e }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="Operator">
          {' '}
          Operador:
          {' '}
          <select
            name="operator"
            id="Operator"
            value={ operator }
            onChange={ handleChange }
            data-testid="comparison-filter"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="fitlerValue">
          {' '}
          <input
            type="number"
            name="filterValue"
            value={ filterValue }
            id="filterValue"
            placeholder="0"
            onChange={ handleChange }
            data-testid="value-filter"
          />
        </label>
        {' '}
        <button
          type="submit"
          onClick={ handleNumericFilter }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}

export default Search;
