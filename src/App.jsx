import { Routes, Route } from "react-router-dom";
import "./App.css";

import AuthRoutes from "./auth/routes/AuthRoutes";
import Home from "./container/pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {AuthRoutes()}
    </Routes>
  );
}

export default App;
