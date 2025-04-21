import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === username);
    if (user && user.password === password) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      setMessage("Invalid username or password!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="body login-page">
      <div className="form auth-container">
        <form onSubmit={handleLogin}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">LOGIN</button>
          {message && <p className="message">{message}</p>}
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
