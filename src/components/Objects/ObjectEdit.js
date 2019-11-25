import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchObject, editObject } from "../../actions";
import ObjectForm from "./ObjectForm";

class ObjectEdit extends React.Component {
  componentDidMount() {
    this.props.fetchObject(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editObject(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.object) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit object</h3>
        <ObjectForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.stream, "title", "description")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { object: state.fakeData[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchObject, editObject })(
  ObjectEdit
);
