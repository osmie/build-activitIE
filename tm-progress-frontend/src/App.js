import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./routes/Home";
import { Trends } from "./routes/Trends";
import { Header } from "./Header";

import styled from "styled-components";
import media from "./utils/media-queries";
import GlobalStyles from "./styles/global";

const Page = styled.div`
  display: grid;
  height: 100vh;
  max-height: 100vh;
  grid-template-rows: 4rem 1fr 3.5rem;
  ${media.mediumUp`
    grid-template-rows: 4rem 1fr;
  `}
`;

const PageBody = styled.main`
  padding: 0;
  margin: 0;
  overflow: scroll;
`;
// ${hideScrollbars()};

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Page>
          <Header />
          <PageBody role="main">
            <Switch>
              <Route exact path={`/trends`}>
                <Trends />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </PageBody>
        </Page>
      </div>
    </Router>
  );
}

export default App;
