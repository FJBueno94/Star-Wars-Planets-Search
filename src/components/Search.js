import React, { useContext } from 'react';
import ProjectContext from '../contextAPI/ProjectContext';

function Search() {
  const { searchInput, setSearchInput } = useContext(ProjectContext);

  const handleChange = ({ target }) => {
    setSearchInput(target.value);
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
            onChange={ handleChange }
            data-testid="name-filter"
          />
        </label>
      </form>
    </div>
  );
}

export default Search;
