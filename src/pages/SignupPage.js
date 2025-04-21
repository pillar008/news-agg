import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css"; // Custom CSS file for additional styling

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
    <div className="container-fluid">
      <div className="row">
        {/* Left side content */}
        <div className="col-md-6 login-left">
          <div className="login-left-content">
            <h1>Welcome to Our App!</h1>
            <p>Sign up to start using the app. It's free and easy!</p>
            <img
              src="https://colorlib.com/etc/lf/Login_v9/images/bg-01.jpg"
              alt="Background"
            />
          </div>
        </div>

        {/* Right side signup form */}
        <div className="col-md-6 login-right d-flex justify-content-center align-items-center">
          <div className="login-form">
            <h3 className="text-center mb-4">Sign Up</h3>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {message && (
                <div className="alert alert-info mt-3">{message}</div>
              )}
              <button type="submit" className="btn btn-success w-100 mt-3">
                Sign Up
              </button>
            </form>
            <div className="text-center mt-3">
              <Link to="/login">Already have an account? Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
