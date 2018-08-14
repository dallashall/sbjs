import React from 'react';
import { render } from 'react-dom';
import uuid from 'uuid/v1';

import Board from './board';
import Connection from './socket';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(rootReducer, { currentPlayer: { id: uuid(), username: 'Bob' } });

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  render((
    <Provider store={store} >
      <Board connection={new Connection()} />
    </Provider>
  ), root);
});
