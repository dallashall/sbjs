import React from 'react';
import { render } from 'react-dom';
import Board from './board';
import Connection from './socket';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  render(<Board connection={new Connection()} />, root);
});
