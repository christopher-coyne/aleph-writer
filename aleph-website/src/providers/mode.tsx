// ThemeProviderWrapper.js
import React, { useState, useContext, createContext } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme/theme";

export const ThemeContext = createContext({
  darkMode: "dark",
  toggleTheme: () => {},
});

export const ThemeProviderWrapper = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState("dark");
  const toggleTheme = () => {
    setDarkMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
