import { apiUrl } from "../config.json";
import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/user/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login({ email, password }) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });

  localStorage.setItem(tokenKey, jwt);
}

export async function change({ email }) {
  const { data } = await http.post(apiUrl + "/user/change-request", { email });

  return data;
}

export async function changePass({ token, password }) {
  const { data } = await http.post(apiUrl + "/user/changePass", {
    token,
    new_password: password,
  });

  return data;
}

export async function enableTwoFactor({ code }) {
  const { data } = await http.post(apiUrl + "/user/enable2fa", {
    code,
  });
  return data;
}

export async function disableTwoFactor({ code }) {
  const { data } = await http.post(apiUrl + "/user/disable2fa", {
    code,
  });
}

export async function twoFactorLogin({ email, password, code }) {
  const { data: jwt } = await http.post(apiUrl + "/user/2falogin", {
    email,
    password,
    code,
  });
  localStorage.setItem("email", "");
  localStorage.setItem("password", "");
  localStorage.setItem(tokenKey, jwt);
}

export async function changePassword({ oldPassword, newPassword }) {
  return await http.post(apiUrl + "/user/changepassword", {
    oldPassword,
    newPassword,
  });
}

export async function changeEmail({ email }) {
  return await http.put(apiUrl + "/user/changemail", {
    email,
  });
}

export async function register(dt) {
  const { data } = await http.post(apiUrl + "/user/register", dt);

  return data;
}

export async function checkPassword({ email, password }) {
  const { data } = await http.post(apiUrl + "/user/checkpassword", {
    email,
    password,
  });
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
  return data.is_2fa;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return {
      bag: {},
    };
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function isAdmin() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user.isAdmin;
  } catch (error) {
    return false;
  }
}

export function addOnline() {
  return http.post(apiUrl + "/addonline");
}

export function minusOnline() {
  return http.post(apiUrl + "/minusonline");
}

export default {
  login,
  getJwt,
  logout,
  getCurrentUser,
  loginWithJwt,
  isAdmin,
};
