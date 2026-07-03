import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { apiRequest } from "../../services/api";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Fraunces', serif", fontWeight: 600 };

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await apiRequest.post("/auth/login/", {
        username,
        password,
      });
      updateUser(res.data);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.msg || "Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E7] flex flex-col">
      <header className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <h1 className="text-2xl text-[#2B2420]" style={serif}>
              Recipe<span className="text-[#C1440E]">Hub</span>
            </h1>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-[#FFFBF3] rounded-sm border border-[#E4D9C5] shadow-sm w-full max-w-md">
          <div className="p-8">
            <h2
              className="text-3xl text-[#2B2420] mb-6 text-center"
              style={serif}
            >
              Sign In
            </h2>

            {error && (
              <div className="bg-[#C1440E]/5 border border-[#C1440E]/20 text-[#C1440E] px-4 py-3 rounded-sm mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#2B2420] mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-[#2B2420]/35" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] transition-all outline-none text-[#2B2420] placeholder-[#2B2420]/35"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#2B2420] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-[#2B2420]/35" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-[#FAF3E7] border border-[#E4D9C5] rounded-sm focus:ring-2 focus:ring-[#C1440E]/40 focus:border-[#C1440E] transition-all outline-none text-[#2B2420] placeholder-[#2B2420]/35"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#C1440E] hover:bg-[#a3390b] text-[#FAF3E7] py-3 rounded-sm font-medium shadow-[3px_3px_0_0_#2B2420] transition-all hover:translate-x-0.5 hover:translate-y-0.5 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                style={mono}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-[#2B2420]/60">Don't have an account? </span>
              <Link
                to="/register"
                className="text-[#C1440E] hover:text-[#a3390b] font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
