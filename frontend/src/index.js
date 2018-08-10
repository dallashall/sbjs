import React from 'react';
import { render } from 'react-dom';
import Board from './board';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  render(<Board />, root);
});
