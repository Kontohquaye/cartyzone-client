import { useContext, useReducer, useState } from "react";
import { toast } from "react-toastify";

// api
import backendInstance from "../utils/api";
// ctx
import { Store } from "../services/Store";

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_INFO":
      return { loading: true, error: false };
    case "UPDAT_SUCCESS":
      return { loading: false, error: false };
    case "UPDATE_ERROR":
      return { loading: false, error: true };
  }
};

const UpdatePassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {
    state: { userInfo },
  } = useContext(Store);

  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: false,
  });

  // update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      email.length === 0 ||
      password.length === 0 ||
      newPassword.length === 0
    ) {
      toast.warn("* fields are required");
    } else {
      if (password !== confirmPassword) {
        toast.info("old password don't match");
      } else {
        // fetch
        if (username.length > 0) {
          try {
            dispatch({ type: "UPDATE_INFO" });
            const {
              data: { message },
            } = await backendInstance.post(
              "/api/users/account/details/update",
              { username, password, newPassword, email },
              { withCredentials: true }
            );
            dispatch({ type: "UPDATE_SUCCESS" });
            // console.log(message);
            userInfo.username = username;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            window.location.reload();
            toast.success(message);
          } catch (err) {
            dispatch({ type: "UPDATE_ERROR" });

            const {
              response: {
                data: { message },
              },
            } = err;
            toast.error(message);
            console.log(err);
          }
        } else {
          try {
            dispatch({ type: "UPDATE_INFO" });

            const {
              data: { message },
            } = await backendInstance.post(
              "/api/users/account/details/update",
              { password, newPassword, email },
              { withCredentials: true }
            );
            dispatch({ type: "UPDATE_SUCCESS" });

            // console.log(data);
            toast.success(message);
          } catch (err) {
            dispatch({ type: "UPDATE_ERROR" });

            const {
              response: {
                data: { message },
              },
            } = err;
            toast.error(message);
            // console.log(err);
          }
        }
      }
    }

    // console.log("update");
  };
  return (
    <div className="update-email">
      <form className="flex flex-col  justify-center max-w-sm mx-auto gap-2 mt-4">
        <div className="email">
          <label htmlFor="email" className="font-bold">
            username
          </label>
          <input
            type="text"
            id="email"
            placeholder="change is optional"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block px-1 py-2 focus:outline-none bg-img w-full"
          />
        </div>
        <div className="email">
          <label htmlFor="email" className="font-bold">
            Email<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block px-1 py-2 focus:outline-none bg-img w-full"
          />
        </div>
        <div className="password">
          <label htmlFor="password" className=" font-bold">
            Old Password<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="block focus:outline-none px-1 py-2 bg-img w-full"
          />
        </div>
        <div className="c-password">
          <label htmlFor="c-password" className="font-bold">
            Confirm Password<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="new-password"
            className="block focus:outline-none bg-img w-full px-1 py-2"
          />
        </div>
        <div className="new-password">
          <label htmlFor="new-password" className="font-bold">
            New Password<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="new-password"
            className="block focus:outline-none bg-img w-full px-1 py-2"
          />
        </div>
        <div className="btn bg-primary-200 text-white font-bold text-center">
          <button onClick={handleUpdate} className="w-full h-full px-1 py-2">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
