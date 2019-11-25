import React from "react";
import { connect } from "react-redux";
import { createObject } from "../../actions";
import ObjectForm from "./ObjectForm";
import _ from "lodash";

class ObjectCreate extends React.Component {
  onSubmit = formikValues => {
    this.props.createObject(formikValues);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  render() {
    return (
      <div>
        <ObjectForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createObject })(ObjectCreate);
