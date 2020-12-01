import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./screens";
import store from "./store/configure-store";
import ProtectedRoute from "./shared/components/protected-route";
import SideBar from "./sidebar";
import NavBar from "./navbar";

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <NavBar />
          <main className="row">
            <SideBar />
            <div className="col-sm-12 col-md-9">
              <Switch>
                {routes.map((route, index) => {
                  return route.isProtected ? (
                    <ProtectedRoute key={index.toString()} {...route} />
                  ) : (
                    <Route key={index.toString()} {...route} />
                  );
                })}
              </Switch>
            </div>
          </main>
        </Router>
      </Provider>
    </div>
  );
}
