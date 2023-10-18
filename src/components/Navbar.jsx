import { TiShoppingCart } from "react-icons/ti";

const Navbar = () => {
  return (
    <div className="navbar bg-primary text-white">
      <nav className="max-w-[1200px] mx-auto pt-6 pb-1 px-2 flex justify-between items-center">
        {/* left- logo and category */}
        <div>
          {/* logo */}
          <h1 className="text-2xl italic cursor-pointer">
            C<span className="text-secondary">ar</span>tyzon
            <span className="text-secondary">e</span>
          </h1>
        </div>

        {/* right */}
        <div>
          {/* cart */}
          <div className="cart">
            <TiShoppingCart className="text-2xl cursor-pointer hover:text-accent" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
