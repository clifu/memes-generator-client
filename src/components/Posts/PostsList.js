//temporary to display list of obejcts
import React from "react";
import { connect } from "react-redux";
import { fetchFakeData } from "../../actions";
import { Link } from "react-router-dom";
import Post from "./Post";
import _ from "lodash";

class PostsList extends React.Component {
  componentDidMount() {
    this.props.fetchFakeData();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || this.state !== nextState;
  }

  renderCreateButton() {
    return (
      <div style={{ textAlign: "right" }}>
        <Link to="/postCreate" className="ui button primary">
          Create post
        </Link>
      </div>
    );
  }

  renderList() {
    return this.props.posts.map((post, idx) => {
      return <Post data={post} key={idx} />;
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
  return { posts: Object.values(state.fakeData) };
};

export default connect(mapStateToProps, { fetchFakeData })(PostsList);
