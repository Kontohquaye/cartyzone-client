import { useContext, useEffect, useRef, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { Store } from "../services/Store";
import { toast } from "react-toastify";

// api
import backendInstance from "../utils/api";

//  handle click outside

const Navbar = () => {
  const { state, ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { username } = userInfo;
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showAccountSection, setShowAccountSection] = useState(false);

  const location = useLocation();

  const hamburgerRef = useRef();
  const menuRef = useRef();

  const [categories, setCategories] = useState([]);

  window.addEventListener("click", (evt) => {
    hamburgerRef.current &&
    !hamburgerRef.current.contains(evt.target) &&
    menuRef.current &&
    !menuRef.current.contains(evt.target)
      ? setShowMenu(false)
      : "";
  });
  // on locatin change (navbar)
  useEffect(() => {
    // setShowMenu(false);

    const fetchCategories = async () => {
      try {
        const { data } = await backendInstance.get(
          "/api/products/categories/get"
        );
        // console.log(data);
        if (data) {
          setCategories(data);
          // console.log(categories);
        }
      } catch (err) {
        toast.error("couldn't fetch categories");
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  // signOut
  const handleSignOut = () => {
    ctxDispatch({ type: "SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingDetails");
    localStorage.removeItem("cartItems");
    navigate("/account/signin/?redirect=/");
  };

  return (
    <div className="navbar bg-primary-200 text-white sticky top-0 w-full z-30">
      <nav className="max-w-[1200px] mx-auto pt-6 pb-1 px-2 flex  justify-between items-center">
        {/* left- logo and category */}
        <div className="basis-1/3">
          {/* logo */}
          <NavLink to="/">
            <h1 className="text-2xl italic cursor-pointer">
              C<span className="text-secondary">ar</span>tyzon
              <span className="text-secondary">e</span>
            </h1>
          </NavLink>
        </div>

        {/*  */}
        <div className="relative basis-1/3 flex justify-end ">
          {/* hamburg... */}
          <div ref={hamburgerRef}>
            <HiOutlineMenu
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              id="hamburger"
              className="text-2xl cursor-pointer hover:text-accent sm:hidden p-1 w-10 h-8"
            />
          </div>

          {/* menu */}

          <div
            ref={menuRef}
            className={
              showMenu
                ? "absolute top-full bg-primary-200 sm:bg-transparent sm:static sm:flex sm:items-center"
                : "hidden sm:flex sm:items-center"
            }
          >
            {/* category section */}
            <div
              onMouseOver={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
              className="py-2 relative px-1 sm:p-0 category-section-lg flex items-center font-semibold mr-3 cursor-pointer sm:hover:bg-transparent w-full hover:bg-secondary"
            >
              <div
                onClick={() => {
                  setShowCategories(!showCategories);
                  setShowAccountSection(false);
                }}
                className=" flex items-center  sm:hover:text-accent"
              >
                <BiCategoryAlt className="font-bold text-2xl" />
                <span>Categories</span>
              </div>
              <ul
                onClick={() => setShowMenu(false)}
                className={
                  showCategories
                    ? "absolute w-[150px] max-w-[150px] overflow-hidden  top-0  right-full bg-primary-200"
                    : "hidden"
                }
              >
                {categories.map((category) => (
                  <Link
                    onClick={() => setShowCategories(!showCategories)}
                    to={`/search?category=${category}`}
                    key={category}
                  >
                    <li className="px-2 py-2 hover:bg-secondary text-ellipsis overflow-hidden">
                      {category}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>

            {/* cart */}
            <NavLink onClick={() => setShowMenu(false)} to="cart ">
              <div className="py-2 px-1 hover:bg-secondary cart relative  flex cursor-pointer sm:hover:bg-transparent sm:hover:text-accent   sm:p-2 ">
                <TiShoppingCart className="text-2xl cursor-pointer sm:hover:text-accent" />
                {state.cart.cartItems && state.cart.cartItems.length > 0 && (
                  <span className="absolute left-16 bottom-3 sm:bottom-1/2   sm:left-3/4 bg-secondary  text-white w-7 h-7 text-base   text-center sleading-6 rounded-full">
                    {/* {state.cart.cartItems.length > 99
                        ? 99 + "+"
                        : state.cart.cartItems.length} */}
                    {state.cart.cartItems.reduce((a, b) => a + b.quantity, 0) >
                    99
                      ? 99 + "+"
                      : state.cart.cartItems.reduce(
                          (a, b) => a + b.quantity,
                          0
                        )}
                  </span>
                )}
                <span className=" font-semibold cursor-pointer ">Cart</span>
              </div>
            </NavLink>
            {/* account section */}
            <div
              className="account-section relative"
              onMouseOver={() => setShowAccountSection(true)}
              onMouseLeave={() => setShowAccountSection(false)}
            >
              <div
                onClick={() => {
                  setShowAccountSection(!showAccountSection);
                  setShowCategories(false);
                }}
                className="flex px-1 py-2 sm:p-0 hover:bg-secondary sm:hover:bg-transparent cursor-pointer sm:hover:text-accent   "
              >
                <MdAccountCircle className="text-2xl cursor-pointer  sm:ml-4" />
                <span className="font-semibold ml-1 inline-block max-w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {username ? username : "Account"}
                </span>
              </div>
              {/* list */}
              {userInfo && userInfo.username ? (
                <ul
                  onClick={() => {
                    setShowMenu(false);
                    setShowAccountSection(false);
                  }}
                  className={
                    showAccountSection
                      ? "capitalize font-medium absolute top-0 right-full sm:-right-2 sm:top-full bg-primary-200 w-[150px]"
                      : "hidden"
                  }
                >
                  <NavLink to="account/profile">
                    <li className="px-2 py-1 hover:bg-secondary hover:cursor-pointer">
                      profile
                    </li>
                  </NavLink>
                  <NavLink to="account/orders">
                    <li className="px-2 py-1 hover:bg-secondary hover:cursor-pointer">
                      order history
                    </li>
                  </NavLink>
                  {/* signout */}
                  <li
                    onClick={handleSignOut}
                    className="px-2 py-1 hover:bg-secondary hover:cursor-pointer"
                  >
                    signout
                  </li>
                </ul>
              ) : (
                <ul
                  onClick={() => {
                    setShowMenu(false);

                    setShowAccountSection(false);
                  }}
                  className={
                    showAccountSection
                      ? "capitalize font-medium absolute right-full top-0 sm:-right-2 sm:top-full bg-primary-200 w-[150px]"
                      : "hidden"
                  }
                >
                  <NavLink to="account/signin">
                    <li className="px-2 py-1 hover:bg-secondary hover:cursor-pointer">
                      signin
                    </li>
                  </NavLink>
                  <NavLink to="account/signup">
                    <li className="px-2 py-1 hover:bg-secondary hover:cursor-pointer">
                      signup
                    </li>
                  </NavLink>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
