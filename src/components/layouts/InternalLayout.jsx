import React from "react";
import {useUser} from "../../hooks/UserContext.jsx";
import Loading from "./Loading.jsx";

const InternalLayout = () => {
  const InternalResultForm = React.lazy(() =>
    import("../forms/InternalResultForm")
  );
  const InternalStudent = React.lazy(() =>
    import("../queries/InternalStudent.jsx")
  );
  const { user } = useUser();
  return (
    <>
      {user.userType === "student" ? (
        <React.Suspense fallback={<Loading />}>
          <InternalStudent />
        </React.Suspense>
      ) : (
        <React.Suspense fallback={<Loading />}>
          <InternalResultForm />
        </React.Suspense>
      )}
    </>
  );
};

export default InternalLayout;
