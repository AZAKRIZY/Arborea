import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const res = await fetch("/api/api.php?action=user_signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Auto-login after sign-up
        const loginRes = await fetch("/api/api.php?action=user_login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: name,
            password,
          }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.success) {
          localStorage.setItem(
            "arborea_auth",
            JSON.stringify({
              user: loginData.user,
              role: "client",
              token: loginData.token,
            })
          );
          navigate("/dashboard/plants");
        } else {
          setSuccess("Sign up successful! Please sign in.");
          setTimeout(() => navigate("/signIn"), 1200);
        }
      } else {
        setError(data.error || "Sign up failed");
      }
    } catch {
      setError("Network or server error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-green-200"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-green-900 drop-shadow">
          Sign Up
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded"
          required
        />
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        {success && (
          <div className="text-green-700 mb-4 text-center">{success}</div>
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-800 font-bold shadow-lg transition-all"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
