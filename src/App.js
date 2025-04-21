import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={currentUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
