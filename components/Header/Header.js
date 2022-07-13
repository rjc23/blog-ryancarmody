import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useState, userEffect } from "react";
import Link from "next/link";

function Header() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-5 h-5"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-5 h-5"
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  return (
    <div className="header">
      <nav>
        <Link href="/">
          <a className="a-button hover:bg-gray-200 dark:hover:bg-gray-800">
            Home
          </a>
        </Link>
        <Link href="/about">
          <a className="a-button hover:bg-gray-200 dark:hover:bg-gray-800">
            About
          </a>
        </Link>
      </nav>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
      >
        {renderThemeChanger()}
      </button>
    </div>
  );
}

export default Header;
