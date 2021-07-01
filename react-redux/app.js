import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import UiElements from "./pages/products/UiElements";
import LandingPage from "./pages/landing/LandingPage";


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/regi" exact component={UiElements} />
        
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;