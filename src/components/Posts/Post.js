//temporary to display post
import React from "react";
import { Link } from "react-router-dom";

const Postt = props => {
  return (
    <div className="item">
      <div className="content">{props.data.id}</div>
      <div className="description">{props.data.title}</div>
      <div className="right floated content">
        <Link
          to={`/posts/edit/${props.data.id}`}
          className="ui button primary"
        >
          Edit
        </Link>
        <Link
          className="ui button negative"
          to={`/posts/delete/${props.data.id}`}
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Postt);
