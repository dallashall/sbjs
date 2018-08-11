import { createStore } from 'redux';
import rootReducer from '../reducers';

const makeStore = preLoadedState => createStore(rootReducer, preLoadedState);

export default makeStore;
