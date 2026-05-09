import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const UpdateGame = () => {
  useEffect(() => {
    document.title = "Game Verse | Update Game";
  }, []);

  const updateGame = useLoaderData();
  const { _id, name, company, price, rating, category, short_description, image } = updateGame;

  const handleUpdateGame = async (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedGame = {
      name: form.name.value,
      company: form.company.value,
      price: parseFloat(form.price.value),
      rating: parseInt(form.rating.value),
      category: form.category.value,
      short_description: form.short_description.value,
      image: form.image.value,
    };

    try {
      const response = await fetch(`${SERVER}/shop/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGame),
      });
      const data = await response.json();
      if (data.modifiedCount > 0) {
        toast.success("Game Updated Successfully!");
      } else {
        toast.warning("No changes were made.");
      }
    } catch {
      toast.error("Failed to update game");
    }
  };

  const inputClass = "input input-bordered w-full";
  const labelClass = "label-text text-white";

  return (
    <div className="lg:w-[1320px] m-auto flex flex-col gap-[50px] mb-16">
      <ToastContainer />
      <section className="m-auto p-[70px] flex flex-col gap-[32px] glass w-full">
        <h1 className="text-5xl text-white text-center">Update Game</h1>
        <form onSubmit={handleUpdateGame} className="lg:w-[1096px] m-auto w-full">
          <div className="flex lg:flex-row flex-col justify-between gap-4">
            <div className="form-control lg:w-1/2 w-full">
              <label className="label"><span className={labelClass}>Game Name</span></label>
              <input type="text" name="name" defaultValue={name} className={inputClass} required />
            </div>
            <div className="form-control lg:w-1/2 w-full">
              <label className="label"><span className={labelClass}>Company Name</span></label>
              <input type="text" name="company" defaultValue={company} className={inputClass} required />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col justify-between gap-4 mt-2">
            <div className="form-control lg:w-1/2 w-full">
              <label className="label"><span className={labelClass}>Price ($)</span></label>
              <input type="number" step="0.01" min="0" name="price" defaultValue={price} className={inputClass} required />
            </div>
            <div className="form-control lg:w-1/2 w-full">
              <label className="label"><span className={labelClass}>Rating (1-5)</span></label>
              <input type="number" min="1" max="5" name="rating" defaultValue={rating} className={inputClass} required />
            </div>
          </div>
          <div className="form-control mt-2">
            <label className="label"><span className={labelClass}>Category</span></label>
            <input type="text" name="category" defaultValue={category} className={inputClass} required />
          </div>
          <div className="form-control mt-2">
            <label className="label"><span className={labelClass}>Short Description</span></label>
            <textarea name="short_description" defaultValue={short_description} className="textarea textarea-bordered w-full" rows={3} required />
          </div>
          <div className="form-control mt-2">
            <label className="label"><span className={labelClass}>Image URL</span></label>
            <input type="url" name="image" defaultValue={image} className={inputClass} required />
          </div>
          <div className="mt-[24px] text-center">
            <button className="btn text-xl border-indigo-500 hover:border-indigo-500 bg-indigo-500 hover:bg-white hover:text-indigo-500 text-white px-10">
              Update Game
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateGame;
