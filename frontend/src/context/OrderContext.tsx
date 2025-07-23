import React, { createContext, useState, useCallback } from "react";

export type PlantCard = {
  id: number;
  name: string;
  image: string;
  description: string;
  light: string;
  price: number;
  isAddCard: false;
};

type OrderContextType = {
  order: PlantCard[];
  addToOrder: (plant: PlantCard) => void;
  confirmOrder: (id: number) => void;
  removeFromOrder: (id: number) => void;
};

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [order, setOrder] = useState<PlantCard[]>([]);

  const addToOrder = useCallback((plant: PlantCard) => {
    setOrder((prev) => [...prev, plant]);
  }, []);

  const confirmOrder = useCallback((id: number) => {
    setOrder((prev) => prev.filter((p) => p.id !== id));
    window.alert("Order confirmed!");
  }, []);

  const removeFromOrder = useCallback((id: number) => {
    setOrder((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <OrderContext.Provider
      value={{ order, addToOrder, confirmOrder, removeFromOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
