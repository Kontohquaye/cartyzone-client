import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";

// api
import backendInstance from "../utils/api";

// context import
import { Store } from "../services/Store";

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_FETCH":
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

const SignUp = () => {
  const { state, ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });

  // checkuser
  useEffect(() => {
    userInfo && userInfo.length > 0
      ? redirect
        ? navigate(redirect)
        : navigate("/")
      : redirect
      ? navigate(`/account/signup?redirect=${redirect}`)
      : navigate("/account/signup");
  }, [navigate, userInfo, redirect]);

  // details
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  // signup handler
  const handleSignUp = async (e) => {
    setPasswordMatch(true);
    e.preventDefault();
    // signup fetch
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      dispatch({ type: "RESET" });
    } else {
      setPasswordMatch(true);
      // fetch
      try {
        dispatch({ type: "SIGNUP_FETCH" });
        const {
          data: { user },
        } = await backendInstance.post(
          "/api/users/signup",
          {
            username: userName.toLowerCase(),
            email,
            password,
          },
          { withCredentials: true }
        );
        dispatch({ type: "FETCH_SUCCESS" });
        ctxDispatch({ type: "SIGNUP", payload: user });
        localStorage.setItem("userInfo", JSON.stringify(user));
        toast.success("signup successful");
        navigate(redirect ? redirect : "/");
      } catch (error) {
        const {
          response: { data },
        } = error;
        // console.log(data);
        dispatch({ type: "FETCH_FAILED", payload: data });
        toast.error("signup failed");
      }
    }
  };
  return (
    <div className="sign-in flex justify-center items-center min-h-[80vh] ">
      <div className="content  p-4 w-min flex flex-col gap-2 justify-center items-center ">
        <h1 className="font-bold text-2xl">Sign Up</h1>
        <form className="flex flex-col justify-center  ">
          {/* username */}
          <div
            className={
              error && error.username
                ? "username flex flex-col gap-1"
                : "username flex flex-col gap-1 mb-1"
            }
          >
            <label htmlFor="username" className="font-semibold">
              Username :
            </label>
            <input
              required={true}
              type="username"
              name="username"
              id="username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className={
                error && error.username
                  ? "border-[1px] border-secondary p-2 bg-white "
                  : "border-[1px] border-accent p-2 bg-white"
              }
            />
            {error && (
              <p className="text-center text-secondary font-semibold">
                {error.username}
              </p>
            )}
          </div>
          {/* email */}
          <div
            className={
              error && error.email
                ? "email flex flex-col gap-1"
                : "email flex flex-col gap-1 mb-1"
            }
          >
            <label htmlFor="email" className="font-semibold">
              Email :
            </label>
            <input
              required={true}
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={
                error && error.email
                  ? "border-[1px] border-secondary p-2 bg-white "
                  : "border-[1px] border-accent p-2 bg-white"
              }
            />
            {error && (
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={
                  error && error.username
                    ? "border-[1px] border-secondary p-2 bg-white w-full"
                    : "border-[1px] border-accent p-2 bg-white mb-1 w-full"
                }
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
              {error && (
                <p className="text-center text-secondary font-semibold">
                  {error.password}
                </p>
              )}
            </div>
          </div>
          {/* confirm password */}
          <div className="confirm-password flex flex-col gap-1">
            <label htmlFor="confirmpassword" className="font-semibold">
              Confirm Password :
            </label>
            <div className="input relative ">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required={true}
                name="confirmPassword"
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="border-[1px] border-accent p-2  mb-1 w-full"
              />
              {/* icon */}
              {showConfirmPassword ? (
                <AiFillEyeInvisible
                  className="text-2xl absolute top-2 right-1"
                  onClick={() => {
                    setShowConfirmPassword(false);
                  }}
                />
              ) : (
                <AiFillEye
                  className="text-2xl absolute top-2 right-1"
                  onClick={() => {
                    setShowConfirmPassword(true);
                  }}
                />
              )}
            </div>
            {!passwordMatch && (
              <p className="text-center text-secondary font-semibold mb-2">
                password doesn't match
              </p>
            )}
          </div>

          <button
            onClick={(e) => {
              handleSignUp(e);
            }}
            className="bg-primary-200 text-white font-semibold p-2 hover:opacity-70"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <div className="info font-light text-center">
            Have an account?
            <Link
              to={
                redirect
                  ? `/account/signin?redirect=${redirect}`
                  : "/account/signin"
              }
            >
              <span className="text-blue-600 hover:underline font-semibold">
                Sign In
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
