import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { deleteObject, fetchObject } from "../../actions";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

class ObjectDelete extends React.Component {
  componentDidMount() {
    this.props.fetchObject(this.props.match.params.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  onDeleteButtonClick = () => {
    this.props.deleteObject(this.props.match.params.id);
  };

  renderContent() {
    if (!this.props.object) {
      return "Are you sure?";
    }

    return `Are you sure you want to delete ${this.props.object.title}`;
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
        title="Delete object"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { object: state.fakeData[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchObject, deleteObject })(
  ObjectDelete
);
