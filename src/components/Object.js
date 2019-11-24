//temporary to display object
import React from "react";

const Object = props => {
  return (
    <div>
      {props.data.id} {props.data.title}
    </div>
  );
};

export default Object;
