import React from "react";
import _ from "lodash";
import { Formik, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { signIn } from "../actions";
import { connect } from "react-redux";

class LoginForm extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  onLoginFormButtonClick = formikValues => {
    this.props.signIn(formikValues);
  };

  validateEmailAndPassword = values => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email address is equired";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) errors.password = "Password is required";

    return errors;
  };

  renderContent() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={this.validateEmailAndPassword}
        onSubmit={values => this.onLoginFormButtonClick(values)}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form className="ui fluid form error" onSubmit={handleSubmit}>
            <label>Email</label>
            <div className="field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <ErrorMessage
                name="email"
                render={msg => (
                  <div className="ui pointing red basic label">{msg}</div>
                )}
              />
            </div>
            <label>Password</label>
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <ErrorMessage
                name="password"
                render={msg => (
                  <div className="ui pointing red basic label">{msg}</div>
                )}
              />
            </div>
            <div
              style={{
                float: "right",
                marginTop: "50px",
                marginBottom: "10px"
              }}
            >
              {this.renderActions(handleSubmit)}
            </div>
            <div>
              Need an acccount?
              <Link to="/register"> Click here!</Link>
            </div>
          </form>
        )}
      </Formik>
    );
  }

  renderActions(handleSubmit) {
    return (
      <React.Fragment>
        <button
          className="ui button positive"
          onClick={handleSubmit}
          type="submit"
        >
          Login
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default connect(null, { signIn })(LoginForm);
