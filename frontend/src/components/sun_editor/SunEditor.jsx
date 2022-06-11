import { default as Editor } from "suneditor-react";
import { buttonList } from "./buttonList";
import "./SunEditor.css";

function SunEditor({
  minHeight = 400,
  maxHeight = "80vh",
  getSunEditorInstance,
  onChange,
}) {
  return (
    <Editor
      onChange={onChange}
      getSunEditorInstance={getSunEditorInstance}
      setOptions={{
        defaultStyle: "font-size:16px; font-family:'Montserrat';",
        mode: "classic",
        minHeight: minHeight,
        maxHeight: maxHeight,
        fontSize: [18, 20, 22, 24, 26, 28, 36, 48, 72],
        formats: ["p", "div", "pre", "h1", "h2", "h3"],
        imageFileInput: false,
        buttonList: buttonList,
      }}
    />
  );
}

export default SunEditor;
