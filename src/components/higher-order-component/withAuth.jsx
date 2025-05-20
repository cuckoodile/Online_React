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

    if (!cookies.token) {
      console.log("No token");

      return <Navigate to="/login" />;
    } else {
      if (!user) {
        console.log("Persists token", cookies.token);
        checkUserAPI(cookies.token)
          .then(async (res) => {
            console.log("pasok?");

            if (res?.ok) {
              console.log("check user data", res);
              login(res);
            } else {
              navigate("/login");
            }
          })
          .then(() => {
            console.log("HOC User data: ", user);
          });
      }
    }
    if (user) {
      console.log("HOC User data: ", user);
      return <WrappedComponent {...props} />;
    }

    return <h1>LOADING....</h1>;
  };

  return WithAuth;
};

export default withAuth;
