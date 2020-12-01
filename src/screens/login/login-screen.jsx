import React from "react";
import Toggle from "react-toggle";
import { Redirect } from "react-router-dom";
import "react-toggle/style.css";
import API from "./../../API";
import { gql } from "graphql-request";
import { connect } from "react-redux";
import Spinner from "../../shared/components/spinner";
import { login } from "./../../services/auth";
const createMutation = gql`
  mutation create($login: String!, $password: String!, $nick: String!) {
    UserUpsert(user: { login: $login, password: $password, nick: $nick }) {
      login
      nick
    }
  }
`;
const CreateUserForm = () => {
  const [values, setValues] = React.useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    API.request(createMutation, values).then(console.log);
  };

  const onChange = (e) => {
    const target = e.target;
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Login</label>
        <div className="col-sm-10">
          <input
            type="text"
            class="form-control"
            placeholder="Login"
            name="login"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label class="col-sm-2 col-form-label">Nick</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            placeholder="Nick"
            name="nick"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label class="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
        </div>
      </div>
      <button className="btn btn-primary">Create</button>
    </form>
  );
};

const LoginForm = ({ dispatch }) => {
  const [values, setValues] = React.useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  const onChange = (e) => {
    const target = e.target;
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Login</label>
        <input
          name="login"
          onChange={onChange}
          type="text"
          className="form-control"
          placeholder="Login"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          onChange={onChange}
          name="password"
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

const Login = ({ dispatch, authStatus }) => {
  const [isNewUser, setNewUser] = React.useState(true);

  if (authStatus === "resolved") {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <h1>{isNewUser ? "Login" : "Registration"} </h1>
        <Toggle checked={isNewUser} onChange={(e) => setNewUser((p) => !p)} />
      </div>
      <div className="col-sm-12 col-md-5 mx-auto">
        {isNewUser ? <LoginForm dispatch={dispatch} /> : <CreateUserForm />}
      </div>
      <div className="my-3">
        {authStatus === "pending" ? <Spinner /> : null}
      </div>
      <div className="mt-2">
        {authStatus === "rejected" ? (
          <span className="text-danger">Something went wrong</span>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  authStatus: state.auth.status
});
export default connect(mapStateToProps)(Login);
