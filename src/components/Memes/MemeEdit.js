import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import {editMeme, fetchMeme} from "../../actions";
import MemeForm from "./MemeForm";
import history from "../../history";

class MemeEdit extends React.Component {
    componentDidMount() {
        this.props.fetchMeme(this.props.match.params.id);
    }

    onCancel = () => {
        history.push("/list");
    };

    onSubmit = formValues => {
        this.props.editMeme(this.props.match.params.id, formValues);
    };

    render() {
        if (!this.props.post) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <h3>Edycja mema</h3>
                <MemeForm
                    onSubmit={this.onSubmit}
                    initialValues={_.pick(this.props.post, "title", "description")}
                    onCancelButtonClick={this.onCancel}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {post: state.meme[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {fetchMeme, editMeme})(MemeEdit);
