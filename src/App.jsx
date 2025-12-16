import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

// context
import { UserProvider } from "./hooks/UserContext.jsx";
import { ThemeProvider } from "./hooks/ThemeContext.jsx";

// components
import Loading from "./components/layouts/Loading.jsx";
// layouts
import AppLayout from "./components/layouts/AppLayout.jsx";
import Layout from "./components/layouts/Layout.jsx";
import Dash from "./components/layouts/Dash.jsx";
import ErrorElement from "./components/layouts/ErrorElement.jsx";
import AttendanceLayout from "./components/layouts/AttendanceLayout.jsx";
import InternalLayout from "./components/layouts/InternalLayout.jsx";
import RegisterLayout from "./components/layouts/RegisterLayout.jsx";

// queries
import Paper from "./components/queries/Paper.jsx";
import Notes from "./components/queries/Notes.jsx";
import StudentsList from "./components/queries/StudentsList.jsx";
import Profile from "./components/queries/Profile.jsx";

// forms
import StaffForm from "./components/forms/StaffForm.jsx";
import StudentForm from "./components/forms/StudentForm.jsx";
import NotesForm from "./components/forms/NotesForm.jsx";
import TimeScheduleForm from "./components/forms/TimeScheduleForm.jsx";
import Login from "./components/forms/Login.jsx";

// lazy loading user specific components
const StaffApproval = lazy(() =>
  import("./components/queries/StaffApproval.jsx")
);
const PaperForm = lazy(() => import("./components/forms/PaperForm.jsx"));
const JoinPaper = lazy(() => import("./components/forms/JoinPaper.jsx"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />} errorElement={<ErrorElement />}>
        <Route index element={<Login />} /> //make it to Login
        <Route path="/register" element={<RegisterLayout />}>
          <Route path="reg_staff" element={<StaffForm />} />
          <Route path="reg_student" element={<StudentForm />} />
        </Route>
        <Route
          path="/dash"
          element={<Layout />}
          errorElement={<ErrorElement />}
        >
          <Route index element={<Dash />} />
          <Route path="paper" element={<Paper />} />
          <Route path="paper/:paper" element={<Notes />} />
          <Route path="paper/:paper/add" element={<NotesForm />} />
          <Route path="paper/:paper/:note/edit" element={<NotesForm />} />
          <Route path="paper/:paper/students" element={<StudentsList />} />
          <Route path="attendance" element={<AttendanceLayout />} />
          <Route path="internal" element={<InternalLayout />} />
          <Route path="time_schedule" element={<TimeScheduleForm />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="approve_staff"
            element={
              <Suspense fallback={<Loading />}>
                <StaffApproval />
              </Suspense>
            }
          />
          <Route
            path="add_paper"
            element={
              <Suspense fallback={<Loading />}>
                <PaperForm />
              </Suspense>
            }
          />
          <Route
            path="join_paper"
            element={
              <Suspense fallback={<Loading />}>
                <JoinPaper />
              </Suspense>
            }
          />
        </Route>
      </Route>
    )
  );

  return (
    <ThemeProvider>
      <UserProvider>
        <RouterProvider router={router} />
        <ToastContainer
          className="toast"
          toastClassName="toast-rounded"
          bodyClassName="toast-body"
          position="bottom-right"
          autoClose={5000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          hideProgressBar={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
