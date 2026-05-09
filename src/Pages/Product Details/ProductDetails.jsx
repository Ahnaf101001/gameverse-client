import { useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  const shop = useLoaderData();
  const { _id, name, company, price, rating, category, short_description, image } = shop;

  useEffect(() => {
    document.title = `Game Verse | ${name} Details`;
  }, [name]);

  return (
    <div>
      <div className="glass p-[40px] mb-[100px]">
        <div className="text-center mb-[60px]">
          <h1 className="text-5xl font-bold text-white">Game Details</h1>
        </div>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row-reverse gap-8">
            <img
              src={image}
              className="max-w-sm rounded-lg shadow-2xl object-cover"
              alt={name}
            />
            <div className="text-white flex flex-col gap-4">
              <h2 className="text-5xl font-bold">
                {name}
              </h2>
              <p className="text-2xl text-gray-300">by {company}</p>
              <p className="text-xl">Category: <span className="text-indigo-300">{category}</span></p>
              <p className="font-semibold text-3xl flex items-center gap-2">
                Price: {price} <FaDollarSign />
              </p>
              <p className="text-xl">Rating: {"⭐".repeat(rating)}</p>
              <p className="text-lg text-gray-200">{short_description}</p>
              <div className="mt-4">
                <Link to={`/purchase/${_id}`}>
                  <button className="btn text-xl border-indigo-400 bg-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 text-white px-8">
                    Purchase Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
