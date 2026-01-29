import { Route } from "react-router-dom";
import SignIn from "../../container/UserAuth/SignIn";
import SignUp from "../../container/UserAuth/SignUp";
import { Fragment } from "react";
import ForgotPassword from "../../container/UserAuth/ForgotPassword";

const AuthRoutes = () => (
  <Fragment>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

  </Fragment>
);

export default AuthRoutes;
