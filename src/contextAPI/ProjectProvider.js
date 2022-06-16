import React, { useState } from 'react';
import PropTypes from 'prop-types';
import projectContext from './ProjectContext';

const array = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

function ProjectProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    columnFilter: array[0],
    operator: 'maior que',
    filterValue: 0,
  });
  const [numericFilter, setNumericFilter] = useState([]);
  const [columns, setColumns] = useState(array);

  async function getData() {
    const getPromise = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const response = await getPromise.json();
    setData(response.results);
    setFilterData(response.results);
    return data;
  }

  const handleInputChange = ({ target }) => {
    setSearchInput(target.value);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const deleteFilter = (elemento) => {
    setNumericFilter(numericFilter.filter((e) => e !== elemento));
    setColumns([...columns, elemento.columnFilter]);
  };

  const removeFilters = () => {
    setNumericFilter([]);
    setColumns(array);
  };

  const handleNumericFilter = (e) => {
    e.preventDefault();
    const { columnFilter, operator, filterValue } = filters;
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
    <projectContext.Provider
      value={ {
        filterData,
        setFilterData,
        getData,
        data,
        setData,
        searchInput,
        handleInputChange,
        filters,
        handleChange,
        setNumericFilter,
        numericFilter,
        deleteFilter,
        columns,
        setColumns,
        handleNumericFilter,
        removeFilters,
      } }
    >
      {children}
    </projectContext.Provider>
  );
}

ProjectProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProjectProvider;
