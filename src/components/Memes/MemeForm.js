import React from "react";
import _ from "lodash";
import { Formik, ErrorMessage } from "formik";
import MemeDTO from "../../DTO/MemeDTO";
import MemeCreator from "./AdditionalComponents/MemeCreator";

class MemeForm extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  onSaveButtonClick = formikValues => {
    this.props.onSubmit(formikValues);
  };

  onCancelButtonClick = () => {
    this.props.onCancelButtonClick();
  }

  validateTitleAndDescription = values => {
    let errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    }

    if (!values.description) {
      errors.description = "Description is required";
    }
    return errors;
  };

  renderContent() {
    var post;
    if(this.props.initialValues) {
      post = new MemeDTO(null, this.props.initialValues.title, this.props.initialValues.description)
    }
    return (
      <Formik
        initialValues={{ title: post ? post.title : "" , description: post ? post.description : ""}}
        validate={this.validateTitleAndDescription}
        onSubmit={values => this.onSaveButtonClick(values)}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form className="ui fluid form error" onSubmit={handleSubmit}>
            <label>Tytuł</label>
            <div className="field">
              <input
                type="text"
                name="title"
                placeholder="Tytuł"
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
            <label>Opis</label>
            <div className="field">
              <input
                type="text"
                name="description"
                placeholder="Opis"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <ErrorMessage
                name="description"
                render={msg => (
                  <div className="ui pointing red basic label">{msg}</div>
                )}
              />
            </div>
            {this.props.type === 'memeCreate' ?
                <MemeCreator></MemeCreator> : ''}
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
          Zapisz
        </button>
        <button
          className="ui button negative"
          onClick={this.onCancelButtonClick}
          type="submit"
        >
          Anuluj
        </button>
      </React.Fragment>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default MemeForm;
