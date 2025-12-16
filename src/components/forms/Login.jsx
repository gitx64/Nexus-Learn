import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { DEV_USER, useUser } from "../../hooks/UserContext.jsx";
import { useTheme } from "../../hooks/ThemeContext.jsx";
import axios from "../../config/api/axios";
import { PiStudentThin, PiUserThin, PiSpinnerGapBold } from "react-icons/pi";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import CircleDesign from "../layouts/CircleDesign.jsx";
import ErrorStrip from "../ErrorStrip.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const [message, setMessage] = useState("");

  const slowLoadingIndicator = () => {
    setTimeout(() => {
      setMessage(
        "NOTE: Web Services on the free instance type are automatically spun down after 15 minutes of inactivity. When a new request for a free service comes in, Render spins it up again so it can process the request. This will cause a delay in the response of the first request after a period of inactivity while the instance spins up."
      );
    }, 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (import.meta.env.VITE_DEV_BYPASS_AUTH === "true") {
      setUser(DEV_USER);
      navigate("/dash");
      return;
    }
    if (userType === "") {
      setError({
        response: {
          data: "Select User Type",
        },
      });
    } else {
      setButtonText("Loading...");
      slowLoadingIndicator();
      try {
        const response = await axios.post("/auth/login/" + userType, {
          username,
          password,
        });
        await setUser({ ...response.data, userType });
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ ...response.data, userType })
        );
      } catch (err) {
        setError(err);
        setButtonText("Login");
      }
    }
  };

  useEffect(() => {
    if ("userDetails" in localStorage) {
      setUser(JSON.parse(localStorage.getItem("userDetails")));
    }
    setUserType("");
    setMessage("");
  }, [setUserType, setMessage, setUser]);

  return (
    <>
      {!user?._id ? (
        <main className="relative z-0 flex h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-400 to-slate-300 text-slate-950 dark:from-slate-800 dark:to-slate-950 dark:text-slate-300">
          {message && !error && (
            <header className="absolute top-0 w-full bg-blue-500/50 p-2 text-xs dark:bg-slate-700/50 lg:text-base">
              {message}
            </header>
          )}
          <button
            onClick={toggleTheme}
            className="group absolute right-4 top-4 rounded-full bg-slate-100/90 p-3 text-2xl shadow-lg transition-all duration-200 hover:scale-110 hover:bg-slate-200 active:scale-95 dark:bg-slate-800/90 dark:hover:bg-slate-700"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <FiMoon className="animate-fadeIn" />
            ) : (
              <FiSun className="animate-fadeIn" />
            )}
          </button>
          <CircleDesign />

          <section className="z-2 mb-4 flex items-center justify-center duration-200">
            <img
              src="/nexusLearn.png"
              alt="Nexus-Learn Logo"
              className="h-40 w-auto object-contain md:h-48 lg:h-56"
            />
          </section>

          <section className="z-0 w-[65%] justify-self-center rounded-lg bg-slate-100 opacity-90 shadow-2xl transition-all duration-200 hover:opacity-100 hover:shadow-blue-500/20 focus-within:opacity-100 dark:bg-[#060913] dark:shadow-blue-500/10 sm:w-[min(50%,360px)] md:w-[min(40%,360px)] xl:w-[min(23%,360px)]">
            <form
              className="tracking-wide placeholder:text-slate-400 dark:placeholder:text-slate-500"
              onSubmit={(e) => handleLogin(e)}
            >
              <section className="flex flex-col items-center justify-start">
                <div className="flex w-full text-lg">
                  <label
                    className="radio relative flex w-1/2 cursor-pointer flex-col items-center rounded-tl-lg p-4 transition-all duration-200 hover:bg-blue-100 dark:border-l-[1.5px] dark:border-t-[1.5px] dark:border-solid dark:border-blue-600 dark:hover:bg-slate-800"
                    htmlFor="staff"
                  >
                    Staff
                    <input
                      className="absolute opacity-0"
                      type="radio"
                      value="staff"
                      id="staff"
                      name="userType"
                      onClick={() => setUserType("staff")}
                    />
                  </label>
                  <label
                    className="radio relative flex w-1/2 cursor-pointer flex-col items-center rounded-tr-lg p-4 transition-all duration-200 hover:bg-blue-100 dark:border-r-[1.5px] dark:border-t-[1.5px] dark:border-solid dark:border-blue-600 dark:hover:bg-slate-800"
                    htmlFor="student"
                  >
                    Student
                    <input
                      className="absolute opacity-0"
                      type="radio"
                      value="student"
                      id="student"
                      name="userType"
                      onClick={() => setUserType("student")}
                    />
                  </label>
                </div>
                <div className="flex w-full justify-center p-1 pt-0 text-8xl transition-all duration-200 dark:border-x-[1.5px] dark:border-solid dark:border-blue-600 md:p-3 md:pt-0">
                  {userType === "student" ? (
                    <PiStudentThin className="animate-slide rounded-full border-2 border-slate-900 p-1 font-light dark:border-slate-300 md:p-2" />
                  ) : userType === "staff" ? (
                    <PiUserThin className="animate-slide rounded-full border-2 border-slate-900 p-1 font-light dark:border-slate-300 md:p-2" />
                  ) : (
                    <FaUniversity className="animate-fadeIn rounded-lg border-2 border-slate-900 p-1 font-light dark:border-slate-300 md:p-2" />
                  )}
                </div>
              </section>
              <section className="rounded-b-lg px-4 pb-4 dark:border-x-[1.5px] dark:border-b-[1.5px] dark:border-solid dark:border-blue-600">
                {userType ? (
                  <>
                    <input
                      className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 bg-white p-1 pl-2 outline-none selection:border-slate-200 focus:border-blue-600 dark:border-slate-600 dark:bg-slate-900 dark:caret-inherit dark:focus:border-blue-400 dark:active:border-blue-400"
                      placeholder="username"
                      id="username"
                      type="text"
                      required
                      autoComplete="off"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 bg-white p-1 pl-2 outline-none selection:border-slate-200 focus:border-blue-600 dark:border-slate-600 dark:bg-slate-900 dark:caret-inherit dark:focus:border-blue-400 dark:active:border-blue-400"
                      placeholder="password"
                      id="password"
                      type="password"
                      required
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="mb-1 flex h-10 w-full items-center justify-center gap-1 rounded-md border-[1.5px] border-solid border-blue-600 bg-slate-800 p-1 font-bold tracking-wide text-slate-200 transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 active:scale-95 disabled:cursor-wait disabled:opacity-50 dark:border-blue-400 dark:bg-blue-600 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus:bg-slate-900 lg:mb-2"
                      type="submit"
                      value="Login"
                      disabled={buttonText !== "Login"}
                      onClick={(e) => handleLogin(e)}
                    >
                      {!(buttonText === "Login") && (
                        <PiSpinnerGapBold className="animate-spin" />
                      )}
                      {buttonText}
                    </button>
                  </>
                ) : (
                  <p className="my-12 w-full rounded bg-blue-200 p-4 text-center duration-200 dark:bg-blue-950/90">
                    Select User Type
                  </p>
                )}
                {error ? <ErrorStrip error={error} /> : ""}
                <p className="inline text-slate-600 dark:text-slate-400">
                  Click to{" "}
                </p>
                <button
                  type="button"
                  className="font-semibold text-blue-600 decoration-2 hover:underline focus:underline dark:text-blue-400"
                  onClick={() => navigate("./register/reg_student")}
                >
                  Register
                </button>
              </section>
            </form>
          </section>
        </main>
      ) : (
        <Navigate to="./dash" />
      )}
    </>
  );
};

export default Login;