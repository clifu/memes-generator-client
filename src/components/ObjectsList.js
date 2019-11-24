//temporary to display list of obejcts
import React from "react";
import { connect } from "react-redux";
import { fetchFakeData } from "../actions";
import Object from "./Object";

class ObjectsList extends React.Component {
  componentDidMount() {
    this.props.fetchFakeData();
  }

  renderList() {
    return this.props.objects.map((object, idx) => {
      return <Object data={object} key={idx} />;
    });
  }

  render() {
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}

const mapStateToProps = state => {
  return { objects: state.fakeData };
};

export default connect(mapStateToProps, { fetchFakeData })(ObjectsList);
