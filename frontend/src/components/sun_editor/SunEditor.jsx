import { default as Editor } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const buttonList = [
  ["undo", "redo"],
  ["font", "fontSize", "formatBlock"],
  ["paragraphStyle", "blockquote"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["fontColor", "hiliteColor", "textStyle"],
  ["outdent", "indent"],
  ["align", "horizontalRule", "list", "lineHeight"],
  ["removeFormat"],
  ["table", "link", "image", "video", "audio" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
  /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
  ["fullScreen", "preview", "showBlocks", "codeView"],
  /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
]; // Or Array of button list, eg. [['font', 'align'], ['image']]
// plugins: [font] set plugins, all plugins are set by default
// Other option;

function SunEditor({ onChange }) {
  return (
    <Editor
      onChange={onChange}
      setOptions={{
        mode: "classic",
        minHeight: 400,
        maxHeight: "90vh",
        imageFileInput: false,
        buttonList: buttonList,
      }}
    />
  );
}

export default SunEditor;
