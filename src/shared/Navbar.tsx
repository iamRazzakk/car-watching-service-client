import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { logOut } from "../redux/features/auth/authslice";
import { RootState } from "../redux/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state?.auth);
  console.log(user);
  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("accessToke");
    localStorage.removeItem("refreshToke");
  };

  return (
    <nav className="border bg-[#517de9] text-white px-5">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img className="w-10 h-8 object-cover" src={logo} alt="Logo" />
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
            {token ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
