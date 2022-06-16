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

  const deleteFilter = (index) => {
    numericFilter.filter((_e, i) => i !== index);
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
        setFilters,
        handleChange,
        setNumericFilter,
        numericFilter,
        deleteFilter,
        columns,
        setColumns,
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
