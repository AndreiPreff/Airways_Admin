import React from "react";
import AuthenticationRoutes from "./auth.routes";
import Header from "../header";


const SignPage: React.FC = () => {
  return (
    <><Header isAdmin={true} />
      <AuthenticationRoutes />
    </>
  );
  
};

export default SignPage;