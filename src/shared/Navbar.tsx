import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom"; 

const Navbar = () => {
  return (
    <nav className="border bg-[#517de9] text-white">
      <div className="p-4 flex items-center justify-between ">
        {/* Logo */}
        <div className="flex items-center">
          <img className="w-10 h-8 object-cover" src={logo} alt="Logo" />
        </div>

        {/* Navbar Links */}
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  `hover:text-black ${isActive ? "font-bold text-black" : "text-white font-bold"}`
                }
              >
                Service
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  `hover:text-black ${isActive ? "font-bold text-black" : "text-white font-bold"}`
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  `hover:text-black ${isActive ? "font-bold text-black" : "text-white font-bold"}`
                }
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `hover:text-black ${isActive ? "font-bold text-black" : "text-white font-bold"}`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-black ${isActive ? "font-bold text-black" : "text-white font-bold"}`
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
