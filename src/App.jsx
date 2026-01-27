import { Router } from "react-router-dom";
import "./App.css";

import AuthRoutes from "./auth/routes/authRoutes";

function App() {
  return (
    <>
      <Router>
        <AuthRoutes />
      </Router>
    </>
  );
}

export default App;
