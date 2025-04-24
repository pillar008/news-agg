import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WeatherDetails from "./components/WeatherDetails"; // ✅ Import the component
import Translator from "./components/Translator";

function App() {
  return (
    <Router>
      <Translator></Translator>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/weather-details" element={<WeatherDetails />} />{" "}
        {/* ✅ Add this line */}
        <Route path="/weather-details" element={<WeatherDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
