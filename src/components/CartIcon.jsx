import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <Link to="/cart" className="relative">
      <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs absolute -top-2 -right-2">
        {cartCount}
      </div>
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
        <circle cx="8" cy="21" r="1"></circle>
        <circle cx="19" cy="21" r="1"></circle>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
      </svg>
    </Link>
  );
};

export default CartIcon;
