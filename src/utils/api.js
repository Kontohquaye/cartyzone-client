import Axios from "axios";

const backendInstance = Axios.create({
  baseURL: "http://localhost:5000",
});

export default backendInstance;
