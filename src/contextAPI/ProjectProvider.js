import React, { useState } from 'react';
import PropTypes from 'prop-types';
import projectContext from './ProjectContext';

function ProjectProvider({ children }) {
  const [data, setData] = useState([]);

  async function getData() {
    const getPromise = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const response = await getPromise.json();
    setData(response.results);
    return data;
  }

  return (
    <projectContext.Provider value={ { data, setData, getData } }>
      {children}
    </projectContext.Provider>
  );
}

ProjectProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProjectProvider;
