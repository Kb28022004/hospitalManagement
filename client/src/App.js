import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Router>
        <Toaster position="top-right" />
        <AppRoutes />
      </Router>
    </>
  );
};

export default App;
