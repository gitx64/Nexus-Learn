import { useContext, lazy, Suspense } from "react";
import  { useUser } from "../../hooks/UserContext.jsx";
import Loading from "./Loading.jsx";

const AttendanceLayout = () => {
  const AttendanceStudent = lazy(() => import("../queries/AttendanceStudent.jsx"));
  const Attendance = lazy(() => import("../queries/Attendance.jsx"));
  const { user } = useUser()
  return (
    <>
      {user.userType === "student" ? (
        <Suspense fallback={<Loading />}>
          <AttendanceStudent />
        </Suspense>
      ) : (
        <Suspense fallback={<Loading />}>
          <Attendance />
        </Suspense>
      )}
    </>
  );
};

export default AttendanceLayout;
