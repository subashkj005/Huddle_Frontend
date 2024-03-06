import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../../redux/slices/logSlice";
import { Navigate } from "react-router-dom";
import { toast as hottoast } from "react-hot-toast";

function HandleError() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.logUser.user);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (user) {
      setUserRole(user.role);
      dispatch(loggedOut());
    }
    hottoast.error("To continue, please verify your identity 👨‍💻")
  }, [user, dispatch]);

  return (
    <Navigate to={userRole === "admin" ? "/adminAuth" : "/"} />
  );
}

export default HandleError;