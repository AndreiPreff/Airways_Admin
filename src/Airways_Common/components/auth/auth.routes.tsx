import React, { FC, PropsWithChildren, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({
  element: Element,
}) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};

const SignInPage = React.lazy(() => import("./signIn.page"));
const SignUpPage = React.lazy(() => import("./signUp.page"));
const ResetPasswordPage = React.lazy(() => import("./resetPassword.page"));


const AuthenticationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<Suspended element={SignInPage} />} />
      <Route path="/sign-up" element={<Suspended element={SignUpPage} />} />
      <Route path="/reset-password" element={<Suspended element={ResetPasswordPage} />} />
     
    </Routes>
  );
};

export default AuthenticationRoutes;