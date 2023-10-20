import { useContext } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { Store } from "../services/Store";

const Navbar = () => {
  const { state } = useContext(Store);
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
        <div className="flex items-center">
          {/* cart */}
          <Link to="/cart">
            <div className="cart relative">
              <TiShoppingCart className="text-2xl cursor-pointer hover:text-accent" />
              {state.cart.cartItems && state.cart.cartItems.length > 0 && (
                <span className="absolute bottom-1/2 left-2/3 bg-secondary text-white w-7 h-7 text-center leading-6 rounded-full">
                  {state.cart.cartItems.length > 99
                    ? 99 + "+"
                    : state.cart.cartItems.length}
                </span>
              )}
            </div>
          </Link>
          {/* account section */}
          <div>
            <MdAccountCircle className="text-2xl cursor-pointer hover:text-accent ml-4" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
