import React from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import JobsTable from './jobs.jsx';

ReactDOM.render(
  <Container >
      <JobsTable/>
  </Container >,
  document.getElementById('root')
)
