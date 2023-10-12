import { useContext } from "react";
import { ThemeContext } from "./Theme";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <span className="fs-2" onClick={() => toggleTheme()}>
      {theme === "light-theme" ? <FaToggleOff /> : <FaToggleOn />}
    </span>
  );
};

export default ToggleTheme;
