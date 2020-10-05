import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import { Provider } from "react-redux"

import configureStore from "./store"
import ProtectedRoute from "./Utilis/ProtectedRoute"
import Header from "./Components/Header"
import Home from "./Components/Home"
import DashBoard from "./Components/Dashboard"
import About from "./Components/About"

function App() {
  return (
    <Provider store={configureStore()}>
      <Router >
        <div className="App">
          <Header />
          <Switch>
            <ProtectedRoute path="/dashboard">
              <DashBoard />
            </ProtectedRoute>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>

      </Router >
    </Provider>
  );
}

export default App;
