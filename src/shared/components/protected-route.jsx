import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  redirectTo,
  isAuth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};
ProtectedRoute.defaultProps = {
  redirectTo: "/login"
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(ProtectedRoute);
