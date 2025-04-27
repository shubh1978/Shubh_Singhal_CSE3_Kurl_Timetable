import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRouteSuper = ({ children, element }) => {
  const navigate = useNavigate();
  const { userData, isLogin } = useSelector((state) => state.userInfo);
  const role = userData?.authentication?.principal?.role;

  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  if (role == "SUPER_ADMIN" || role == "SCHOOL_ADMIN") {
    return element;
  } else <Navigate to="/main" />;
};
export default PrivateRouteSuper;
