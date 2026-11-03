/* The provider and its hook intentionally share this module's context. */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useState, createContext } from "react";

const DarkmodeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <DarkmodeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkmodeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkmodeContext);
}
