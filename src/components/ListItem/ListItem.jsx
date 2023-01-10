import React from "react";
import "./listItem.scss";

const ListItem = (props) => {
  let { selected, id, handleClick } = props;
  let selectedStyle = "list-item selected";
  return (
    <div
      className={selected ? selectedStyle : "list-item"}
      onClick={() => handleClick(id)}
    >
      <h3 className="title">Document #{id}</h3>
      <h2 className="sub-title">Me, Dustin</h2>
    </div>
  );
};

export default ListItem;
