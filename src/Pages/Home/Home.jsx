import { useEffect } from "react";
import Banner from "../../Shared/Banner/Banner";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    document.title = "Game Verse | Home";
  }, []);

  return (
    <div>
      <Banner />

      {/* Shop Section */}
      <section className="mt-[100px] mb-[100px]">
        <div className="flex flex-col gap-[32px] mb-[50px]">
          <h3 className="text-5xl text-white text-center">SHOP!</h3>
          <p className="text-2xl text-white m-auto text-center">
            Every old and new game imaginable
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
                of the SUMMER BEGIN!!!!
              </h1>
              <p className="py-6 text-xl text-white">
                Summer is here with refreshing deals for the latest games to
                the old retros.
              </p>
              <Link to="/shop">
                <button className="btn bg-indigo-400 text-xl text-white border-2 border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 w-[200px]">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="mt-[100px] mb-[100px]">
        <div className="flex flex-col gap-[32px] mb-[50px]">
          <h3 className="text-5xl text-white text-center">DEALS</h3>
          <p className="text-2xl text-white m-auto text-center">
            A hot deal for FALLOUT in summer
          </p>
        </div>
        <div className="hero h-full glass p-10 rounded-3xl">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://i.ibb.co.com/zhSC6HC/Fallout.jpg"
              className="max-w-sm rounded-lg shadow-2xl"
              alt="Fallout Deal"
            />
            <div className="flex flex-col gap-[16px]">
              <h1 className="text-5xl font-bold text-white">FALLOUT SALE!</h1>
              <p className="py-6 text-xl text-white">
                For the whole Summer, flat 35% off on every Fallout Game.
                <br />
                Various mods and variations included.
              </p>
              <Link to="/deals">
                <button className="btn bg-indigo-400 text-xl border-2 border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 w-[200px]">
                  Order Now!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="mt-[100px] mb-[100px]">
        <div className="flex flex-col gap-[32px] mb-[50px]">
          <h3 className="text-5xl text-white text-center">GAMES</h3>
          <p className="text-2xl text-white m-auto text-center">
            Various exciting and fun GAMES!!!
          </p>
        </div>
        <div className="hero h-full glass p-10 rounded-3xl">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="https://i.ibb.co.com/kMBBxHH/GAMES.jpg"
              className="max-w-sm rounded-lg shadow-2xl"
              alt="Games"
            />
            <div className="flex flex-col gap-[16px]">
              <h1 className="text-5xl font-bold text-white">GAMES!</h1>
              <p className="py-6 text-xl text-white">
                Numerous old and new games ready to be installed and played.
              </p>
              <Link to="/shop">
                <button className="btn bg-indigo-400 text-xl border-2 border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 w-[200px]">
                  To Shop!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
