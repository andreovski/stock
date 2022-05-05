import { secureToken } from "../services/api"

export const getRefreshToken = () => {
  return localStorage.getItem("@stock.on/refreshToken")
}

export const removeRefreshToken = () => {
  localStorage.removeItem("@stock.on/refreshToken")
  localStorage.removeItem("@stock.on/auth")
}

export const validateRefreshToke = ({ refreshToken }) => {
  if (!refreshToken) return

  return secureToken.post("token", {
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  })
}
