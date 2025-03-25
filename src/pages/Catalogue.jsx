"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import CartIcon from "../components/CartIcon";

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number.parseInt(queryParams.get("page") || "1", 10);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const skip = (currentPage - 1) * productsPerPage;
        const response = await fetch(
          `https://dummyjson.com/products?skip=${skip}&limit=${productsPerPage}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, productsPerPage]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}?returnPage=${currentPage}`);
  };

  const handlePageChange = (pageNumber) => {
    navigate(`/?page=${pageNumber}`);
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <main className="container mx-auto px-4 py-4">
      <div className="bg-pink-100 p-4 flex justify-between items-center rounded-lg">
        <h1 className="text-xl font-bold">Catalogue</h1>
        <CartIcon />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </div>

      <div className="mt-8 mb-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default Catalogue;
