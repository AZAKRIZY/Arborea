import { useState, useEffect } from 'react';
import plant from "../assets/plant.png";
import { Link } from "react-router-dom";

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex items-center justify-between px-4 py-3 bg-gray-100 rounded-xl shadow transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
      <Link to="/">
        <div className="flex items-center">
          <img src={plant} alt="Plant logo" className="h-15 w-14 mr-2" />
          <h1 className="text-xl font-bold">Arborea</h1>
        </div>
      </Link>
      <Link to="/SignIn">
        <button
          type="button"
          className="bg-green-600 hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Sign In
        </button>
      </Link>
    </div>
  );
};

export default Nav;
