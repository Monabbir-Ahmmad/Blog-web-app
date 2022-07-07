import "./SunEditor.css";

import { useEffect } from "react";
import { useTheme } from "@mui/material";

function EditorTheme({ children }) {
  const theme = useTheme();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--bg-color",
      theme.palette.background.paper
    );

    document.documentElement.style.setProperty(
      "--txt-color",
      theme.palette.text.primary
    );

    document.documentElement.style.setProperty(
      "--btn-icon-color",
      theme.palette.text.primary
    );

    document.documentElement.style.setProperty(
      "--btn-enabled-color",
      theme.palette.mode === "dark" ? "#2f2f2f" : "#d2d2d2"
    );

    document.documentElement.style.setProperty(
      "--btn-icon-disabled-color",
      "#5e5e5e"
    );
  }, [theme]);

  return children;
}

export default EditorTheme;
