import React, { useEffect } from "react";
import { Tally3 } from "lucide-react";
import { useState } from "react";
import { useFilter } from "./FilterContext";
import axios from "axios";
import BookCard from "./BookCard";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdown, setDropdownOpen] = useState(false);
  const itemsPerPage = 30;

  useEffect(() => {
    let url = `https://fakestoreapi.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
      url = `https://fakestoreapi.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(`Error fetching data${error}`);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
      console.log(filteredProducts);
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "Expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "Cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "Popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();
  console.log(filteredProducts);

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts/ itemsPerPage)

  const handlePageChange = (page : number) => {
    if (page > 0 && page < totalPages){
      setCurrentPage(page)
    }
  }
  return (
    <>
      <section className="xl:w-[55rem] lg:w-[55-rem] sm:w-[40rem] xs:w-[20rem] p-5">
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="relative mb-5 mt-5">
              <button className="border px-4 py-2 rounded-full flex items-container">
                <Tally3 className="mr-2" />

                {filter === "all"
                  ? "Filter"
                  : filter.charAt(0).toLowerCase() + filter.slice(1)}
              </button>

              {dropdown && (
                <div className="absolute bg:white border-gray-300 rounded mt-2 w-full sm:w-40">
                  <button
                    onClick={() => setFilter("Cheap")}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  >
                    Cheap
                  </button>
                  <button
                    onClick={() => setFilter("Expensive")}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  >
                    Expensive
                  </button>
                  <button
                    onClick={() => setFilter("Popular")}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  >
                    Popular
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-col-3 md:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <BookCard
                key={product.id}
                id={product.id}
                title={product.title}
                image ={product.image}
                price={product.price}

              />
            ))}
          </div>
          <div className="flex flex col sm:flex-row justify-between items-center mt-5">
            {}
            <button onClick={() => handlePageChange(currentPage - 1)} className="border px-4 py-2 mx-2 rounded-full">
              Previous
            </button>
          </div>
          {}
        </div>
      </section>
    </>
  );
};

export default MainContent;
