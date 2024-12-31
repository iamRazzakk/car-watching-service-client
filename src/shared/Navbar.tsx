import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { logOut, useCurrentUser } from "../redux/features/auth/authslice";
import { useAppSelector } from "../redux/hooks";
import { LuShoppingBag } from "react-icons/lu";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(useCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  return (
    <nav className="border bg-[#517de9] text-white px-5">
      <div className="p-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img className="w-10 h-8 object-cover" src={logo} alt="Logo" />
        </Link>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6 text-white cursor-pointer" />
          ) : (
            <FaBars className="w-6 h-6 text-white cursor-pointer" />
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
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
          {user ? (
            <>
              <NavLink
                to="/dashboard/me"
                className={({ isActive }) =>
                  `hover:text-black ${
                    isActive ? "font-bold text-black" : "text-white font-bold"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <button
                className="text-white font-bold hover:text-black"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
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
          )}
          <Link to="/booking">
            <LuShoppingBag className="w-6 h-6 text-white" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu (Sliding Drawer from Right) */}
      <div
        className={`fixed top-0 right-0 h-screen w-3/4 bg-[#517de9] text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex justify-between items-center p-6">
          <Link to="/">
            <img className="w-10 h-8 object-cover" src={logo} alt="Logo" />
          </Link>
          <FaTimes
            className="w-6 h-6 text-white cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <ul className="flex flex-col space-y-6 p-6">
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `hover:text-black ${
                  isActive ? "font-bold text-black" : "text-white font-bold"
                }`
              }
              onClick={toggleMenu}
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
              onClick={toggleMenu}
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
              onClick={toggleMenu}
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
                      isActive ? "font-bold text-black" : "text-white font-bold"
                    }`
                  }
                  onClick={toggleMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button
                  className="text-white font-bold hover:text-black"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
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
                onClick={toggleMenu}
              >
                Login
              </NavLink>
            </li>
          )}
          <li>
            <Link to="/booking" onClick={toggleMenu}>
              <LuShoppingBag className="w-6 h-6 text-white" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
