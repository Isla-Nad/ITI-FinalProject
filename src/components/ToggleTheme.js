import { useContext } from "react";
import { FaMoon, FaLightbulb, FaSun, FaTree } from "react-icons/fa";
import { ThemeContext } from "./Theme";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const themeIcons = {
    dark: <FaMoon className=" text-black  nav-link" onClick={() => toggleTheme()} />,
    light: <FaLightbulb className=" text-secondary nav-link" onClick={() => toggleTheme()} />,
    solar: <FaSun className=" text-warning nav-link" onClick={() => toggleTheme()} />,
    grass: <FaTree className=" text-success nav-link" onClick={() => toggleTheme()} />,
  };

  return <>{themeIcons[theme]}</>;
};

export default ToggleTheme;
