import { Route } from "react-router-dom";
import SignIn from "../../container/UserAuth/SignIn";
import SignUp from "../../container/UserAuth/SignUp";

const AuthRoutes = () => (
  <>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
  </>
);

export default AuthRoutes;
