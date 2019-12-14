import React from "react";
import _ from "lodash";
import {ErrorMessage, Formik} from "formik";
import {Link} from "react-router-dom";
import {registerUser} from "../actions";
import {connect} from "react-redux";

class RegisterForm extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) || this.state !== nextState;
    }

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
        this.props.registerUser(values);
    };

    render() {
        return <div className="ui two column centered grid">
            <div className="column">
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
                    {({values, handleChange, handleBlur, handleSubmit}) => (
                        <form className="ui large form" onSubmit={handleSubmit}>
                            <div className="ui stacked segment">
                                <div className="field">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Nazwa użytkownika"
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
                                <div className="field">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Hasło"
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
                                <div className="field">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Imię"
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
                                <div className="field">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Nazwisko"
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
                                <React.Fragment>
                                    <button
                                        className="ui fluid large blue submit button"
                                        onClick={handleSubmit}
                                        type="submit"
                                        style={{marginRight: "10px"}}>
                                        Zarejestruj się
                                    </button>
                                </React.Fragment>
                            </div>
                        </form>
                    )}
                </Formik>
                <div className="ui message">
                    Masz już konto?
                    <Link to="/login"> Przejdź do logowania!</Link>
                </div>
            </div>
        </div>;
    }
}

export default connect(null, {registerUser})(RegisterForm);
