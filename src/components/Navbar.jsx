import { useContext, useEffect, useRef, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Store } from "../services/Store";

const Navbar = () => {
  const { state, ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { username } = userInfo;
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  // large screens
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMinMenu, setShowMinMenu] = useState(false);
  const location = useLocation();
  const accountRef = useRef();
  const hamburgerRef = useRef();
  const accountSectionRef = useRef();
  const listRef = useRef();
  // console.log(accountRef.current.target);

  // on locatin change (navbar)
  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  // min menu display
  const handleMenuDisplay = (evt) => {
    setShowMinMenu(true);

    if (
      accountSectionRef.current &&
      !accountSectionRef.current.contains(evt.target)
    ) {
      setShowMinMenu(false);
    }
  };

  // handle click outside
  document.addEventListener("click", (e) => {
    if (accountRef.current && !accountRef.current.contains(e.target)) {
      setShowAccountMenu(false);
    }
    // small screens
    if (hamburgerRef.current && !hamburgerRef.current.contains(e.target)) {
      setShowMenu(false);
    }

    if (
      accountSectionRef.current &&
      !accountSectionRef.current.contains(e.target)
    ) {
      setShowMinMenu(false);
    }
    if (
      accountSectionRef.current &&
      accountSectionRef.current.contains(e.target)
    ) {
      setShowMenu(true);
    }
  });

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
          <div ref={hamburgerRef}>
            <HiOutlineMenu
              id="hamburger"
              onClick={() => {
                setShowMenu(!showMenu);
                setShowMinMenu(false);
              }}
              className="text-2xl cursor-pointer hover:text-accent sm:hidden p-1 w-10 h-8"
            />
          </div>

          {/* menu */}
          {showMenu ? (
            <div className="sm:flex sm:items-center absolute right-0 bg-primary-200 sm: sm:p-0 sm:bg-transparent sm:static">
              {/* category section */}
              <div className="category-section flex items-center font-semibold sm:mr-3 cursor-pointer sm:hover:text-accent p-2 mb-1 sm:p-0 sm:mb-0 hover:bg-secondary  sm:hover:bg-transparent">
                <BiCategoryAlt className="font-bold text-2xl mr-1" />
                <span>Categories</span>
              </div>

              {/* cart */}
              <Link to="/cart ">
                <div className="cart relative py-1 sm:p-0 flex items-center cursor-pointer sm:hover:text-accent hover:bg-secondary p-2 sm:hover:bg-transparent">
                  <TiShoppingCart className="text-2xl cursor-pointer sm:hover:text-accent mr-1" />
                  {state.cart.cartItems && state.cart.cartItems.length > 0 && (
                    <span className="absolute   left-[68px] bottom-2 bg-secondary  text-white  text-xs  w-5 h-5 leading-5 text-center sm:leading-6 rounded-full">
                      {state.cart.cartItems.length > 99
                        ? 99 + "+"
                        : state.cart.cartItems.length}
                    </span>
                  )}
                  <span className=" font-semibold  cursor-pointer">Cart</span>
                </div>
              </Link>
              {/* account section */}
              <div
                className="relative cursor-pointer sm:hover:text-accent "
                onMouseOver={(e) => handleMenuDisplay(e)}
                onMouseLeave={() => {
                  setShowMinMenu(false);
                }}
                ref={accountSectionRef}
              >
                <div
                  className="flex hamburger-small hover:bg-secondary w-full h-full p-2 sm:p-0 sm:hover:bg-transparent"
                  onClick={() => {
                    setShowMinMenu(true);
                  }}
                >
                  <MdAccountCircle className="text-2xl cursor-pointer  sm:ml-4 mr-1" />
                  <span className="font-semibold sm:ml-1 inline-block max-w-[100px] overflow-hidden text-ellipsis">
                    {username ? username : "Account"}
                  </span>
                </div>
                {/* menu list */}
                {userInfo && userInfo.username ? (
                  <ul
                    ref={listRef}
                    className={
                      showMinMenu
                        ? "account-menu sub-menu"
                        : "account-menu sub-menu hidden"
                    }
                  >
                    <Link to="/account/profile">
                      <li
                        onClick={() => {
                          setShowMenu(false);
                        }}
                        className="px-2 py-1 hover:bg-secondary hover:cursor-pointer"
                      >
                        profile
                      </li>
                    </Link>
                    <Link to="/account/orders">
                      <li
                        onClick={() => {
                          setShowMenu(false);
                        }}
                        className="px-2 py-1 hover:bg-secondary hover:cursor-pointer"
                      >
                        order history
                      </li>
                    </Link>
                    {/* signout */}
                    <li
                      onClick={() => {
                        setShowMenu(false);
                        handleSignOut();
                      }}
                      className="px-2 py-1 hover:bg-secondary hover:cursor-pointer"
                    >
                      signout
                    </li>
                  </ul>
                ) : (
                  <ul
                    ref={listRef}
                    className={
                      showMinMenu
                        ? "account-menu sub-menu"
                        : "account-menu sub-menu hidden"
                    }
                  >
                    <Link to="/account/signin">
                      <li
                        onClick={() => {
                          setShowMenu(false);
                        }}
                        className="px-2 py-1 hover:bg-secondary hover:cursor-pointer"
                      >
                        signin
                      </li>
                    </Link>
                    <Link to="/account/signup">
                      <li
                        onClick={() => {
                          setShowMenu(false);
                        }}
                        className="px-2 py-1 hover:bg-secondary hover:cursor-pointer"
                      >
                        signup
                      </li>
                    </Link>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex sm:items-center   ">
              {/* category section */}
              <div className="category-section flex items-center font-semibold mr-3 cursor-pointer hover:text-accent">
                <BiCategoryAlt className="font-bold text-2xl" />
                <span>Categories</span>
              </div>

              {/* cart */}
              <Link to="/cart ">
                <div className="cart relative  flex cursor-pointer hover:text-accent  p-2 ">
                  <TiShoppingCart className="text-2xl cursor-pointer hover:text-accent" />
                  {state.cart.cartItems && state.cart.cartItems.length > 0 && (
                    <span className="absolute bottom-1/2   left-3/4 bg-secondary  text-white w-7 h-7 text-base   text-center sleading-6 rounded-full">
                      {/* {state.cart.cartItems.length > 99
                        ? 99 + "+"
                        : state.cart.cartItems.length} */}
                      {state.cart.cartItems.reduce(
                        (a, b) => a + b.quantity,
                        0
                      ) > 99
                        ? 99 + "+"
                        : state.cart.cartItems.reduce(
                            (a, b) => a + b.quantity,
                            0
                          )}
                    </span>
                  )}
                  <span className=" font-semibold cursor-pointer hover:text-accent">
                    Cart
                  </span>
                </div>
              </Link>
              {/* account section */}
              <div className="account-section relative">
                <div
                  ref={accountRef}
                  className="flex  cursor-pointer hover:text-accent  hover:bg-transparent "
                  onClick={() => {
                    setShowAccountMenu(!showAccountMenu);
                  }}
                >
                  <MdAccountCircle className="text-2xl cursor-pointer  ml-4" />
                  <span className="font-semibold ml-1 inline-block max-w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {username ? username : "Account"}
                  </span>
                </div>
                {/* list */}
                {showAccountMenu && userInfo && userInfo.username ? (
                  <ul className="capitalize font-medium absolute -right-2 top-[150%] bg-primary-200 w-[150px]">
                    <Link to="/account/profile">
                      <li className="px-2 py-1 hover:bg-secondary hover:cursor-pointer">
                        profile
                      </li>
                    </Link>
                    <Link to="/account/orders">
                      <li className="px-2 py-1 hover:bg-secondary hover:cursor-pointer">
                        order history
                      </li>
                    </Link>
                    {/* signout */}
                    <li
                      onClick={handleSignOut}
                      className="px-2 py-1 hover:bg-secondary hover:cursor-pointer"
                    >
                      signout
                    </li>
                  </ul>
                ) : (
                  showAccountMenu && (
                    <ul className="capitalize font-medium absolute -right-2 top-[150%] bg-primary-200 w-[150px]">
                      <Link to="/account/signin">
                        <li className="px-2 py-1 hover:bg-secondary hover:cursor-pointer">
                          signin
                        </li>
                      </Link>
                      <Link to="/account/signup">
                        <li className="px-2 py-1 hover:bg-secondary hover:cursor-pointer">
                          signup
                        </li>
                      </Link>
                    </ul>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
