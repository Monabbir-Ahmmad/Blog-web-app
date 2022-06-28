import { useTheme } from "@mui/material";
import { useEffect } from "react";
import "./SunEditor.css";

function EditorTheme({ children }) {
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

  return children;
}

export default EditorTheme;
