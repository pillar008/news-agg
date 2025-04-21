import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.username === username)) {
      setMessage("Username already exists!");
      return;
    }
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Account created successfully!");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="body login-page">
      <div className="form auth-container">
        <form onSubmit={handleSignup}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">SIGN UP</button>
          {message && <p className="message">{message}</p>}
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default SignupPage;
