import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="carousel max-w-[1660px] mt-[100px] mb-[100px] mx-auto">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(https://i.ibb.co.com/mh4HG60/Banner-1.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-7xl font-bold text-indigo-400">
                Welcome to
                <br />
                GameVerse
              </h1>
              <Link to="/sign_in">
                <button className="btn text-white bg-indigo-400 text-xl border-2 border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 w-full">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle hover:bg-indigo-400">❮</a>
          <a href="#slide2" className="btn btn-circle hover:bg-indigo-400">❯</a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(https://i.ibb.co.com/80J4L7j/8131407.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-left text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-7xl font-bold">
                The DEAL of the Summer event
              </h1>
              <p className="mb-5 text-3xl text-white">
                From March 1st till March 31st
              </p>
              <Link to="/deals">
                <button className="btn text-white bg-indigo-400 text-xl border-2 border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 w-full">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle hover:bg-indigo-400">❮</a>
          <a href="#slide3" className="btn btn-circle hover:bg-indigo-400">❯</a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(https://i.ibb.co.com/tz5htTt/Banner-2.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-left text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-7xl font-bold">
                Flat <br />
                <span className="text-indigo-400">30% OFF</span> on every 90s &
                80s Games
              </h1>
              <p className="mb-5 text-3xl text-white">For this Pohela Boishakh</p>
              <Link to="/shop">
                <button className="btn text-white bg-indigo-400 text-xl border-2 border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 w-full">
                  Order Now!
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle hover:bg-indigo-400">❮</a>
          <a href="#slide4" className="btn btn-circle hover:bg-indigo-400">❯</a>
        </div>
      </div>

      {/* Slide 4 */}
      <div id="slide4" className="carousel-item relative w-full">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(https://i.ibb.co.com/r5tv3py/New-Ga-es.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-left text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-7xl font-bold">
                Latest <br />
                <span className="text-indigo-400">Games!</span>
              </h1>
              <Link to="/shop">
                <button className="btn text-white bg-indigo-400 text-xl border-2 border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 w-full">
                  See More
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle hover:bg-indigo-400">❮</a>
          <a href="#slide1" className="btn btn-circle hover:bg-indigo-400">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
