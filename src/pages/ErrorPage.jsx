import { Link } from "react-router-dom";
import errorImage from "../assets/404 Error-rafiki.svg";

const ErrorPage = () => {
  return (
    <div className="error w-full  overflow-hidden  h-full flex flex-col justify-center items-center">
      <div className="">
        <img
          src={errorImage}
          alt="error image"
          className="w-full max-h-[300px] object-contain"
        />
      </div>
      <p className="text-center">
        Back to{" "}
        <Link to="/" className="text-blue-600">
          Homepage
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
