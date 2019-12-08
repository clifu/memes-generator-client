import React from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions";
import PostForm from "./PostForm";
import _ from "lodash";
import history from '../../history'

class PostCreate extends React.Component {
  onSubmit = formikValues => {
  this.props.createPost(formikValues);
  };

  onCancel = () => {
    history.push("/list");
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  render() {
    return (
      <div>
        <PostForm onSubmit={this.onSubmit} onCancelButtonClick={this.onCancel}/>
      </div>
    );
  }
}

export default connect(null, { createPost })(PostCreate);
