import payment from "../assets/payment-img.png";

const Footer = () => {
  const timeStamp = Date.now();
  const date = new Date(timeStamp);
  const day = date.getFullYear();
  return (
    <div className="footer h-[20vh] bg-primary-200 text-white flex flex-col items-center justify-center">
      <div className="row-one">
        <p className="font-bold text-center ">
          <span className="font-thin mr-1">&copy;</span>
          {day} Emmanuel Quaye Kontoh{" "}
          <span className="font-thin whitespace-nowrap">
            All Rights Reserved
          </span>
        </p>
      </div>
      <div className="row-two">We support</div>
      <div className="row-three mt-2">
        <img src={payment} alt="supported payments " />
      </div>
    </div>
  );
};

export default Footer;
