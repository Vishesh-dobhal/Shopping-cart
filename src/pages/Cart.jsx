"use client";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, updateQuantity, getTotalPrice } = useCart();

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return (price - (price * discountPercentage) / 100).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-pink-100 p-4 flex items-center rounded-lg">
        <Link to="/" className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-center flex-grow">Cart</h1>
      </div>

      <div className="mt-4 bg-white rounded-lg p-4">
        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link
              to="/"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item) => {
              const discountedPrice = calculateDiscountedPrice(
                item.price,
                item.discountPercentage
              );

              return (
                <div key={item.id} className="flex border-b py-4 items-center">
                  <div className="w-20 h-20 mr-4">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                    <p className="text-xs line-through">
                      ₹{item.price.toFixed(2)}
                    </p>
                    <p className="font-bold">₹{discountedPrice}</p>
                    <p className="text-xs text-pink-500">
                      {item.discountPercentage.toFixed(2)}% OFF
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="mx-2 w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <p className="font-bold">Amount Price</p>
                <p className="text-2xl font-bold">
                  ₹{getTotalPrice().toFixed(2)}
                </p>
              </div>
              <button className="w-full bg-pink-500 text-white py-3 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                Check Out
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v4"></path>
                  <path d="M12 16h.01"></path>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
