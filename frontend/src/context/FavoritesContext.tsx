import React, { createContext, useState, useCallback } from "react";
import type { PlantCard } from "./OrderContext";

type FavoritesContextType = {
  favorites: PlantCard[];
  addToFavorites: (plant: PlantCard) => void;
  removeFromFavorites: (id: number) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<PlantCard[]>([]);

  const addToFavorites = useCallback((plant: PlantCard) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === plant.id) ? prev : [...prev, plant]
    );
  }, []);

  const removeFromFavorites = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
