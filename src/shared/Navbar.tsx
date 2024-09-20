import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { logOut, useCurrentUser } from "../redux/features/auth/authslice";
import { useAppSelector } from "../redux/hooks";
import { LuShoppingBag } from "react-icons/lu";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(useCurrentUser);
  // console.log(user);
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <nav className="border bg-[#517de9] text-white px-5">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img className="w-10 h-8 object-cover" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `hover:text-black ${
                    isActive ? "font-bold text-black" : "text-white font-bold"
                  }`
                }
              >
                Service
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  `hover:text-black ${
                    isActive ? "font-bold text-black" : "text-white font-bold"
                  }`
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  `hover:text-black ${
                    isActive ? "font-bold text-black" : "text-white font-bold"
                  }`
                }
              >
                Contact Us
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/me"
                    className={({ isActive }) =>
                      `hover:text-black ${
                        isActive
                          ? "font-bold text-black"
                          : "text-white font-bold"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    className="text-white font-bold hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/auth/login"
                  className={({ isActive }) =>
                    `hover:text-black ${
                      isActive ? "font-bold text-black" : "text-white font-bold"
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
          <Link to="/booking">
            <LuShoppingBag className="w-6 h-6 text-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
