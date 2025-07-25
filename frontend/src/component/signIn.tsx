import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Clear form fields when switching roles
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError(null);
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const endpoint =
      role === "admin"
        ? "/api/api.php?action=admin_login"
        : "/api/api.php?action=user_login";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email, // backend expects 'username'
          password,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        console.log("Login success, redirecting...");
        localStorage.setItem(
          "arborea_auth",
          JSON.stringify({
            user: data.user || data.admin,
            role,
            token: data.token,
          })
        );
        navigate("/dashboard/plants");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Network or server error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-100 to-green-300">
      <form
        onSubmit={handleSubmit}
        className={`bg-white/60 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-green-200 transition-all duration-700 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-green-900 drop-shadow">
          Sign In
        </h2>
        <div className="mb-6 flex justify-center gap-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              role === "client" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("client")}
          >
            Client
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              role === "admin" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>
        {role === "admin" ? (
          <input
            type="text"
            placeholder="Admin ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
        ) : (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded"
          required
        />
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-800 font-bold shadow-lg transition-all"
        >
          Sign In
        </button>
        {role === "client" && (
          <button
            type="button"
            className="w-full mt-2 bg-green-100 text-green-700 py-2 rounded-xl hover:bg-green-200 font-bold shadow transition-all"
            onClick={() => navigate("/signUp")}
          >
            Don't have an account? Sign Up
          </button>
        )}
      </form>
    </div>
  );
};

export default SignIn;
