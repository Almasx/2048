import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

import Badge from "./Badge";

export const themeAtom = atom<boolean>(true);

export const ThemeSwitch = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const colorTheme = theme ? "dark" : "light";

  const onClick = () => {
    setTheme((previos) => !previos);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme ? "light" : "dark");
    root.classList.add(colorTheme);

    localStorage.setItem("theme", colorTheme);
  }, [colorTheme, setTheme, theme]);

  return (
    <Badge
      onClick={onClick}
      className="flex flex-row truncate bg-dark text-light dark:bg-light dark:text-dark"
    >
      <span className="mr-1">⬤</span> {theme ? "Dark" : "Light"} Theme
    </Badge>
  );
};
