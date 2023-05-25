import Axios from "axios";

import { API_URL } from "../config";

console.log("base url ", API_URL);

export const axios = Axios.create({
  baseURL: API_URL,
});

// add interceptors later
