import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductImage from "../assets/image.png"

const Products = () => {
  const { company, category } = useParams();
  const [products, setProducts] = useState([]);
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEwOTEwNDcxLCJpYXQiOjE3MTA5MTAxNzEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjJkMDVjNTM0LWRjMWMtNDkyMi04ZjJjLWJlZThkMTExMGJlOCIsInN1YiI6InBvb3ZhcmFzYW4uY3MyMUBiaXRzYXRoeS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiMmQwNWM1MzQtZGMxYy00OTIyLThmMmMtYmVlOGQxMTEwYmU4IiwiY2xpZW50U2VjcmV0IjoicUJWUldpZUx6V3VUUGt1dCIsIm93bmVyTmFtZSI6IlBvb3ZhcmFzYW4iLCJvd25lckVtYWlsIjoicG9vdmFyYXNhbi5jczIxQGJpdHNhdGh5LmFjLmluIiwicm9sbE5vIjoiNzM3NjIxMUNTMjM5In0.Rgs2SV7uXyTVXSE_Zq9a_APAKqvpccRTxLv60o5f5Vo";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          `http://20.244.56.144/products/companies/${company}/categories/${category}/products?top=2&minPrice=10&maxPrice=30000`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [company, category, accessToken]);

  return (
    <div className="flex flex-wrap justify-start">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4 mr-4"
        >
          <div className="md:flex">
            <div className="md:shrink-0 w-48 md:w-auto">
              <imgage
                className="h-48 w-full object-cover md:h-full md:w-48"
                src={ProductImage}
                alt="Product Image"
              />
            </div>
            <div className="p-8 w-full">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {product.name}
              </div>
              <p className="block mt-1 text-lg leading-tight font-medium text-black">
                {product.description}
              </p>
              <p className="mt-2 text-slate-500">Price: {product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;