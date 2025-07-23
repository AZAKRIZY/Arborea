import React, { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";

const Order = () => {
  const orderContext = useContext(OrderContext);
  const order = orderContext?.order || [];
  const confirmOrder = orderContext?.confirmOrder;
  const removeFromOrder = orderContext?.removeFromOrder;

  const total = order.reduce((sum, plant) => sum + plant.price, 0);

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 mx-auto mt-0 md:mt-0 -translate-y-8 flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">
        Your Order
      </h2>
      {order.length === 0 ? (
        <div className="text-gray-500 text-center">
          No plants in your order yet.
        </div>
      ) : (
        <>
          <div
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: "420px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {order.map((plant) => (
                <div
                  key={plant.id}
                  className="flex flex-col items-center bg-green-50 rounded-xl shadow p-4 relative"
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-24 h-24 object-cover rounded-lg mb-2 border-2 border-green-200"
                  />
                  <div className="text-lg font-semibold mb-1 text-green-900">
                    {plant.name}
                  </div>
                  <div className="text-gray-600 text-sm mb-2 text-center">
                    {plant.description}
                  </div>
                  <div className="text-green-700 font-bold text-lg mb-3">
                    ${plant.price}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 font-semibold shadow"
                      onClick={() => confirmOrder && confirmOrder(plant.id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 font-semibold shadow border border-red-200"
                      onClick={() =>
                        removeFromOrder && removeFromOrder(plant.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end items-center mt-4 sticky bottom-0 bg-white pt-4">
            <span className="text-xl font-bold text-green-800 mr-2">
              Total:
            </span>
            <span className="text-2xl font-extrabold text-green-900">
              ${total}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
