import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    API.post("token/", { username, password })
      .then((response) => {
        const { access } = response.data;
        localStorage.setItem("token", access); // Store token in localStorage
        navigate("/"); // Redirect to the dashboard
      })
      .catch(() => {
        setError("Invalid username or password");
      });
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 shadow-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-primary mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
