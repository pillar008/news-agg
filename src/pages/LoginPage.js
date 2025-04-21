import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css"; // Custom CSS file for additional styling

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
    <div className="container-fluid">
      <div className="row">
        {/* Left side content */}
        <div className="col-md-6 login-left">
          <div className="login-left-content">
            <h1>Welcome Back!</h1>
            <p>We are happy to have you back. Please login to continue.</p>
            <img
              src="https://colorlib.com/etc/lf/Login_v9/images/bg-01.jpg"
              alt="Background"
            />
          </div>
        </div>

        {/* Right side login form */}
        <div className="col-md-6 login-right d-flex justify-content-center align-items-center">
          <div className="login-form">
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleLogin}>
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
                <div className="alert alert-danger mt-3">{message}</div>
              )}
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Login
              </button>
            </form>
            <div className="text-center mt-3">
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </div>
            <div className="text-center mt-3">
              <Link to="#">Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
