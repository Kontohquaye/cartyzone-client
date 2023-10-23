import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="sign-in flex justify-center items-center min-h-[80vh] ">
      <div className="content  p-4 w-min flex flex-col gap-2 justify-center items-center ">
        <h1 className="font-bold text-2xl">Sign Up</h1>
        <form className="flex flex-col justify-center  ">
          {/* username */}
          <div className="username flex flex-col gap-1 mb-4">
            <label htmlFor="username" className="font-semibold">
              Username :
            </label>
            <input
              type="username"
              name="username"
              id="username"
              className="border-[1px] border-accent p-2 bg-white"
            />
          </div>
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
          {/* confirm password */}
          <div className="confirm-password flex flex-col gap-1">
            <label htmlFor="confirmpassword" className="font-semibold">
              Confirm Password :
            </label>
            <div className="input relative ">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                name="confirmPassword"
                id="confirmpassword"
                className="border-[1px] border-accent p-2  mb-4 w-full"
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
          </div>

          <button className="bg-primary-200 text-white font-semibold p-2 hover:opacity-70">
            Sign Up
          </button>
          <div className="info font-light text-center">
            Have an account?
            <Link to="/signup">
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
