import JwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST } from "../utils/constants";

export function loginApi(user) {
  const url = `${API_HOST}/login`;
  const userTemp = {
    ...user,
    email: user.email.toLocaleLowerCase().replace(/ /g, ""),
  };
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userTemp),
  };
  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return { code: 400, message: "email o password incorrecto" };
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
export async function getToken() {
  try {
    const token = await AsyncStorage.getItem("@token");
    return token;
  } catch (error) {
    console.log(error);
  }
}
export async function logout() {
  try {
    await AsyncStorage.removeItem("@token");
  } catch (error) {
    console.log(error);
  }
}
export async function isUserLoggedApi() {
  const token = await getToken();
  if (!token) {
    logout();
    return null;
  }
  if (isExpiredToken(token)) {
    logout();
  }
  return JwtDecode(token);
}
export function isExpiredToken(token) {
  const { expirate } = JwtDecode(token);
  const expire = expirate * 1000;
  const timeOut = expire - Date.now();
  if (timeOut < 0) {
    return true;
  }
  return false;
}
export function registerApi(data) {
  const url = `${API_HOST}/registro`;
  const User_temp = {
    ...data,
    email: data.email.toLowerCase(),
    fechaN: new Date(data.fechaN),
  };
  delete User_temp.repeat_password;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(User_temp),
  };
  return fetch(url, params)
    .then((response) => {
      if (response.status === 400) {
        return { message: "Email invalido", code: 400 };
      } else {
        return { message: "Email valido", code: 201 };
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
