import { createContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";

const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

function ThemeContextProvider({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const themeMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
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
