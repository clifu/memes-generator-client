import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { deletePost, fetchPost } from "../../actions";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

class PostDelete extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
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
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title="Delete post"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.fakeData[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPost, deletePost })(
  PostDelete
);
