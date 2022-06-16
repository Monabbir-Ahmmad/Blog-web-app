import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { default as Editor } from "suneditor-react";
import { buttonList } from "./buttonList";
import "./SunEditor.css";

function SunEditor({
  minHeight = 400,
  maxHeight = "80vh",
  getSunEditorInstance,
  onChange,
}) {
  const theme = useTheme();

  useEffect(() => {
    if (theme.palette.mode === "dark") {
      document.documentElement.style.setProperty("--bg-color", "#121212");
      document.documentElement.style.setProperty(
        "--btn-enabled-color",
        "#2f2f2f"
      );
      document.documentElement.style.setProperty("--btn-icon-color", "#ffffff");
      document.documentElement.style.setProperty(
        "--btn-icon-disabled-color",
        "#5e5e5e"
      );
      document.documentElement.style.setProperty("--txt-color", "#ffffff");
    } else {
      document.documentElement.style.setProperty("--bg-color", "#ffffff");
      document.documentElement.style.setProperty(
        "--btn-enabled-color",
        "#d2d2d2"
      );
      document.documentElement.style.setProperty("--btn-icon-color", "#000000");
      document.documentElement.style.setProperty(
        "--btn-icon-disabled-color",
        "#5e5e5e"
      );
      document.documentElement.style.setProperty("--txt-color", "#000000");
    }
  }, [theme]);

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
