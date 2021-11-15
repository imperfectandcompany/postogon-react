// utils/API.js

import axios from "axios";

export default axios.create({
  baseURL: "https://api.postogon.com/",
  responseType: "json"
});