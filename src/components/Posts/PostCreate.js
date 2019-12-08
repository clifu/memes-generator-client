import React from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions";
import PostForm from "./PostForm";
import _ from "lodash";

class PostCreate extends React.Component {
  onSubmit = formikValues => {
    this.props.createPost(formikValues);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  render() {
    return (
      <div>
        <PostForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createPost })(PostCreate);
