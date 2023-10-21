import { useContext, useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { Store } from "../services/Store";

const Navbar = () => {
  const { state } = useContext(Store);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  // on locatin change (navbar)
  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  // handle click outside
  document.addEventListener("click", (e) => {
    if (e.target.id !== "hamburger" && !e.target.dataset.svgmenu) {
      // const customData = e.target.dataset.svg;
      // console.log("Data attribute value:", customData);
      setShowMenu(false);
    }
  });

  return (
    <div className="navbar bg-primary-200 text-white">
      <nav className="max-w-[1200px] mx-auto pt-6 pb-1 px-2 flex justify-between items-center">
        {/* left- logo and category */}
        <div>
          {/* logo */}
          <Link to="/">
            <h1 className="text-2xl italic cursor-pointer">
              C<span className="text-secondary">ar</span>tyzon
              <span className="text-secondary">e</span>
            </h1>
          </Link>
        </div>

        {/* right */}
        {/*  */}
        <div className="relative">
          {/* hamburg... */}
          <HiOutlineMenu
            data-svgmenu={"menu"}
            id="hamburger"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="text-2xl cursor-pointer hover:text-accent sm:hidden p-1 w-10 h-8"
          />
          {/* menu */}
          {showMenu ? (
            <div className="sm:flex sm:items-center absolute right-0 bg-primary-200 sm: sm:p-0 sm:bg-transparent sm:static">
              {/* category section */}
              <div className="category-section flex items-center font-semibold sm:mr-3 cursor-pointer sm:hover:text-accent p-2 mb-1 sm:p-0 sm:mb-0 hover:bg-secondary  sm:hover:bg-transparent">
                <BiCategoryAlt className="font-bold" />
                <span>Categories</span>
              </div>

              {/* cart */}
              <Link to="/cart ">
                <div className="cart relative py-1 sm:p-0 flex cursor-pointer sm:hover:text-accent hover:bg-secondary p-2 sm:hover:bg-transparent">
                  <TiShoppingCart className="text-2xl cursor-pointer sm:hover:text-accent" />
                  {state.cart.cartItems && state.cart.cartItems.length > 0 && (
                    <span className="absolute sm:bottom-1/2  left-5 bottom-2 sm:left-1/4 bg-secondary  text-white sm:w-7 sm:h-7 text-xs sm:text-base w-5 h-5 leading-5 text-center sm:leading-6 rounded-full">
                      {state.cart.cartItems.length > 99
                        ? 99 + "+"
                        : state.cart.cartItems.length}
                    </span>
                  )}
                  <span className="ml-4 font-semibold sm:ml-1 z-10 cursor-pointer sm:hover:text-accent">
                    Cart
                  </span>
                </div>
              </Link>
              {/* account section */}
              <div className="flex cursor-pointer sm:hover:text-accent p-2 sm:p-0 hover:bg-secondary sm:hover:bg-transparent">
                <MdAccountCircle className="text-2xl cursor-pointer  sm:ml-4" />
                <span className="font-semibold sm:ml-1">Account</span>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex sm:items-center   ">
              {/* category section */}
              <div className="category-section flex items-center font-semibold mr-3 cursor-pointer hover:text-accent">
                <BiCategoryAlt className="font-bold" />
                <span>Categories</span>
              </div>

              {/* cart */}
              <Link to="/cart ">
                <div className="cart relative  flex cursor-pointer hover:text-accent  p-2 ">
                  <TiShoppingCart className="text-2xl cursor-pointer hover:text-accent" />
                  {state.cart.cartItems && state.cart.cartItems.length > 0 && (
                    <span className="absolute bottom-1/2   left-1/4 bg-secondary  text-white w-7 h-7 text-base   text-center sleading-6 rounded-full">
                      {state.cart.cartItems.length > 99
                        ? 99 + "+"
                        : state.cart.cartItems.length}
                    </span>
                  )}
                  <span className=" font-semibold ml-1 z-10 cursor-pointer hover:text-accent">
                    Cart
                  </span>
                </div>
              </Link>
              {/* account section */}
              <div className="flex cursor-pointer hover:text-accent  hover:bg-transparent">
                <MdAccountCircle className="text-2xl cursor-pointer  ml-4" />
                <span className="font-semibold ml-1">Account</span>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
