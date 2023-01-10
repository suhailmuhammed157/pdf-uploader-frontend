import React, { useState } from "react";
import "./sidebar.scss";
import Icon from "../../assets/Icon.png";
import ListItem from "../../components/ListItem/ListItem";

const Sidebar = (props) => {
  let { handleFile, files, selectedId, handleClick } = props;

  let renderFiles = files.map((file) => {
    return (
      <ListItem
        key={file.id}
        id={file.id}
        handleClick={handleClick}
        selected={selectedId === file.id}
      />
    );
  });

  return (
    <section className="sidebar">
      <div className="head">
        <h4>FILES</h4>
        <form>
          <div className="upload">
            <label className="file-upload" htmlFor="file-input">
              <h5>Upload</h5>
              <img src={Icon} />
            </label>
            <input id="file-input" type="file" onChange={handleFile} />
          </div>
        </form>
      </div>
      <div className="document-list">
        {files.length === 0 ? <h3>No data</h3> : renderFiles}
      </div>
    </section>
  );
};

export default Sidebar;
