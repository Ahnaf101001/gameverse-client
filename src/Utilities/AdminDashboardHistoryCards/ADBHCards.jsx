import PropTypes from "prop-types";
import { FaDollarSign } from "react-icons/fa";

const ADBHCards = ({ order, handleDelete }) => {
  const { _id, phoneNumber, transactionID, email, totalPrice, orders } = order;

  return (
    <div className="card glass p-4">
      <div className="card-body text-white">
        <h2 className="card-title text-sm break-all">Order: {_id}</h2>
        <p>📞 {phoneNumber}</p>
        <p>🔖 TxID: {transactionID}</p>
        <p>📧 {email}</p>
        <p className="font-semibold flex items-center gap-2">
          Total: {totalPrice} <FaDollarSign />
        </p>
        <div className="divider my-1"></div>
        <h3 className="font-bold">Items:</h3>
        {orders.map((item, index) => (
          <div key={index} className="flex items-center gap-3 mb-2">
            <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover" />
            <div className="text-sm">
              <p className="font-semibold">{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
            </div>
          </div>
        ))}
        <button
          onClick={() => handleDelete(_id)}
          className="btn mt-2 text-white bg-green-600 border-green-600 hover:bg-white hover:text-green-600"
        >
          ✓ Approve & Remove
        </button>
      </div>
    </div>
  );
};

ADBHCards.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    transactionID: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    orders: PropTypes.array.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ADBHCards;
