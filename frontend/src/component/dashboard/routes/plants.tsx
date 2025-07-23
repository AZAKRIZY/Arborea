import React, { useState, useEffect, useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";
import type { PlantCard as OrderPlantCard } from "../../../context/OrderContext";
import { FavoritesContext } from "../../../context/FavoritesContext";

// Remove mock initialPlants and PlantCard type, use backend data
const CARDS_TO_SHOW = 3;

const cardClass =
  "flex flex-col items-center justify-center bg-white shadow-lg rounded-xl min-w-[180px] max-w-[180px] min-h-[220px] max-h-[220px] p-4 box-border cursor-pointer transition-transform hover:scale-105 relative";

type AddCard = { isAddCard: true };
type Card = OrderPlantCard | AddCard;

const Plants = () => {
  const [allPlants, setAllPlants] = useState<OrderPlantCard[]>([]); // all fetched from DB
  const [plants, setPlants] = useState<OrderPlantCard[]>([]); // user's selected plants
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [modalPlant, setModalPlant] = useState<OrderPlantCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const orderContext = useContext(OrderContext);
  const addToOrder = orderContext?.addToOrder;
  const favoritesContext = useContext(FavoritesContext);
  const favorites = favoritesContext?.favorites || [];
  const addToFavorites = favoritesContext?.addToFavorites;
  const removeFromFavorites = favoritesContext?.removeFromFavorites;

  // Fetch all plants from backend (allPlants)
  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/api.php?action=plants");
        if (!res.ok) throw new Error("Failed to fetch plants");
        const data = await res.json();
        setAllPlants(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  // Remove the handleDeletePlant function entirely

  // The add card is always the last card
  const totalCards = plants.length + 1;

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleNext = () => {
    setCarouselIndex((prev) =>
      Math.min(prev + 1, Math.max(0, totalCards - CARDS_TO_SHOW))
    );
  };
  const handleAddToOrder = (plant: OrderPlantCard) => {
    if (addToOrder) {
      addToOrder(plant);
    }
    setModalPlant(null);
  };

  // The carousel should only show plants in the user's plants state
  const visibleCards: Card[] = [
    ...plants,
    { isAddCard: true } as AddCard,
  ].slice(carouselIndex, carouselIndex + CARDS_TO_SHOW);

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-2xl font-bold mb-4">My Plants Dashboard</h2>
      {loading && <div className="text-green-700">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {/* Horizontal Carousel with Add Card */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="px-3 py-1 bg-green-200 rounded hover:bg-green-300 disabled:opacity-50"
            disabled={carouselIndex === 0}
          >
            &#8592;
          </button>
          <div className="flex gap-4">
            {visibleCards.map((card) =>
              card.isAddCard ? (
                <button
                  key="add-card"
                  onClick={() => setShowAddModal(true)}
                  className={
                    cardClass +
                    " border-2 border-dashed border-green-400 hover:bg-green-50 hover:border-green-600 transition-colors"
                  }
                  style={{
                    fontSize: "2.5rem",
                    color: "#16a34a",
                    cursor: "pointer",
                  }}
                  aria-label="Add Plant"
                >
                  <span className="text-5xl font-bold">+</span>
                  <span className="text-md font-semibold mt-2 text-green-700">
                    Add Plant
                  </span>
                </button>
              ) : (
                <div
                  key={card.id}
                  className={cardClass + " relative"}
                  onClick={() => setModalPlant(card)}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-24 h-24 object-cover rounded-lg mb-2"
                  />
                  <span className="text-md font-semibold text-center">
                    {card.name}
                  </span>
                  <span className="text-green-700 font-semibold mt-1">
                    ${card.price}
                  </span>
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-600 text-2xl bg-white/80 rounded-full p-1 shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (favorites.some((f) => f.id === card.id)) {
                        if (removeFromFavorites) removeFromFavorites(card.id);
                      } else {
                        if (addToFavorites) addToFavorites(card);
                      }
                    }}
                    aria-label={
                      favorites.some((f) => f.id === card.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {favorites.some((f) => f.id === card.id) ? "★" : "☆"}
                  </button>
                  <button
                    type="button"
                    className="absolute bottom-2 right-2 text-gray-500 hover:text-gray-700 text-xs bg-white/80 rounded px-2 py-1 shadow border border-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlants((prev) => prev.filter((p) => p.id !== card.id));
                    }}
                    aria-label="Remove from My Plants"
                  >
                    Remove
                  </button>
                </div>
              )
            )}
          </div>
          <button
            onClick={handleNext}
            className="px-3 py-1 bg-green-200 rounded hover:bg-green-300 disabled:opacity-50"
            disabled={carouselIndex >= totalCards - CARDS_TO_SHOW}
          >
            &#8594;
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Showing {carouselIndex + 1} -{" "}
          {Math.min(carouselIndex + CARDS_TO_SHOW, totalCards)} of {totalCards}
        </div>
      </div>
      {/* Modal for plant info */}
      {modalPlant && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 min-w-[320px] flex flex-col items-center relative">
            <button
              onClick={() => setModalPlant(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={modalPlant.image}
              alt={modalPlant.name}
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{modalPlant.name}</h3>
            <p className="mb-2 text-gray-700 text-center">
              {modalPlant.description}
            </p>
            <div className="mb-2 text-green-700 font-semibold">
              ☀️ {modalPlant.light}
            </div>
            <div className="mb-4 text-lg font-bold text-green-800">
              ${modalPlant.price}
            </div>
            <button
              onClick={() => handleAddToOrder(modalPlant)}
              className="mt-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold"
            >
              Add to Order
            </button>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 min-w-[320px] flex flex-col items-center relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Add a Plant</h3>
            <input
              type="text"
              placeholder="Search for a plant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 mb-4 w-full"
            />
            <div className="w-full max-h-60 overflow-y-auto">
              {allPlants
                .filter(
                  (plant) =>
                    plant.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) &&
                    !plants.some((p) => p.id === plant.id)
                )
                .map((plant) => (
                  <div
                    key={plant.id}
                    className="flex items-center justify-between p-2 hover:bg-green-100 rounded cursor-pointer"
                    onClick={() => {
                      setPlants((prev) => [...prev, plant]);
                      setShowAddModal(false);
                      setSearchTerm("");
                    }}
                  >
                    <span>{plant.name}</span>
                    <span className="text-green-700 font-bold">
                      ${plant.price}
                    </span>
                  </div>
                ))}
              {searchTerm &&
                allPlants.filter(
                  (plant) =>
                    plant.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) &&
                    !plants.some((p) => p.id === plant.id)
                ).length === 0 && (
                  <div className="text-gray-500 text-center">
                    No plant found.
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plants;
