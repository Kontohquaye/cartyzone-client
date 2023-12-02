import Axios from "axios";
const Live = "https://cartyzone-api.onrender.com";
const Local = "http://localhost:5000";
const backendInstance = Axios.create({
  baseURL: Live,
});

export default backendInstance;
