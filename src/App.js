import React from 'react';

import { Provider } from "react-redux"

import configureStore from "./store"
import { BrowserRouter } from "react-router-dom"
import Header from "./Components/Header"
import Router from "./Utilis/Router"

function App() {

  return (
    <Provider store={configureStore()}>

      <div className="App">

        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </div>

    </Provider>
  );
}

export default App;
