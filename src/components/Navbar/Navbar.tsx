import { motion } from "framer-motion";
import React from "react";
import { Link, NavLink } from "react-router-dom";

export interface MobileMenu {
  toggleMenu?: boolean;
}

export class Navbar extends React.Component<{}, MobileMenu> {
  constructor(props: boolean) {
    super(props);
    this.state = {
      toggleMenu: false,
    };
  }

  render() {
    return (
      <div>
        <nav className="w-full">
          <div className="container flex items-center justify-between px-6 mx-auto">
            <Link to="/">
              <div className="flex items-center">
                <svg
                  aria-label="Home"
                  className="w-8 sm:w-auto"
                  id="logo"
                  enableBackground="new 0 0 300 300"
                  height="54"
                  width="53"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 601 572"
                >
                  <path d="M549.528 354.832C587.161 317.204 549.528 231.128 549.528 163.867C549.528 96.6061 525.301 139.644 473.555 87.9045C421.81 36.1652 428.395 77.7918 374.533 23.936C320.67 -29.9199 277.627 23.936 199.773 23.936C121.684 23.936 59.824 163.867 59.824 163.867C-93.5319 163.867 104.278 326.611 38.4201 392.461C-27.4383 458.311 108.277 462.309 183.544 537.566C258.81 612.823 342.309 537.566 438.98 537.566C535.886 537.566 417.576 427.267 549.293 427.267C681.48 427.502 511.894 392.461 549.528 354.832ZM426.043 357.184C359.715 357.184 419.222 412.686 370.534 412.686C321.846 412.686 279.744 450.55 241.875 412.686C204.007 374.822 135.561 372.706 168.725 339.546C201.89 306.385 102.397 224.308 179.545 224.308C179.545 224.308 210.593 153.755 250.108 153.755C289.387 153.755 311.026 126.709 338.075 153.755C365.124 180.8 361.831 159.869 387.94 185.974C414.048 212.079 426.278 190.442 426.278 224.308C426.278 258.174 445.33 301.447 426.278 320.496C406.991 339.546 492.372 357.184 426.043 357.184Z"></path>
                </svg>
                <p className="ml-2 text-base font-bold text-gray-800 lg:ml-4 lg:text-2xl">
                  Postogon
                </p>
              </div>
            </Link>
            <div>
              <div
                onClick={(e) => this.setState({ toggleMenu: true })}
                className="text-gray-500 sm:block md:hidden lg:hidden hover:text-gray-700 focus:text-gray-700 focus:outline-none"
              >
                <svg
                  aria-haspopup="true"
                  aria-label="Main Menu"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <line x1="4" y1="8" x2="20" y2="8"></line>
                  <line x1="4" y1="16" x2="20" y2="16"></line>
                </svg>
              </div>
              <div
                id="menu"
                className={
                  this.state.toggleMenu
                    ? "md:block lg:block"
                    : "hidden md:block lg:block"
                }
              >
                <div
                  onClick={(e) => this.setState({ toggleMenu: false })}
                  className="fixed top-0 z-30 block pt-3 text-gray-500 md:hidden lg:hidden hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <ul className="fixed top-0 bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-center py-8 text-3xl bg-white md:text-base md:flex md:flex-row md:relative">
                  <motion.li
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="pt-10 text-gray-600 cursor-pointer hover:text-gray-800 md:ml-10 md:pt-0"
                  >
                    <NavLink
                      onClick={(e) => this.setState({ toggleMenu: false })}
                      exact={true}
                      activeClassName="text-gray-800 hover:text-gray-900"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="pt-10 text-gray-600 cursor-pointer hover:text-gray-800 md:ml-10 md:pt-0"
                  >
                    <NavLink
                      onClick={(e) => this.setState({ toggleMenu: false })}
                      exact={true}
                      activeClassName="text-gray-800 hover:text-gray-900"
                      to="/start"
                    >
                      Start
                    </NavLink>
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="pt-10 text-gray-600 cursor-pointer hover:text-gray-800 md:ml-10 md:pt-0"
                  >
                    <NavLink
                      onClick={(e) => this.setState({ toggleMenu: false })}
                      exact={true}
                      activeClassName="text-gray-800 hover:text-gray-900"
                      to="/continue"
                    >
                      Continue
                    </NavLink>
                  </motion.li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
