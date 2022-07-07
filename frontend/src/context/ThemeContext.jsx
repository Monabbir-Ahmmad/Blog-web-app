import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useEffect, useMemo, useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem("appTheme") || "light");

  const themeMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    localStorage.setItem("appTheme", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "Montserrat",
          fontWeightLight: 400,
          fontWeightRegular: 500,
          fontWeightMedium: 600,
          fontWeightBold: 700,
        },
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
          accent: {
            main: "#1976d220",
          },
          backgroundColor: mode === "light" ? "#f9f9f9" : "#1c1c1c",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
