import axios from "axios";
const instance = axios.create({
  baseURL: "https://stark-shelf-91723.herokuapp.com/api/",
});

export default instance;
