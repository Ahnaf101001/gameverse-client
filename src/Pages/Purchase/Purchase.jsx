import { useContext, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const Purchase = () => {
  const shop = useLoaderData();
  const { _id, name, company, price, rating, category, short_description, image } = shop;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = `Game Verse | ${name} Purchase`;
  }, [name]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const emailAddress = form.emailAddress.value;

    const ordered = {
      emailAddress,
      name,
      category,
      rating,
      image,
      price,
      service: _id,
      email: user?.email,
    };

    fetch(`${SERVER}/orders`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(ordered),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Game added to cart successfully!");
          form.reset();
        }
      })
      .catch(() => toast.error("Purchase failed. Try again."));
  };

  return (
    <div>
      <ToastContainer />
      <div className="glass p-[40px] mb-[60px]">
        <div className="text-center mb-[60px]">
          <h1 className="text-5xl font-bold text-white">Purchase</h1>
        </div>
        <div className="hero">
          <div className="hero-content flex-col gap-6">
            <img
              src={image}
              className="max-w-sm rounded-lg shadow-2xl"
              alt={name}
            />
            <div className="text-white flex flex-col gap-3 text-center">
              <h2 className="text-4xl font-bold">{name}, {company}</h2>
              <p className="text-xl">Category: {category}</p>
              <p className="font-semibold text-2xl flex items-center justify-center gap-2">
                Price: {price} <FaDollarSign />
              </p>
              <p className="text-xl">Rating: {"⭐".repeat(rating)}</p>
              <p className="text-lg text-gray-200">{short_description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card glass p-[40px] w-full shrink-0 shadow-2xl mb-[100px]">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="text-white text-xl">
                Alternate email (for emergencies)
              </span>
            </label>
            <input
              type="email"
              placeholder="alternate@email.com"
              name="emailAddress"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6 m-auto">
            <input
              className="btn w-[200px] text-xl border-indigo-400 bg-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 text-white"
              type="submit"
              value="Confirm Order"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Purchase;
