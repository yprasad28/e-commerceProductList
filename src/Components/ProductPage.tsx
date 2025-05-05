import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error(`Error Fetching Product data: ${error}`);
        });
    }
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  const { image, title, description, category, price } = product; // destructing
  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>

      <img src={image} alt={title} className="w-[40%] h-auto mb-5" />
      <h1 className="text-2xl  mb-4 font-bold">{title}</h1>
      <p className="mb-4 text-gray-700 w-[70%]">{description}</p>
      <div className="flex">
        <p>Price : ${price}</p>
        <p className="ml-10">
          Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)
        </p>
        <p className="ml-10">Category : {category}</p>
      </div>
    </div>
  );
};

export default ProductPage;
