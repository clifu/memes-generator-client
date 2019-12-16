import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { deleteMeme, fetchMeme } from "../../actions";
import { connect } from "react-redux";
import _ from "lodash";

class MemeDelete extends React.Component {
  componentDidMount() {
    this.props.fetchMeme(this.props.match.params.id);
  }

  onCancel = () => {
    history.push("/list");
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  onDeleteButtonClick = () => {
    this.props.deleteMeme(this.props.match.params.id);
  };

  renderContent() {
    if (!this.props.post) {
      return "Jesteś pewien, że chcesz usunać tego mema?";
    }

    return `Jesteś pewien, że chcesz usunąć mema ${this.props.post.title}?`;
  }

  renderActions() {
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={this.onDeleteButtonClick}
        >
          Usuń
        </button>
        <button className="ui button positive" onClick={this.onCancel}>
          Anuluj
        </button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title="Usunąć mema ಥ╭╮ಥ?"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/list")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.meme[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchMeme, deleteMeme })(MemeDelete);
