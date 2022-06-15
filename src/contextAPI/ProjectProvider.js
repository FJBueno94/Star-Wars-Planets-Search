import React, { useState } from 'react';
import PropTypes from 'prop-types';
import projectContext from './ProjectContext';

function ProjectProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    columnFilter: 'population',
    operator: 'maior que',
    filterValue: 0,
  });
  const [numericFilter, setNumericFilter] = useState([]);

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
