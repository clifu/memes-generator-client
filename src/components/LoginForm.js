import React from "react";
import _ from "lodash";
import {ErrorMessage, Formik} from "formik";
import {signIn} from "../actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

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


    render() {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <Formik
                        initialValues={{email: "", password: ""}}
                        validate={this.validateEmailAndPassword}
                        onSubmit={values => this.onLoginFormButtonClick(values)}>
                        {({values, handleChange, handleBlur, handleSubmit}) => (
                            <form className="ui large form" onSubmit={handleSubmit}>
                                <div className="ui stacked segment">
                                    <div className="field">
                                        <div className="ui left icon input">
                                            <i className="user icon"></i>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="email"
                                            render={msg => (
                                                <div className="ui pointing red basic label">{msg}</div>
                                            )}/>
                                    </div>
                                    <div className="field">
                                        <div className="ui left icon input">
                                            <i className="lock icon"></i>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}/>
                                        </div>
                                        <ErrorMessage
                                            name="password"
                                            render={msg => (
                                                <div className="ui left pointing red basic label">{msg}</div>
                                            )}/>
                                    </div>
                                    <React.Fragment>
                                        <button
                                            className="ui fluid large green submit button"
                                            onClick={handleSubmit}
                                            type="submit">
                                            Zaloguj
                                        </button>
                                    </React.Fragment>
                                </div>
                            </form>
                        )}
                    </Formik>
                    <div className="ui message">
                        Nie masz konta? <Link to="/register">Zarejestruj się!</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {signIn})(LoginForm);
