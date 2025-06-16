import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StarsCanvas from "../StarBackground";
import ShinyButton from "../components/magicui/shiny-button";
import { CoolMode } from "../components/magicui/cool-mode";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Login successful!");
        navigate("/todolist");
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else if (err.request) {
        setError("Network error. Please check if the server is running.");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 p-4 flex flex-col items-center justify-center w-full h-full min-h-screen">
      <StarsCanvas />
      <div className="relative z-20 w-full max-w-md p-8 m-4 rounded-xl bg-black/30 border backdrop-filter backdrop-blur-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 flex justify-center text-white">
          Sign In
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            className="border border-gray-500 px-3 py-2 rounded-lg w-full bg-black text-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            className="border border-gray-500 px-3 py-2 rounded-lg w-full bg-black text-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <CoolMode>
            <button type="submit" className="w-full" disabled={loading}>
              <ShinyButton text={loading ? "Signing In..." : "Sign In"} />
            </button>
          </CoolMode>
        </form>
        <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="underline text-blue-200 hover:text-blue-400"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
