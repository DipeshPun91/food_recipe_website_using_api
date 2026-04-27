import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://food-recipe-backend-2ps7.onrender.com/api",
  withCredentials: true,
});
