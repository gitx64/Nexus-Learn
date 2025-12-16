import React, { useContext } from "react";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";
import  { useUser } from "../../hooks/UserContext.jsx";

import { useTheme } from "../../hooks/ThemeContext.jsx";
useTheme
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
    <header className="absolute top-0 flex w-full justify-between bg-slate-950 text-slate-50 dark:bg-slate-950">
      <Link
        to="/dash"
        className="ml-4 flex items-center gap-2 px-3 py-1"
      >
        {/* Option 1: Use your custom logo image */}
        <img 
          src="/nexusLearn.png" 
          alt="Nexus-Learn" 
          className="h-10 w-auto sm:h-12 object-contain"
        />
        
        {/* Option 2: Keep the text logo (comment out if using image above) */}
        {/* <FaUniversity className="m-1 text-2xl sm:text-3xl" />
        <h1 className="m-0 pr-1 font-spectral text-2xl sm:text-3xl font-semibold text-slate-50 decoration-blue-500 decoration-[3px] underline-offset-[3px] hover:underline">
          Nexus-
          <span className="inline-block h-4 w-4 rounded-full bg-blue-500 dark:bg-blue-500 sm:h-[1.15rem] sm:w-[1.15rem]"></span>
          Learn
        </h1> */}
      </Link>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="text-md m-2 flex items-center rounded-md p-[7px] font-semibold duration-200 hover:bg-blue-700 hover:text-slate-100"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <FiMoon className="text-xl" /> : <FiSun className="text-xl" />}
        </button>
        <Link
          to="./"
          className="text-md m-2 mr-4 flex items-center rounded-md p-[7px] font-semibold duration-200 hover:bg-red-700 hover:text-slate-100"
          onClick={() => logout()}
        >
          <p>&nbsp;Logout&nbsp;&nbsp;</p>
          <FiLogOut className="text-xl" />
        </Link>
      </div>
    </header>
  );
};

export default Header;