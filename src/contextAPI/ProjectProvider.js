import React, { useState } from 'react';
import PropTypes from 'prop-types';
import projectContext from './ProjectContext';

function ProjectProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  async function getData() {
    const getPromise = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const response = await getPromise.json();
    setData(response.results);
    setFilterData(response.results);
    return data;
  }

  return (
    <projectContext.Provider
      value={ {
        filterData,
        setFilterData,
        getData,
        data,
        setData,
        searchInput,
        setSearchInput,
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
