"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartIcon from "../components/CartIcon";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const queryParams = new URLSearchParams(location.search);
  const returnPage = queryParams.get("returnPage") || "1";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.thumbnail);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return (price - (price * discountPercentage) / 100).toFixed(2);
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!product)
    return <div className="text-center p-10">Product not found</div>;

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage
  );

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-pink-100 p-4 flex justify-between items-center rounded-lg">
        <Link to={`/?page=${returnPage}`} className="flex items-center">
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
            className="mr-2"
          >
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          <span className="font-bold">Back</span>
        </Link>
        <CartIcon />
      </div>

      <div className="mt-6 bg-white rounded-lg overflow-hidden shadow-md">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="relative h-64 md:h-96">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 grid grid-cols-5 gap-2">
              {product.images &&
                product.images.slice(0, 5).map((image, index) => (
                  <div
                    key={index}
                    className={`border rounded overflow-hidden h-16 cursor-pointer ${
                      selectedImage === image ? "border-pink-500 border-2" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.brand}</p>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={
                      i < Math.round(product.rating) ? "currentColor" : "none"
                    }
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">({product.rating})</span>
            </div>

            <div className="mb-4">
              <p className="text-sm line-through text-gray-500">
                ₹{product.price.toFixed(2)}
              </p>
              <p className="text-2xl font-bold">₹{discountedPrice}</p>
              <p className="text-sm text-pink-500">
                {product.discountPercentage.toFixed(2)}% OFF
              </p>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
              >
                Add to Cart
              </button>
              <Link
                to="/cart"
                className="px-6 py-2 border border-pink-500 text-pink-500 rounded-full hover:bg-pink-50 transition-colors inline-flex items-center justify-center"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
