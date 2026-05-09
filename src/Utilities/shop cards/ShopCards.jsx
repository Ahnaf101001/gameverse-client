import PropTypes from "prop-types";
import { FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShopCards = ({ shop }) => {
  const { _id, name, company, image, price, short_description, category, rating } = shop;

  return (
    <div className="card w-96 glass p-4">
      <figure>
        <img src={image} alt={name} className="h-48 w-full object-cover rounded-lg" />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title">
          {name}, {company}
        </h2>
        <p className="font-semibold flex items-center gap-2">
          Price: {price} <FaDollarSign />
        </p>
        <p>Category: {category}</p>
        <p>Rating: {"⭐".repeat(rating)}</p>
        <p className="text-sm opacity-80">{short_description}</p>
        <div className="card-actions justify-end mt-2">
          <Link to={`/details/${_id}`}>
            <button className="btn text-white bg-indigo-400 text-lg border-2 border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

ShopCards.propTypes = {
  shop: PropTypes.object.isRequired,
};

export default ShopCards;
