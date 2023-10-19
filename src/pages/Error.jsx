import { useNavigate, useRouteError } from "react-router-dom";
import NotFound from "../assets/404 Error-rafiki.svg";

const Error = () => {
  const error = useRouteError();

  const navigate = useNavigate();

  return (
    <div className="error flex flex-col items-center justify-center">
      <img className="w-full h-[70vh]" src={NotFound} alt="404 Not found" />
      <div className="error-info flex flex-wrap justify-center">
        <p className="text-secondary underline font-semibold text-center">
          {error.message ? error.message : error.data}
        </p>

        <button
          className="ml-1 underline text-blue-500"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Error;
