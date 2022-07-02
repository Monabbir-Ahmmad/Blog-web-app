import EditorTheme from "./EditorTheme";

function SunContentDisplayer({ content }) {
  return (
    <EditorTheme>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="sun-editor-editable"
        style={{ fontFamily: "Montserrat", fontSize: "16px" }}
      ></div>
    </EditorTheme>
  );
}

export default SunContentDisplayer;
