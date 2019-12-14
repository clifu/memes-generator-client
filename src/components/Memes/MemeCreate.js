import React from "react";
import {connect} from "react-redux";
import {createPost} from "../../actions";
import MemeForm from "./MemeForm";
import _ from "lodash";
import history from '../../history'

class MemeCreate extends React.Component {
    onSubmit = formikValues => {
        this.props.createPost(formikValues);
    };

    onCancel = () => {
        history.push("/");
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) || this.state !== nextState;
    }

    render() {
        return (
            <div className="ui container">
                <MemeForm onSubmit={this.onSubmit} onCancelButtonClick={this.onCancel}/>
            </div>
        );
    }
}

export default connect(null, {createPost})(MemeCreate);
