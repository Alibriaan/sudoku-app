import React from 'react';
import { Container } from '@mui/material';
import { SudokuGame } from './containers/SudokuGame';

function App() {
  return (
    <Container
      className="App"
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <SudokuGame />
    </Container>
  );
}

export default App;
