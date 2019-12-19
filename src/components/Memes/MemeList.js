//temporary to display list of obejcts
import React from "react";
import {connect} from "react-redux";
import {fetchMemes} from "../../actions";
import {Link} from "react-router-dom";
import Meme from "./Meme";
import _ from "lodash";

class MemeList extends React.Component {

    state = {
        memes: []
    };

    componentDidMount() {
        // this.props.fetchMemes();
        fetch('https://api.imgflip.com/get_memes')
            .then(data => data.json())
            .then((data) => {
                this.setState({memes: data.data.memes})
            })
            .catch(console.log)
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
        // const memes = [
        //     new MemeDTO(
        //         1,
        //         "Tytuł",
        //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        //         "https://picsum.photos/700/700"
        //     ),
        //     new MemeDTO(
        //         2,
        //         "Inny tytuł",
        //         "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        //         "https://picsum.photos/1700/1700"
        //     ),
        //     new MemeDTO(
        //         3,
        //         "xD",
        //         "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system",
        //         "https://picsum.photos/1600/1600"
        //     ),
        //     new MemeDTO(
        //         4,
        //         "Co za tytuł",
        //         "On the other hand, we denounce with righteous",
        //         "https://picsum.photos/3700/3700"
        //     )
        // ];

        return this.state.memes.map((post, idx) => {
            return <Meme data={post} key={idx}/>;
        });
        // return this.props.posts.map((post, idx) => {
        //     return <Post data={post} key={idx}/>;
        // });
    }

    render() {
        return (

            <div className="ui container">
                {/*<div className="ui two column centered grid">*/}
                {/*    <div className="column">*/}
                {this.renderList()}

                {/*    </div>*/}
                {/*</div>*/}

                {this.renderCreateButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {posts: Object.values(state.meme)};
};

export default connect(mapStateToProps, {fetchMemes})(MemeList);
