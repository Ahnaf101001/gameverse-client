import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const AddGame = () => {
  useEffect(() => {
    document.title = "Game Verse | Add Game";
  }, []);

  const handleAddGame = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const company = form.company.value;
    const price = parseFloat(form.price.value);
    const rating = parseInt(form.rating.value);
    const category = form.category.value;
    const short_description = form.short_description.value;
    const image = form.image.value;

    const addGame = { name, company, price, rating, category, short_description, image };

    fetch(`${SERVER}/games`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addGame),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Game Added Successfully!");
          form.reset();
        }
      })
      .catch(() => toast.error("Failed to add game."));
  };

  const inputClass = "input input-bordered w-full";
  const labelClass = "label-text text-white";

  return (
    <div className="lg:w-[1320px] m-auto flex flex-col gap-[50px] mb-16">
      <ToastContainer />
      <section className="m-auto p-[70px] flex flex-col gap-[32px] glass w-full">
        <h1 className="text-5xl text-white text-center">Add New Game</h1>
        <form onSubmit={handleAddGame} className="lg:w-[1096px] m-auto w-full">
          <div className="flex lg:flex-row flex-col justify-between gap-4">
            <div className="form-control lg:w-1/2 w-full">
              <label className="label">
                <span className={labelClass}>Game Name</span>
              </label>
              <input type="text" name="name" placeholder="Game Name" className={inputClass} required />
            </div>
            <div className="form-control lg:w-1/2 w-full">
              <label className="label">
                <span className={labelClass}>Company Name</span>
              </label>
              <input type="text" name="company" placeholder="Company Name" className={inputClass} required />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col justify-between gap-4 mt-2">
            <div className="form-control lg:w-1/2 w-full">
              <label className="label">
                <span className={labelClass}>Price ($)</span>
              </label>
              <input type="number" step="0.01" min="0" name="price" placeholder="0.00" className={inputClass} required />
            </div>
            <div className="form-control lg:w-1/2 w-full">
              <label className="label">
                <span className={labelClass}>Rating (1-5)</span>
              </label>
              <input type="number" min="1" max="5" name="rating" placeholder="5" className={inputClass} required />
            </div>
          </div>
          <div className="form-control mt-2">
            <label className="label">
              <span className={labelClass}>Category</span>
            </label>
            <input type="text" name="category" placeholder="e.g. RPG, Open World" className={inputClass} required />
          </div>
          <div className="form-control mt-2">
            <label className="label">
              <span className={labelClass}>Short Description</span>
            </label>
            <textarea name="short_description" placeholder="Describe the game..." className="textarea textarea-bordered w-full" rows={3} required />
          </div>
          <div className="form-control mt-2">
            <label className="label">
              <span className={labelClass}>Image URL</span>
            </label>
            <input type="url" name="image" placeholder="https://..." className={inputClass} required />
          </div>
          <div className="mt-[24px] text-center">
            <button className="btn text-xl border-indigo-500 hover:border-indigo-500 bg-indigo-500 hover:bg-white hover:text-indigo-500 text-white px-10">
              Add Game
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddGame;
