import React from "react";
import _ from "lodash";
import { Formik, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

class ObjectForm extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  onSaveButtonClick = formikValues => {
    this.props.onSubmit(formikValues);
  };

  validateTitle = values => {
    let errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    }
    return errors;
  };

  renderContent() {
    return (
      <Formik
        initialValues={{ title: "" }}
        validate={this.validateTitle}
        onSubmit={values => this.onSaveButtonClick(values)}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form className="ui fluid form error" onSubmit={handleSubmit}>
            <label>Title</label>
            <div className="field">
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <ErrorMessage
                name="title"
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
          Save
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

export default ObjectForm;
