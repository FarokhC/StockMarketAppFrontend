import React from 'react';
import logo from './logo.svg';
import './App.css';

import { createStore } from 'redux';
import dataReducer from './Reducers/reducers';
import servicesModel from './Models/models';
import TestContainer from './Containers/TestContainer';
// import StockHomePageContainer from './Containers/StockHomePageContainer';
import { Provider } from 'react-redux';

const store = createStore(dataReducer);

function App() {
  let model = new servicesModel(store);
  return (
    <div className="App">
      <header className="App-header">

        <p>
          STOCK MARKET
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
      <Provider store = {store}>
          <TestContainer model = {model}></TestContainer>
        </Provider>
    </div>
  );
}

export default App;
