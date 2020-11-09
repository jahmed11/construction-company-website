import React from "react";
import SunEditor from "suneditor-react";

const textEditor = (props) => {
  return (
    <>
      <SunEditor
        showToolbar={true}
        enableToolbar={true}
        onChange={props.editorChange}
      />
    </>
  );
};

export default textEditor;
