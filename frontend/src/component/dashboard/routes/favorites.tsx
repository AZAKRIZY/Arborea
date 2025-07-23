import React, { useContext } from "react";
import { FavoritesContext } from "../../../context/FavoritesContext";

const Favorites = () => {
  const favoritesContext = useContext(FavoritesContext);
  const favorites = favoritesContext?.favorites || [];
  const removeFromFavorites = favoritesContext?.removeFromFavorites;

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 mx-auto mt-8 flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-yellow-700 text-center">
        Your Favorite Plants
      </h2>
      {favorites.length === 0 ? (
        <div className="text-gray-500 text-center">No favorite plants yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {favorites.map((plant) => (
            <div
              key={plant.id}
              className="flex flex-col items-center bg-yellow-50 rounded-xl shadow p-4 relative"
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="w-24 h-24 object-cover rounded-lg mb-2 border-2 border-yellow-200"
              />
              <div className="text-lg font-semibold mb-1 text-yellow-900">
                {plant.name}
              </div>
              <div className="text-gray-600 text-sm mb-2 text-center">
                {plant.description}
              </div>
              <div className="text-yellow-700 font-bold text-lg mb-3">
                ${plant.price}
              </div>
              <button
                className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700 font-semibold shadow mt-2"
                onClick={() =>
                  removeFromFavorites && removeFromFavorites(plant.id)
                }
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
