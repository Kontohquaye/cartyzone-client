import { Link, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const SignIn = () => {
  const { search } = useLocation();
  const searchUrl = new URLSearchParams(search);
  const redirectUrl = searchUrl.get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const [showPassword, setShowPassword] = useState(false);
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
              type="email"
              name="email"
              id="email"
              className="border-[1px] border-accent p-2 bg-white"
            />
          </div>
          {/* password */}
          <div className="password flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password :
            </label>
            <div className="input relative ">
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                id="password"
                className="border-[1px] border-accent p-2  mb-4 w-full"
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
            </div>
          </div>

          <button className="bg-primary-200 text-white font-semibold p-2 hover:opacity-70">
            Sign In
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
