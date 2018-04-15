import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './configureStore.js';
import StatusPage from './modules/StatusPage/containers'

const App = () => (
  <Provider store={store}>
    <div className="App">
      <StatusPage />
    </div>
  </Provider>
)

export default App;
