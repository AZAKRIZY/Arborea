import { useState, useEffect } from "react";
import plant from "../assets/plant.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const auth = localStorage.getItem("arborea_auth");
      if (auth) {
        try {
          const parsed = JSON.parse(auth);
          setUsername(parsed.user?.username || null);
        } catch {
          setUsername(null);
        }
      }
    } else {
      setUsername(null);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate("/signIn");
  };

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 bg-gray-100 rounded-xl shadow transition-all duration-700 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
      }`}
    >
      <Link to="/">
        <div className="flex items-center">
          <img src={plant} alt="Plant logo" className="h-15 w-14 mr-2" />
          <h1 className="text-xl font-bold">Arborea</h1>
        </div>
      </Link>
      <div className="flex items-center">
        {!isAuthenticated ? (
          <Link to="/SignIn">
            <button
              type="button"
              className="bg-green-600 mx-5 hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Sign In
            </button>
          </Link>
        ) : (
          <>
            <span className="mx-2 text-green-700 font-semibold">
              {username}
            </span>
            <button
              type="button"
              className="bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 font-bold shadow border border-red-200 mx-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
        {!isDashboard && (
          <Link to="/dashboard">
            <button
              type="button"
              className="bg-green-600 hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700 mx-2"
            >
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
