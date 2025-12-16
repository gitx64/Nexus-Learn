import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const DEV_USER = {
  _id: "dev-user",
  name: "Dev User",
  role: "staff" | "student",
};

export const UserProvider = ({ children }) => {
  const isDevBypass = import.meta.env.VITE_DEV_BYPASS_AUTH === "true";

  const [user, setUser] = useState(() =>
    isDevBypass ? DEV_USER : null
  );

  const [paper, setPaper] = useState(null);
  const [paperList, setPaperList] = useState([]);
  const [notes, setNotes] = useState([]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        paper,
        setPaper,
        paperList,
        setPaperList,
        notes,
        setNotes,
        isDevBypass,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside <UserProvider>");
  }
  return ctx;
};
