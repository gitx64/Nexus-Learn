import React from "react";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/UserContext.jsx";
import { useTheme } from "../../hooks/ThemeContext.jsx";
import { toast } from "react-toastify";

const Header = () => {
  const { setUser, setPaperList } = useUser();
  const { theme, toggleTheme } = useTheme();

  const logout = () => {
    setUser("");
    setPaperList([]);
    localStorage.clear();
    toast.info("Logged Out");
  };

  return (
    <header className="absolute top-0 flex w-full justify-between bg-slate-950 text-slate-50 shadow-lg dark:bg-slate-950 dark:shadow-slate-900/50">
      <Link to="/dash" className="ml-4 flex items-center gap-2 px-3 py-1">
        <img
          src="/nexusLearn.png"
          alt="Nexus-Learn"
          className="h-10 w-auto object-contain sm:h-12"
        />
      </Link>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="group relative m-2 flex items-center rounded-lg bg-slate-800/50 p-2 text-xl font-semibold transition-all duration-200 hover:bg-blue-700 hover:text-slate-100 active:scale-95 dark:bg-slate-800 dark:hover:bg-blue-600"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <FiMoon className="animate-fadeIn" />
          ) : (
            <FiSun className="animate-fadeIn" />
          )}
          <span className="ml-2 hidden text-sm sm:inline">
            {theme === "light" ? "Dark" : "Light"}
          </span>
        </button>
        <Link
          to="./"
          className="m-2 mr-4 flex items-center gap-1 rounded-lg bg-slate-800/50 p-2 text-base font-semibold transition-all duration-200 hover:bg-red-700 hover:text-slate-100 active:scale-95 dark:bg-slate-800 dark:hover:bg-red-600"
          onClick={() => logout()}
          title="Logout"
        >
          <span className="hidden sm:inline">Logout</span>
          <FiLogOut className="text-xl" />
        </Link>
      </div>
    </header>
  );
};

export default Header;