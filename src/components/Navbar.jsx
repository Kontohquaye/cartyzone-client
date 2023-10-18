import { TiShoppingCart } from "react-icons/ti";

const Navbar = () => {
  return (
    <div className="navbar bg-primary text-white">
      <nav className="max-w-[1200px] mx-auto pt-6 pb-1 flex justify-between">
        {/* left- logo and category */}
        <div>
          {/* logo */}
          <h1 className="text-2xl italic">
            C<span className="text-secondary">ar</span>tyzon
            <span className="text-secondary">e</span>
          </h1>
        </div>

        {/* right */}
        <div>
          {/* cart */}
          <div className="cart">
            <TiShoppingCart className="text-2xl" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
