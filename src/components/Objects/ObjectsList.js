//temporary to display list of obejcts
import React from "react";
import { connect } from "react-redux";
import { fetchFakeData } from "../../actions";
import { Link } from "react-router-dom";
import Objectt from "./Objectt";

class ObjectsList extends React.Component {
  componentDidMount() {
    this.props.fetchFakeData();
  }

  renderCreateButton() {
    return (
      <div style={{ textAlign: "right" }}>
        <Link to="/objectCreate" className="ui button primary">
          Create object
        </Link>
      </div>
    );
  }

  renderList() {
    return this.props.objects.map((object, idx) => {
      return <Objectt data={object} key={idx} />;
    });
  }

  render() {
    return (
      <div>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreateButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { objects: Object.values(state.fakeData) };
};

export default connect(mapStateToProps, { fetchFakeData })(ObjectsList);
