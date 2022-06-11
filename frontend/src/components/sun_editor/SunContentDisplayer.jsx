import "./SunEditor.css";

function SunContentDisplayer({ content }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="sun-editor-editable"
      style={{ fontFamily: "Montserrat", fontSize: "16px" }}
    ></div>
  );
}

export default SunContentDisplayer;
