import { FaDollarSign } from "react-icons/fa";
import PropTypes from "prop-types";

const OrderCards = ({ shop, handleDelete }) => {
  const { _id, name, company, image, price, category, rating } = shop;

  return (
    <div className="card w-96 glass p-4">
      <figure>
        <img src={image} alt={name} className="h-48 w-full object-cover rounded-lg" />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title">{name}, {company}</h2>
        <p className="font-semibold flex items-center gap-2">
          Price: {price} <FaDollarSign />
        </p>
        <p>Category: {category}</p>
        <p>Rating: {"⭐".repeat(rating)}</p>
      </div>
      <button
        onClick={() => handleDelete(_id)}
        className="btn text-white bg-red-500 text-lg border-2 border-red-500 hover:bg-white hover:border-red-500 hover:text-red-500 m-2"
      >
        Remove
      </button>
    </div>
  );
};

OrderCards.propTypes = {
  shop: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default OrderCards;
