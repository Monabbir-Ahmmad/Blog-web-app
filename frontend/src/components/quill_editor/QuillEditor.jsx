import styled from "@emotion/styled";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

class CustomQuill extends ReactQuill {
  destroyEditor() {
    if (!this.editor) return;
    this.unhookEditor(this.editor);
  }
}

const Editor = styled(CustomQuill)`
  .ql-container {
    min-height: 20vh;
    font-size: 16px;
    background-color: white;
  }

  .ql-toolbar {
    background: #f0f0f0;
  }

  .ql-video {
    width: 640px;
    height: 360px;
  }

  .ql-snow {
    .ql-picker {
      &.ql-size {
        .ql-picker-label,
        .ql-picker-item {
          &::before {
            content: attr(data-value) !important;
          }
        }
      }
    }
  }
`;

const fontSize = [
  "16px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "40px",
  "44px",
  "48px",
  "52px",
  "56px",
];

const Size = Quill.import("attributors/style/size");
Size.whitelist = fontSize;
Quill.register(Size, true);

const modules = {
  toolbar: [
    [{ font: [] }], // Fonts
    [{ size: fontSize }], // Font size
    [{ header: [1, 2, 3] }], // Headers
    ["bold", "italic", "underline", "strike"], // Font style
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }], // List type
    [{ script: "sub" }, { script: "super" }], // Superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // Out-dent/Indent
    [{ direction: "rtl" }], // Text direction
    [{ color: [] }, { background: [] }], // Text colors
    [{ align: [] }], // Text align
    ["link", "image", "video"], // Inset link, image, video
    ["clean"], // Clear all formatting
  ],
};

function QuillEditor({ onEditorChange }) {
  return (
    <div>
      <Editor
        theme={"snow"}
        modules={modules}
        defaultValue={null}
        onChange={(value) => onEditorChange(value)}
        placeholder="Write here"
      />
    </div>
  );
}

export default QuillEditor;
