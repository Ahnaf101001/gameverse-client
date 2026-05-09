import { useState } from "react";
import ShopCards from "../shop cards/ShopCards";
import { useLoaderData } from "react-router-dom";

const ShopSection = () => {
  const [dataLength, setDataLength] = useState(6);
  const shops = useLoaderData();

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="m-auto text-center flex flex-col gap-[32px] text-white mb-8">
        <h1 className="text-5xl font-bold">Available Games</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 mt-[50px]">
        {shops.slice(0, dataLength).map((shop) => (
          <ShopCards key={shop._id} shop={shop} />
        ))}
      </div>
      <div className="text-center mt-[50px] mb-[50px]">
        {dataLength < shops.length && (
          <button
            onClick={() => setDataLength(shops.length)}
            className="btn text-xl border-indigo-400 hover:border-indigo-400 bg-indigo-400 hover:bg-white hover:text-indigo-400 text-white"
          >
            Show All Games
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopSection;
