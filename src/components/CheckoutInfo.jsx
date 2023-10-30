const CheckoutInfo = ({ data }) => {
  const {
    error,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    country,
    setCountry,
    countries,
    address,
    setAddress,
    city,
    setCity,
    postalCode,
    setPostalCode,
    cartItems,
  } = data;
  return (
    <div className="details grid  overflow-y-auto">
      <div className="checkout-info ">
        <div className="billing">
          <h2 className="mt-8 text-lg font-bold">Billing Details</h2>
          {/* name */}
          <form>
            <div className="name  ">
              <div className="first-name basis-1/2">
                <label htmlFor="firstname" className="text-sm font-bold">
                  First Name <span className=" text-secondary ">*</span>
                </label>
                {error && error.firstName ? (
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={firstName}
                    placeholder={error.firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    className="bg-img border border-secondary focus:outline-slate-400 w-full py-1 px-2"
                  />
                ) : (
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                  />
                )}
              </div>
              <div className="last-name basis-1/2 mt-4">
                <label htmlFor="lastname" className="text-sm font-bold">
                  Last Name <span className=" text-secondary">*</span>
                </label>
                {error && error.lastName ? (
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={lastName}
                    placeholder={error.lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    className="bg-img border border-secondary focus:outline-slate-400 w-full py-1 px-2"
                  />
                ) : (
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                  />
                )}
              </div>
            </div>
            {/* email and phone */}
            <div className="email-phone mt-4 ">
              <div className="email basis-1/2 ">
                <label htmlFor="email" className="text-sm font-bold">
                  Email
                </label>
                {error && error.email ? (
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="email is not a valid email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="bg-img border border-secondary focus:outline-slate-400 w-full py-1 px-2"
                  />
                ) : (
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                  />
                )}
              </div>
              <div className="phone basis-1/2 mt-4">
                <label htmlFor="phone" className="text-sm font-bold">
                  Phone <span className=" text-secondary">*</span>
                </label>
                {error && error.phone ? (
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={phone}
                    placeholder={error.phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className="bg-img border border-secondary focus:outline-slate-400 w-full py-1 px-2"
                  />
                ) : (
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                  />
                )}
              </div>
            </div>
            {/* country */}
            <div className="country mt-4">
              <label htmlFor="country" className="text-sm font-bold">
                Country <span className=" text-secondary">*</span>
              </label>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                className="bg-img focus:outline-slate-400 w-full py-1 px-2"
              >
                {countries.map((country) => (
                  <option value={country} key={country} className="bg-white ">
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {/* address */}
            <div className="address mt-4">
              <label htmlFor="address" className="text-sm font-bold">
                Address <span className=" text-secondary">*</span>
              </label>
              {error && error.address ? (
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  placeholder={error.address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className="bg-img border border-secondary focus:outline-slate-400 w-full py-1 px-2"
                />
              ) : (
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                />
              )}
            </div>
            {/* city /town - postal code */}
            <div className="city-postal mt-4 ">
              <div className="city-code basis-1/2">
                <label htmlFor="city" className="text-sm font-bold">
                  City <span className=" text-secondary">*</span>
                </label>
                {error && error.city ? (
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    placeholder={error.city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    className="bg-img border-secondary border focus:outline-slate-400 w-full py-1 px-2"
                  />
                ) : (
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    className="bg-img focus:outline-slate-400 w-full py-1 px-2"
                  />
                )}
              </div>
              <div className="postal basis-1/2 mt-4">
                <label htmlFor="postal" className="text-sm font-bold">
                  Postcode/ZIP <span className=" text-secondary">*</span>
                </label>
                {error && error.postalCode ? (
                  <input
                    type="text"
                    name="postal"
                    id="postal"
                    value={postalCode}
                    placeholder={error.postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                    className="bg-img border-secondary border focus:outline-slate-400 w-full py-1 px-2 "
                  />
                ) : (
                  <input
                    type="text"
                    name="postal"
                    id="postal"
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                    className="bg-img focus:outline-slate-400 w-full py-1 px-2 "
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="order">
        <h1 className="mt-8  text-lg font-bold">Your order</h1>
        <div className="order-table overflow-y-auto max-h-[385px]">
          {/* heaader */}
          <div className="title flex justify-between bg-img py-2 items-center px-3 font-bold text-sm">
            <p className="basis-1/2">PRODUCT</p>
            <p className="basis-1/2">TOTAL</p>
          </div>
          {/* content */}
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((product) => (
              <div
                className="product flex items-center justify-between w-full"
                key={product._id}
              >
                <div className="left basis-1/2 py-2 px-3 bg-[#f5f5f5]">
                  {product.name}
                  <span className="pl-1 font-medium font-poppins">
                    x{product.quantity}
                  </span>
                </div>
                <div className="right basis-1/2 py-2 pl-2 font-poppins font-light">
                  $ {(product.price * product.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          {/* total */}
          <div className="total flex">
            <p className="basis-1/2 pl-3 py-2 bg-[#f5f5f5]  font-bold">Total</p>
            <p className="basis-1/2 pl-2 py-2 font-poppins font-semibold">
              ${" "}
              {cartItems
                .reduce((a, b) => a + b.quantity * b.price, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutInfo;
