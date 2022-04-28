import axios from "axios"

export const accounts = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1`,
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
})

export const secureToken = axios.create({
  baseURL: `https://securetoken.googleapis.com/v1/token`,
  method: "POST",
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
})
