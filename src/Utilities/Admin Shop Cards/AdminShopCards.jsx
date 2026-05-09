import { FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AdminShopCards = ({ shop, handleDelete }) => {
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
        <div className="flex justify-between mt-2">
          <Link to={`/update_game/${_id}`}>
            <button className="btn text-white bg-green-600 text-lg border-2 border-green-600 hover:bg-white hover:border-green-600 hover:text-green-600">
              Update
            </button>
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="btn text-white bg-red-500 text-lg border-2 border-red-500 hover:bg-white hover:border-red-500 hover:text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

AdminShopCards.propTypes = {
  shop: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    short_description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AdminShopCards;
