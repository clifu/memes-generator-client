//temporary to display post
import React from "react";
import { Link } from "react-router-dom";
import PostDTO from "../../DTO/PostDTO";

const Post = props => {
  //Way of assigning data to postDTO class
  var post = new PostDTO(props.data.id, props.data.title, props.data.description);
  return (
    <div className="item">
      <div className="content">ID: {post.id}</div>
      <div className="description">Title: {post.title}</div>      
      <div className="description">Description: {post.description}</div>
      <div className="right floated content">
        <Link
          to={`/posts/edit/${post.id}`}
          className="ui button primary"
        >
          Edit
        </Link>
        <Link
          className="ui button negative"
          to={`/posts/delete/${post.id}`}
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Post);
