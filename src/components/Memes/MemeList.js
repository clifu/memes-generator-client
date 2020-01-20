//temporary to display list of obejcts
import React from "react";
import {connect} from "react-redux";
import {fetchMemes} from "../../actions";
import {Link} from "react-router-dom";
import Meme from "./Meme";
import _ from "lodash";

class MemeList extends React.Component {

    componentDidMount() {
        if (!this.props.memes) {
            this.props.fetchMemes();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) || this.state !== nextState;
    }

    renderCreateButton() {
        return (
            <div style={{textAlign: "right"}}>
                <Link to="/postCreate" className="ui button primary">
                    Create post
                </Link>
            </div>
        );
    }

    renderList() {
        if (!this.props.memes) {
            return this.props.posts.map((post, idx) => {
                return <Meme data={post} key={idx} loggedUserProfileId={this.props.loggedUserProfileId}/>;
            });
        } else {
            return this.props.memes.map((post, idx) => {
                return <Meme data={post} key={idx} loggedUserProfileId={this.props.loggedUserProfileId}/>;
            });
        }
    }

    render() {
        return (
            <div className="ui container">
                {this.renderList()}
                {this.renderCreateButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedUserProfileId: state.auth.profileId,
        posts: Object.values(state.meme)
    };
};

export default connect(mapStateToProps, {fetchMemes})(MemeList);
