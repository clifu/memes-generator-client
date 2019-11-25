//temporary to display object
import React from "react";

const Objectt = props => {
  return (
    <div className="item">
      <div className="content">{props.data.id}</div>
      <div className="description">{props.data.title}</div>
    </div>
  );
};

export default Objectt;
