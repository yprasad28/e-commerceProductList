import { useEffect, useState } from "react";
import { Tally3 } from "lucide-react";
import { useFilter } from "./FilterContext";
import axios from "axios";
import BookCard from "./BookCard";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [dropdown, setDropdownOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
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
        return filteredProducts.sort((a, b) => b.rating?.rate - a.rating?.rate);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button
              onClick={() => setDropdownOpen(!dropdown)}
              className="border px-4 py-2 rounded-full flex items-center"
            >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>

            {dropdown && (
              <div className="absolute z-10 bg-white border mt-2 w-40 shadow-md rounded">
                <button
                  onClick={() => setFilter("Cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("Expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("Popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainContent;
