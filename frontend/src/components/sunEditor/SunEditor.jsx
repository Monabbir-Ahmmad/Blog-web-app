import { default as Editor } from "suneditor-react";
import EditorTheme from "./EditorTheme";
import { buttonList } from "./buttonList";

function SunEditor({
  minHeight = 400,
  maxHeight = "80vh",
  buttons = buttonList,
  getSunEditorInstance,
  onChange,
}) {
  return (
    <EditorTheme>
      <Editor
        onChange={onChange}
        getSunEditorInstance={getSunEditorInstance}
        setOptions={{
          placeholder: "Please type here...",
          defaultStyle: "font-size:16px; font-family:'Montserrat';",
          mode: "classic",
          minHeight: minHeight,
          maxHeight: maxHeight,
          fontSize: [18, 20, 22, 24, 26, 28, 36, 48, 72],
          formats: ["p", "div", "pre", "h1", "h2", "h3"],
          imageFileInput: false,
          buttonList: buttons,
        }}
      />
    </EditorTheme>
  );
}

export default SunEditor;
