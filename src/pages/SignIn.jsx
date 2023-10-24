import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useEffect, useReducer, useState } from "react";

// store
import { Store } from "../services/Store";

// api
import backendInstance from "../utils/api";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN_FETCH":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { loading: false, error: "" };
    case "FETCH_FAILED":
      // console.log(action.payload);
      return { loading: false, error: { ...action.payload } };
    case "RESET":
      // console.log(action.payload);
      return { loading: false, error: "" };
    default:
      return { state };
  }
};

const SignIn = () => {
  const { search } = useLocation();
  const { state, ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const { userInfo } = state;
  const searchUrl = new URLSearchParams(search);
  const redirectUrl = searchUrl.get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });

  // user singned in
  useEffect(() => {
    userInfo && userInfo.username
      ? redirect
        ? navigate(redirect)
        : navigate("/")
      : redirect
      ? navigate(`/account/signin?redirect=${redirect}`)
      : navigate("/account/signin");
  }, [navigate, userInfo, redirect]);

  // sign in functionality
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "SIGNIN_FETCH" });
      const {
        data: { user },
      } = await backendInstance.post(
        "/api/users/account/signin",
        { email: email.toLowerCase(), password },
        { withCredentials: true }
      );
      dispatch({ type: "FETCH_SUCCESS" });
      localStorage.setItem("userInfo", JSON.stringify(user));
      console.log(user);
      ctxDispatch({ type: "SIGNIN", payload: user });
      dispatch({ type: "RESET" });
      toast.success("signin successful");
      navigate(redirect ? redirect : "/");
    } catch (err) {
      const {
        response: {
          data: { error },
        },
      } = err;
      // console.log(error);
      dispatch({ type: "FETCH_FAILED", payload: error });
    }
  };
  return (
    <div className="sign-in flex justify-center items-center min-h-[70vh] ">
      <div className="content  p-4 w-min flex flex-col gap-2 justify-center items-center ">
        <h1 className="font-bold text-2xl">Sign In</h1>
        <form className="flex flex-col justify-center  ">
          {/* email */}
          <div className="email flex flex-col gap-1 mb-4">
            <label htmlFor="email" className="font-semibold">
              Email :
            </label>
            <input
              required={true}
              type="email"
              name="email"
              id="email"
              className={
                error && error.email
                  ? "border-[1px] border-secondary p-2 bg-white"
                  : "border-[1px] border-accent p-2 bg-white"
              }
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {error && error.email && (
              <p className="text-center text-secondary font-semibold">
                {error.email}
              </p>
            )}
          </div>
          {/* password */}
          <div className="password flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password :
            </label>
            <div className="input relative ">
              <input
                type={showPassword ? "text" : "password"}
                required={true}
                name="password"
                id="password"
                className={
                  error && error.password
                    ? "border-[1px] border-secondary p-2 bg-white w-full mb-1"
                    : "border-[1px] border-accent p-2 bg-white w-full mb-4"
                }
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {/* icon */}
              {showPassword ? (
                <AiFillEyeInvisible
                  className="text-2xl absolute top-2 right-1"
                  onClick={() => {
                    setShowPassword(false);
                  }}
                />
              ) : (
                <AiFillEye
                  className="text-2xl absolute top-2 right-1"
                  onClick={() => {
                    setShowPassword(true);
                  }}
                />
              )}
              {error && error.password && (
                <p className="text-center text-secondary font-semibold">
                  {error.password}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              handleSignIn(e);
            }}
            className="bg-primary-200 text-white font-semibold p-2 hover:opacity-70"
          >
            {loading ? "Signing in" : "Sign In"}
          </button>
          <div className="info font-light text-center">
            Don't have an account?
            <Link to={`/account/signup?redirect=${redirect}`}>
              <span className="text-blue-600 hover:underline font-semibold">
                Sign Up
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
