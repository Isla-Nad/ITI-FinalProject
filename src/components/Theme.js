import { useEffect, createContext, useState } from "react";

const ThemeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "light");
    return "light";
  } else {
    return theme;
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);
  const themeMap = {
    dark: "light",
    light: "solar",
    solar: "grass",
    grass: "dark",
  };

  function toggleTheme() {
    const next = themeMap[theme];
    setTheme(next);
    localStorage.setItem("theme", next);
  }

  useEffect(() => {
    document.body.classList.add(theme);

    const previousTheme = Object.keys(themeMap).find((key) => themeMap[key] === theme);
    if (previousTheme) {
      document.body.classList.remove(previousTheme);
    }

    const refreshTheme = () => {
      localStorage.setItem("theme", theme);
    };

    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
