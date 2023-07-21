import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { toast } from "react-toastify";

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const [Auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...Auth,
      user: null,
      token: "",
    });
    toast.success("Logout Successfully");
    localStorage.clear();
  };

  return (
    <nav className="w-full bg-gray-800 shadow sticky top-0 z-50">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <img
              className="w-10 h-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_India.png"
              alt=""
            />
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            {/* Show all the links for small devices */}
            <ul className="items-center justify-center space-y-8 md:hidden">
              <li className="text-white hover:text-indigo-200">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="text-white hover:text-indigo-200">
                <NavLink to="/political">Political Parties</NavLink>
              </li>
              <li className="text-white hover:text-indigo-200">
                <NavLink to={Auth?.user ? "/vote" : "/login"}>Vote</NavLink>
              </li>
              <li className="text-white hover:text-indigo-200">
                <NavLink to="/rashtrapati">Rashtrapati Elections</NavLink>
              </li>
              <li className="text-white hover:text-indigo-200">
                <NavLink to="/presidentResults">
                  Rashtrapati Election Results
                </NavLink>
              </li>
              <li className="text-white hover:text-indigo-200">
                <NavLink to="/result">Election Results</NavLink>
              </li>
            </ul>

            {/* Responsive Styles */}
            <div className="mt-3 space-y-2 lg:hidden md:inline-block">
              {Auth?.user ? (
                <div className="flex space-x-2">
                  <NavLink
                    to="/profile"
                    className="inline-block flex-1 px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                  >
                    Your Profile
                  </NavLink>
                  <NavLink
                    to="/"
                    onClick={handleLogout}
                    className="inline-block flex-1 px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                  >
                    Logout
                  </NavLink>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <NavLink
                    to="/login"
                    className="inline-block flex-1 px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="inline-block flex-1 px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                  >
                    Sign up
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:inline-block">
          <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <li className="text-white hover:text-indigo-200">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="text-white hover:text-indigo-200">
              <NavLink to="/political">Political Parties</NavLink>
            </li>
            <li className="text-white hover:text-indigo-200">
              <NavLink to={Auth?.user ? "/vote" : "/login"}>Vote</NavLink>
            </li>
            <li className="text-white hover:text-indigo-200">
              <NavLink to="/rashtrapati">Rashtrapati Elections</NavLink>
            </li>
            <li>
              <div className="relative">
                <button
                  className="w-full p-2.5 text-white bg-gray-800 border rounded-md shadow-sm outline-none appearance-none"
                  onClick={() => setNavbar(!navbar)}
                >
                  Results
                </button>
                {navbar && (
                  <div className="absolute top-full left-0 mt-2 py-2 bg-white shadow-lg rounded-md z-10">
                    <NavLink
                      to="/result"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-100"
                      onClick={() => setNavbar(false)}
                    >
                      Election Results
                    </NavLink>
                    <NavLink
                      to="/presidentResults"
                      className="block px-4 py-2 text-gray-800 hover:bg-indigo-100"
                      onClick={() => setNavbar(false)}
                    >
                      Rashtrapati Election
                    </NavLink>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>

        <div className="hidden space-x-2 md:inline-block">
          {Auth?.user ? (
            <>
              <div className="flex space-x-2">
                <NavLink
                  to="/profile"
                  className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                  Your Profile
                </NavLink>
                <NavLink
                  to="/"
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                >
                  Logout
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <div className="flex m-4 space-x-1">
                <NavLink
                  to="/login"
                  className="inline-block mr-2 px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/register"
                  className="inline-block px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                >
                  Sign up
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
