"use client";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useCart();

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return (price - (price * discountPercentage) / 100).toFixed(2);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the Add button
    addToCart(product);
  };

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage
  );

  return (
    <div
      className="border rounded-lg overflow-hidden bg-white cursor-pointer hover:shadow-md transition-shadow transform hover:-translate-y-1 transition-transform duration-200"
      onClick={onClick}
    >
      <div className="h-40 overflow-hidden">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-bold">{product.title}</h3>
        <p className="text-sm text-gray-600">{product.brand}</p>
        <div className="mt-1">
          <p className="text-xs line-through">₹{product.price.toFixed(2)}</p>
          <p className="font-bold">₹{discountedPrice}</p>
          <p className="text-xs text-pink-500">
            {product.discountPercentage.toFixed(2)}% OFF
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-2 px-4 py-1 bg-white text-pink-500 border border-pink-500 rounded-full text-sm hover:bg-pink-50 float-right transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
