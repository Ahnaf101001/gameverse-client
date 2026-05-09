import { useEffect } from "react";

const Deals = () => {
  useEffect(() => {
    document.title = "Game Verse | Deals";
  }, []);

  return (
    <div>
      {/* Winter Deals */}
      <section className="mt-[100px] mb-[100px]">
        <div className="flex flex-col gap-[32px] mb-[50px]">
          <h3 className="text-5xl text-white text-center">Winter Deals</h3>
          <p className="text-2xl text-white m-auto text-center">
            Get exciting deals before the winter eve
          </p>
        </div>
        <div className="hero h-full glass p-10 rounded-3xl">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="https://i.ibb.co.com/HX1J8Sw/Dealspng.png"
              className="max-w-sm rounded-lg shadow-2xl"
              alt="Deals"
            />
            <div className="flex flex-col gap-[16px]">
              <h1 className="text-5xl font-bold text-white">
                Let the <span className="text-indigo-400">SHOPPING</span> spree
                of the WINTER BEGIN!!!!
              </h1>
              <p className="py-6 text-xl text-white">
                Winter is here with refreshing deals for the latest and retro games.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call of Duty Deal */}
      <section className="mt-[100px] mb-[100px]">
        <div className="flex flex-col gap-[32px] mb-[50px]">
          <h3 className="text-5xl text-white text-center">Call of Deals</h3>
          <p className="text-2xl text-white m-auto text-center">
            A hot deal for Call of Duty franchise in Winter
          </p>
        </div>
        <div className="hero h-full glass p-10 rounded-3xl">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://i.ibb.co.com/QfCbkHD/Call-of-Duty.jpg"
              className="max-w-sm rounded-lg shadow-2xl"
              alt="CoD Deal"
            />
            <div className="flex flex-col gap-[16px]">
              <h1 className="text-5xl font-bold text-white">
                Call of Duty SALE!
              </h1>
              <p className="py-6 text-xl text-white">
                For the whole of Winter — flat 35% off on every Call of Duty
                game. Various mods and variations included.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deals;
