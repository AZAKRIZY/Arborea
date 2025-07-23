import { useState, useEffect } from "react";
import plant from "../assets/plant.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem("arborea_auth");
    if (auth) {
      try {
        const parsed = JSON.parse(auth);
        setUser(parsed.user || null);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("arborea_auth");
    setUser(null);
    navigate("/signIn");
  };

  // Hide dashboard button if already on a dashboard route
  const isOnDashboard = location.pathname.startsWith("/dashboard");

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
      <div>
        {!user ? (
          <Link to="/SignIn">
            <button
              type="button"
              className="bg-green-600 mx-5 hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Sign In
            </button>
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <span className="font-semibold text-green-800">
              {user.username}
            </span>
            <button
              type="button"
              className="bg-red-200 text-red-700 px-3 py-2 rounded hover:bg-red-300 font-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
        {!isOnDashboard && (
          <Link to="/dashboard">
            <button
              type="button"
              className="bg-green-600 hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700"
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
