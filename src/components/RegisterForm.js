import React from "react";
import _ from "lodash";
import { Formik, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

class RegisterForm extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  renderContent = () => {
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          firstName: "",
          lastName: ""
        }}
        validate={this.validateForm}
        onSubmit={values => {
          this.onRegisterButtonClick(values);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form className="ui fludi form error" onSubmit={handleSubmit}>
            <label>Username</label>
            <div className="field">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onSubmit={handleSubmit}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <ErrorMessage
                name="username"
                render={msg => (
                  <div className="ui pointing red basic label">{msg}</div>
                )}
              />
            </div>
            <label>Email</label>
            <div className="field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onSubmit={handleSubmit}
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
                placeholder="password"
                onSubmit={handleSubmit}
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
            <label>First name</label>
            <div className="field">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                onSubmit={handleSubmit}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <ErrorMessage
                name="firstName"
                render={msg => (
                  <div className="ui pointing red basic label">{msg}</div>
                )}
              />
            </div>
            <label>Last name</label>
            <div className="field">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                onSubmit={handleSubmit}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              <ErrorMessage
                name="lastName"
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
              Already have an account?
              <Link to="/login"> Click here!</Link>
            </div>
          </form>
        )}
      </Formik>
    );
  };

  validateForm = values => {
    let errors = {};

    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.firstName) {
      errors.firstName = "First name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!values.email) {
      errors.email = "Email address is equired";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) errors.password = "Password is required";
    else if (!/(?=.{8,})/i.test(values.password))
      errors.password = "Password must be 8 characters or longer";
    else if (!/(?=.*[a-z])/i.test(values.password))
      errors.password = "Password must contain at least 1 lowercase character";
    else if (!/(?=.*[A-Z])/i.test(values.password))
      errors.password = "Password must contain at least 1 uppercase character";
    else if (!/(?=.*[0-9])/i.test(values.password))
      errors.password = "Password must contain at least 1 numeric character";
    // eslint-disable-next-line
    else if (!/(?=.*[!@#\$%\^&\*])/i.test(values.password))
      errors.password = "Password must contain at least 1 special character";

    return errors;
  };

  onRegisterButtonClick = values => {
    console.log(values);
  };

  renderActions(handleSubmit) {
    return (
      <React.Fragment>
        <button
          className="ui button positive"
          onClick={handleSubmit}
          type="submit"
          buttonStyle={{ marginRight: "10px" }}
        >
          Register
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

export default RegisterForm;
