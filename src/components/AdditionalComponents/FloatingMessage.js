import React from "react";
import _ from "lodash";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { dismissNotification } from "../../actions";

class FloatingMessage extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  handleDismiss = () => {
    this.props.dismissNotification(this.props.id);
  };

  render() {
    return (
      <Message floating onDismiss={this.handleDismiss}>
        {this.props.notification.message
          ? this.props.notification.message
          : this.props.notification}
      </Message>
    );
  }
}

export default connect(null, { dismissNotification })(FloatingMessage);
