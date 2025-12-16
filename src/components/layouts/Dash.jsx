import { Link } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { PiBooks, PiUser, PiStudent } from "react-icons/pi";
import { useContext, useEffect } from "react";
import { useUser } from "../../hooks/UserContext.jsx";
import axios from "../../config/api/axios.js";

const Dash = () => {
  const { user, setPaperList } = useUser();

  useEffect(() => {
    const getPapers = async () => {
      const response = await axios.get(`paper/${user.userType}/${user._id}`);
      setPaperList(response.data);
    };
    getPapers();
  }, [setPaperList, user]);

  return (
    <main className="self-center">
      <h2 className="m-6 font-spectral mx-auto text-center text-6xl font-bold text-blue-950 dark:text-blue-300">
        Nexus-Learn
      </h2>
      <div className="grid grid-cols-1 place-content-center gap-3 px-1 py-4 lg:grid-cols-2 lg:gap-4 lg:px-8 xl:grid-cols-3">
        <Link
          className="flex gap-2 rounded-lg bg-blue-100 p-6 text-base text-blue-950 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-100 dark:hover:bg-blue-900/70 duration-200 lg:text-lg shadow-sm hover:shadow-md"
          to={"./paper"}
        >
          <GiBookshelf className="text-[2.5rem] lg:text-[4rem]" />
          <div className="font-semibold">
            Papers
            <p className="text-sm font-normal text-blue-800 dark:text-blue-300 lg:text-base">
              View Papers and Notes
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-blue-100 p-6 text-base text-blue-950 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-100 dark:hover:bg-blue-900/70 duration-200 lg:text-lg shadow-sm hover:shadow-md"
          to={"./attendance"}
        >
          <IoCalendarOutline className="text-[2.5rem] lg:text-[4rem]" />
          <div className="font-semibold">
            Attendance
            <p className="text-sm font-normal text-blue-800 dark:text-blue-300 lg:text-base">
              Add or Edit Attendance
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-blue-100 p-6 text-base text-blue-950 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-100 dark:hover:bg-blue-900/70 duration-200 lg:text-lg shadow-sm hover:shadow-md"
          to={"./internal"}
        >
          <HiOutlineDocumentReport className="text-[2.5rem] lg:text-[4rem]" />
          <div className="font-semibold">
            Internal Mark
            <p className="text-sm font-normal text-blue-800 dark:text-blue-300 lg:text-base">
              View or Edit Internal Marks
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-blue-100 p-6 text-base text-blue-950 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-100 dark:hover:bg-blue-900/70 duration-200 lg:text-lg shadow-sm hover:shadow-md"
          to={"./time_schedule"}
        >
          <AiOutlineSchedule className="text-[2.5rem] lg:text-[4rem]" />
          <div className="font-semibold">
            Time Schedule
            <p className="text-sm font-normal text-blue-800 dark:text-blue-300 lg:text-base">
              View or Edit Time Schedule
            </p>
          </div>
        </Link>

        {user.role === "HOD" && (
          <>
            <Link
              className="flex gap-2 rounded-lg bg-blue-100 p-6 text-base text-blue-950 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-100 dark:hover:bg-blue-900/70 duration-200 lg:text-lg shadow-sm hover:shadow-md"
              to={"./add_paper"}
            >
              <BiBookAdd className="text-[2.5rem] lg:text-[4rem]" />
              <div className="font-semibold">
                Add Paper
                <p className="text-sm font-normal text-blue-800 dark:text-blue-300 lg:text-base">
                  Add a New Paper
                </p>
              </div>
            </Link>

            <Link
              className="flex gap-2 rounded-lg bg-blue-100 p-6 text-base text-blue-950 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-100 dark:hover:bg-blue-900/70 duration-200 lg:text-lg shadow-sm hover:shadow-md"
              to={"./approve_staff"}
            >
              <RiUserAddLine className="text-[2.5rem] lg:text-[4rem]" />
              <div className="font-semibold">
                Approve Staff
                <p className="text-sm font-normal text-blue-800 dark:text-blue-300 lg:text-base">
                  Approve registered staff(s)
                </p>
              </div>
            </Link>
          </>
        )}
        {user.role === "student" && (
          <Link
            className="flex gap-2 rounded-lg bg-blue-100 p-6 text-base text-blue-950 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-100 dark:hover:bg-blue-900/70 duration-200 lg:text-lg shadow-sm hover:shadow-md"
            to={"./join_paper"}
          >
            <PiBooks className="text-[2.5rem] lg:text-[4rem]" />
            <div className="font-semibold">
              Manage Paper
              <p className="text-sm font-normal text-blue-800 dark:text-blue-300 lg:text-base">
                Join or Leave Paper
              </p>
            </div>
          </Link>
        )}
        <Link
          className="flex gap-2 rounded-lg bg-blue-100 p-6 text-base text-blue-950 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-100 dark:hover:bg-blue-900/70 duration-200 lg:text-lg shadow-sm hover:shadow-md"
          to={"./profile"}
        >
          {user.role === "student" ? (
            <PiStudent className="text-[2.5rem] lg:text-[4rem]" />
          ) : (
            <PiUser className="text-[2.5rem] lg:text-[4rem]" />
          )}
          <div className="font-semibold">
            Profile
            <p className="text-sm font-normal text-blue-800 dark:text-blue-300 lg:text-base">
              View or Edit Profile
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Dash;