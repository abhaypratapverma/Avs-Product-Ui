import { Route } from "react-router-dom";
import SignIn from "../../container/UserAuth/SignIn";
import SignUp from "../../container/UserAuth/SignUp";
import { Fragment } from "react";
import ForgotPassword from "../../container/UserAuth/ForgotPassword";
import VerifyUser from "../../container/UserAuth/VerifyUser";

const AuthRoutes = () => (
  <Fragment>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/verify-user" element={<VerifyUser />} />

  </Fragment>
);

export default AuthRoutes;
