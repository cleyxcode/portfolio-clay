/* The provider and its hook intentionally share this module's context. */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useState, createContext } from "react";

const DarkmodeContext = createContext();
const DEFAULT_DARK_MODE = true;

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(DEFAULT_DARK_MODE);

  const toggleDarkMode = () => setDarkMode((currentMode) => !currentMode);

  return (
    <DarkmodeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkmodeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkmodeContext);
}
