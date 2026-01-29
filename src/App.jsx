import { Routes } from "react-router-dom";
import "./App.css";

import AuthRoutes from "./auth/routes/AuthRoutes";

function App() {
  return <Routes>{AuthRoutes()}</Routes>;
}

export default App;
