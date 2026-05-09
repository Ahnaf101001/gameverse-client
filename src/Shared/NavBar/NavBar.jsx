import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { GoHome } from "react-icons/go";
import { FaShoppingBasket, FaUserShield } from "react-icons/fa";
import { MdDashboardCustomize, MdShoppingCart } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { IoMdPricetags } from "react-icons/io";
import { IoGameController } from "react-icons/io5";

const NavBar = () => {
  const { user, isAdmin, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("user logged out"))
      .catch(console.error);
  };

  const NavLinks = (
    <>
      <NavLink to="/">
        <li className="text-xl text-white decoration-none hover:text-indigo-400">
          <a><GoHome /> Home</a>
        </li>
      </NavLink>
      <NavLink to="/shop">
        <li className="text-xl text-white decoration-none hover:text-indigo-400">
          <a><MdShoppingCart /> Shop</a>
        </li>
      </NavLink>
      <NavLink to="/deals">
        <li className="text-xl text-white decoration-none hover:text-indigo-400">
          <a><IoMdPricetags /> Deals</a>
        </li>
      </NavLink>

      {user && !isAdmin && (
        <>
          <NavLink to="/profile">
            <li className="text-xl text-white decoration-none hover:text-indigo-400">
              <a><ImProfile /> Profile</a>
            </li>
          </NavLink>
          <NavLink to="/dash_board">
            <li className="text-xl text-white decoration-none hover:text-indigo-400">
              <a><MdDashboardCustomize /> Dashboard</a>
            </li>
          </NavLink>
          <NavLink to="/orders">
            <li className="text-xl text-white decoration-none hover:text-indigo-400">
              <a><FaShoppingBasket /> Orders</a>
            </li>
          </NavLink>
        </>
      )}

      {user && isAdmin && (
        <>
          <NavLink to="/admin_shop">
            <li className="text-xl text-white decoration-none hover:text-indigo-400">
              <a><MdShoppingCart /> Admin Shop</a>
            </li>
          </NavLink>
          <NavLink to="/admin_dash_board">
            <li className="text-xl text-white decoration-none hover:text-indigo-400">
              <a><MdDashboardCustomize /> Admin Dashboard</a>
            </li>
          </NavLink>
          <NavLink to="/add_game">
            <li className="text-xl text-white decoration-none hover:text-indigo-400">
              <a><IoGameController /> Add Game</a>
            </li>
          </NavLink>
          <NavLink to="/admin_panel">
            <li className="text-xl text-white decoration-none hover:text-indigo-400">
              <a><FaUserShield /> Admin Panel</a>
            </li>
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="navbar glass mb-[100px]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {NavLinks}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <img className="h-[40px]" src="https://i.ibb.co.com/L1GSjRB/icons8-game-controller-64.png" alt="Game Verse" />
          <Link to="/" className="text-3xl font-bold text-white">
            <span className="text-indigo-900">G</span>ame <span className="text-indigo-900">V</span>erse
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {NavLinks}
        </ul>
      </div>

      <div className="navbar-end flex gap-3">
        {user ? (
          <>
            {isAdmin && (
              <span className="badge badge-warning text-xs font-bold mr-1">ADMIN</span>
            )}
            <div tabIndex={0} role="button" className="tooltip tooltip-bottom avatar" data-tip={user.displayName || user.email}>
              <div className="tooltip w-10 rounded-full">
                <img
                  className="min-w-full min-h-full"
                  alt="User Avatar"
                  src={user.photoURL || "https://i.ibb.co.com/L1GSjRB/icons8-game-controller-64.png"}
                />
              </div>
            </div>
            <a onClick={handleLogOut} className="btn bg-indigo-400 text-xl border-2 border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400 cursor-pointer">
              Log Out
            </a>
          </>
        ) : (
          <>
            <Link to="/sign_in">
              <a className="btn bg-indigo-400 text-xl border-2 text-white border-indigo-400 hover:bg-white hover:border-indigo-400 hover:text-indigo-400">
                Sign Up/Sign In
              </a>
            </Link>
            <Link to="/admin_sign_in">
              <a className="btn bg-yellow-500 text-xl border-2 text-white border-yellow-500 hover:bg-white hover:border-yellow-500 hover:text-yellow-500">
                Admin
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;