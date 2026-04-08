import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import AuthRoutes from "../src/auth/routes/authRoutes";
import Home from "./container/pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      {AuthRoutes()}
    </Routes>
  );
}

export default App;
