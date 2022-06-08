import React from 'react';
import Table from './components/Table';
import ProjectProvider from './contextAPI/ProjectProvider';

function App() {
  return (
    <ProjectProvider>
      <Table />
    </ProjectProvider>
  );
}

export default App;
