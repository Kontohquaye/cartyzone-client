import Axios from "axios";
// live : https://cartyzone-api.onrender.com
// local http://localhost:5000
const backendInstance = Axios.create({
  baseURL: "http://localhost:5000",
});

export default backendInstance;
