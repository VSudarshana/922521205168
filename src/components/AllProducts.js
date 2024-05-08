import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const AllProducts = () => {
  const [companies] = useState(["AMZ", "FLP", "SNP", "MYN", "AZO"]);
  const [categories] = useState([
    "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", 
    "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"
  ]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxRating, setMaxRating] = useState(5);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [availability, setAvailability] = useState("");
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    fetchProducts();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany, selectedCategory, maxRating, minPrice, maxPrice, availability, sortBy]);

  const fetchProducts = async () => {
    try {
      let url = `http://20.244.56.144/products/companies/${selectedCompany}/categories/${selectedCategory}/products?rating=${maxRating}&minPrice=${minPrice}&maxPrice=${maxPrice}&availability=${availability}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      let data = await response.json();
      if (sortBy) {
        data = sortProducts(data, sortBy);
      }
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const sortProducts = (data, sortBy) => {
    switch (sortBy) {
      case "price":
        return data.sort((a, b) => a.price - b.price);
      case "rating":
        return data.sort((a, b) => b.rating - a.rating);
      case "discount":
        return data.sort((a, b) => b.discount - a.discount);
      default:
        return data;
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="my-5 mx-40">
      <h2 className="text-center mb-10 font-bold text-3xl mt-16 text-red-400">All Products</h2>
      <div className="flex gap-16 flex-wrap justify-center items-center">
        <label className="flex gap-3 mb-2 text-sm font-medium text-gray-700 items-center dark:text-white">
          Company:
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            <option value="">Select Company</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>{company}</option>
            ))}
          </select>
        </label>
        <label className="flex gap-3 mb-2 text-sm font-medium text-gray-700 items-center dark:text-white">
          Category:
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="flex gap-3 mb-2 text-sm font-medium text-gray-700 items-center dark:text-white">
          Max Rating:
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" value={maxRating} onChange={(e) => setMaxRating(e.target.value)} />
        </label>
        <label className="flex gap-3 mb-2 text-sm font-medium text-gray-700 items-center dark:text-white">
          Min Price:
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        </label>
        <label className="flex gap-3 mb-2 text-sm font-medium text-gray-700 items-center dark:text-white">
          Max Price:
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </label>
        <label className="flex gap-3 mb-2 text-sm font-medium text-gray-700 items-center dark:text-white">
          Availability:
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="">All</option>
            <option value="yes">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </label>
        <label className="flex gap-3 mb-2 text-sm font-medium text-gray-700 items-center dark:text-white">
          Sort By:
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={sortBy} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="discount">Discount</option>
          </select>
        </label>
      </div>
      <div className="flex">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col gap-3">
            <Link to={`/product/${product.companyName}-${product.productName}`}>
              <h3>{product.productName}</h3>
              <p>Company: {product.companyName}</p>
              <p>Category: {product.category}</p>
              <p>Price: {product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}</p>
              <p>Availability: {product.availability}</p>
            </Link>
            <h2 className="text-center mb-10 font-bold text-3xl mt-16 text-red-400">Displaying Products</h2>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
