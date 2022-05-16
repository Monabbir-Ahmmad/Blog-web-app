import { useState } from "react";
import SunEditor from "./components/sun_editor/SunEditor";
import "suneditor/dist/css/suneditor.min.css";

function App() {
  const [value, setValue] = useState();

  return (
    <div>
      <SunEditor
        onChange={(content) => {
          setValue(content);
        }}
      />
      <div
        dangerouslySetInnerHTML={{ __html: value }}
        className="sun-editor-editable"
      ></div>
    </div>
  );
}

export default App;
