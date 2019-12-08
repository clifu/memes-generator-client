import React from "react";
import _ from "lodash";
import { Formik, ErrorMessage } from "formik";
import PostDTO from "../../DTO/PostDTO";

class PostForm extends React.Component {
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
      post = new PostDTO(null, this.props.initialValues.title, this.props.initialValues.description)
    }
    return (
      <Formik
        initialValues={{ title: post ? post.title : "" , description: post ? post.description : ""}}
        validate={this.validateTitleAndDescription}
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
            <label>Description</label>
            <div className="field">
              <input
                type="text"
                name="description"
                placeholder="Description"
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
        <button
          className="ui button negative"
          onClick={this.onCancelButtonClick}
          type="submit"
        >
          Cancel
        </button>
      </React.Fragment>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default PostForm;
