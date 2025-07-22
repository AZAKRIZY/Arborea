import { useState, useEffect } from "react";
import background from "../assets/herobackground.jpg";

const Home = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative w-full min-h-[90vh] overflow-hidden rounded-t-xl"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 via-green-700/40 to-transparent z-0 rounded-t-xl" />
      <div
        className={`relative flex items-center justify-start h-[90vh] pl-16 text-5xl transition-all duration-700 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-white font-mona font-bold drop-shadow-lg bg-black/30 rounded-xl px-8 py-6">
          <span>Welcome to Arborea, </span>
          <br />
          <span>where nature and technology grow together!</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
