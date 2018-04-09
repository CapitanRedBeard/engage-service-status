import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './configureStore.js';
import EnvironmentSelector from './modules/ServiceStatus/containers/EnvironmentSelector';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <h3>Status</h3>
      <EnvironmentSelector />
    </div>
  </Provider>
)

export default App;
