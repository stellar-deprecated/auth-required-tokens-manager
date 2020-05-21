import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";

import { Home } from "components/Home";

import { reducer as updatedAt } from "ducks/updatedAt";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
  }
`;

const store = configureStore({
  reducer: combineReducers({
    updatedAt,
  }),
});

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <GlobalStyle />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
