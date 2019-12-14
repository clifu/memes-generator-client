import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchPost, editPost } from "../../actions";
import PostForm from "./PostForm";
import history from '../../history'

class PostEdit extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  onCancel = () => {
    history.push("/list");
  }

  onSubmit = formValues => {
    this.props.editPost(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit post</h3>
        <PostForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.post, "title", "description")}
          onCancelButtonClick={this.onCancel}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.fakeData[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPost, editPost })(
  PostEdit
);
