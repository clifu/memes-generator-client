//temporary to display object
import React from "react";
import { Link } from "react-router-dom";

const Objectt = props => {
  return (
    <div className="item">
      <div className="content">{props.data.id}</div>
      <div className="description">{props.data.title}</div>
      <div className="right floated content">
        <Link
          to={`/objects/edit/${props.data.id}`}
          className="ui button primary"
        >
          Edit
        </Link>
        <Link
          className="ui button negative"
          to={`/objects/delete/${props.data.id}`}
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default Objectt;
