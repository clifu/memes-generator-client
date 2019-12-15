import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { deletePost, fetchPost } from "../../actions";
import { connect } from "react-redux";
import _ from "lodash";

class MemeDelete extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  onCancel = () => {
    history.push("/list");
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  onDeleteButtonClick = () => {
    this.props.deletePost(this.props.match.params.id);
  };

  renderContent() {
    if (!this.props.post) {
      return "Are you sure?";
    }

    return `Are you sure you want to delete ${this.props.post.title}`;
  }

  renderActions() {
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={this.onDeleteButtonClick}
        >
          Delete
        </button>
        <button
          className="ui button positive"
          onClick={this.onCancel}
        >
          Cancel
        </button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title="Delete post"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/list")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.fakeData[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPost, deletePost })(
  MemeDelete
);
