import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { checkUserAPI } from "../../utils/APIs/userApi";
import { AuthContext } from "../../utils/contexts/AuthContext";

// Authentication HOC
const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);

    // Example: Check authentication status (this can be based on context, local storage, etc.)
    const token = cookies.token; // Example: Check token in localStorage

    if (!token) {
      console.log("No token");

      return <Navigate to="/login" />;
    } else {
      if (!user) {
        console.log("Persists token", token);
        checkUserAPI(token).then((res) => {
          if (res?.ok) {
            console.log("check user data", res);
            login(res);
          } else {
            navigate("/login");
          }
        });
      }
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
