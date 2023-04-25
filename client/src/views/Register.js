import React, { useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/authentication/useAuthentication";
import { Navigate } from "react-router-dom";
import { RouteBase } from "../constants/routeUrl";

const Register = () => {
  //! State
  const auth = useAuth();
  const { isLogged, userInfo } = auth;

  //! Function

  //! Render
  if (isLogged) {
    if (userInfo.role === 1) {
      return <Navigate to={RouteBase.Product} />;
    } else {
      return <Navigate to={RouteBase.Cart} />;
    }
  }
  return (
    <>
      <Header />
      <RegisterForm />
      <Footer />
    </>
  );
};

export default Register;
