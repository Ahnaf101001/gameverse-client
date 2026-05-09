import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import OrderCards from "../../Utilities/Order Cards/OrderCards";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const Orders = () => {
  useEffect(() => {
    document.title = "Game Verse | Orders";
  }, []);

  const [dataLength, setDataLength] = useState(6);
  const { user } = useContext(AuthContext);
  const [ordered, setOrdered] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`${SERVER}/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setOrdered(data));
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const phoneNumber = form.phoneNumber.value;
    const transactionID = form.transactionID.value;
    const total = ordered.reduce((sum, order) => sum + order.price, 0);

    const dashBoardData = {
      phoneNumber,
      transactionID,
      email: user?.email,
      totalPrice: total,
      orders: ordered.map((order) => ({
        name: order.name,
        category: order.category,
        rating: order.rating,
        price: order.price,
        image: order.image,
      })),
    };

    fetch(`${SERVER}/dash_board`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dashBoardData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Games Purchased Successfully!");
          // Delete all orders for this user — fixed: use order._id not order itself
          const deletePromises = ordered.map((order) =>
            fetch(`${SERVER}/orders/${order._id}`, { method: "DELETE" })
          );
          Promise.all(deletePromises).then(() => setOrdered([]));
          form.reset();
        }
      })
      .catch(() => toast.error("Purchase failed. Try again."));
  };

  const handleDelete = (id) => {
    const proceed = window.confirm("Sure you want to remove this?");
    if (!proceed) return;
    fetch(`${SERVER}/orders/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Removed successfully!");
          setOrdered((prev) => prev.filter((order) => order._id !== id));
        }
      });
  };

  const total = ordered.reduce((sum, order) => sum + order.price, 0);

  return (
    <div className="animate__animated animate__fadeIn">
      <ToastContainer />
      <div className="m-auto text-center text-white mb-6">
        <h1 className="text-5xl font-bold">My Cart ({ordered.length} items)</h1>
      </div>
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Cart items */}
        <section className="col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 mt-8">
            {ordered.slice(0, dataLength).map((shop) => (
              <OrderCards key={shop._id} shop={shop} handleDelete={handleDelete} />
            ))}
          </div>
        </section>

        {/* Checkout sidebar */}
        <section className="glass rounded-2xl mt-8">
          <form onSubmit={handleSubmit} className="card-body">
            <p className="text-white text-xl font-bold">
              Total: ${total.toFixed(2)}
            </p>
            <div className="divider"></div>
            <p className="text-white text-sm">Pay via bKash / Nagad:</p>
            <p className="text-indigo-300 font-bold">01754626402</p>
            <div className="form-control mt-2">
              <label className="label">
                <span className="text-white">Your Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                name="phoneNumber"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-white">Transaction ID</span>
              </label>
              <input
                type="text"
                placeholder="TrxID"
                name="transactionID"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <input
                className="btn w-full text-xl border-indigo-400 bg-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 text-white"
                type="submit"
                value="Confirm Purchase"
                disabled={ordered.length === 0}
              />
            </div>
          </form>
        </section>
      </div>

      <div className="text-center mt-[50px] mb-[50px]">
        {dataLength < ordered.length && (
          <button
            onClick={() => setDataLength(ordered.length)}
            className="btn text-xl border-indigo-400 bg-indigo-400 hover:bg-white hover:text-indigo-400 text-white"
          >
            Show All
          </button>
        )}
      </div>
    </div>
  );
};

export default Orders;
