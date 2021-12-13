import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { ContextProvider } from "@components/Context";

import HomePage from "@pages/index";
import Layout from "@components/Layout";

const App = () => {
  return (
    <ContextProvider>
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Router>
      </Layout>
    </ContextProvider>
  );
};

export default App;
