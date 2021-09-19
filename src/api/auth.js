import {defaultUser} from "../utils/default-user";
import {FetchData} from "./pages-fetch";

const baseUrl = "https://uz.is.in.ua";

export async function signIn(login = "", password = "") {
  try {
    const signInUserData = FetchData(
      "/login-form",
      "w_CheckLogin",
      "wisdb",
      baseUrl,
      "login"
    ).signInUserData;

    const result = await signInUserData._loadFunc(login, password);
    console.log(`auth.js signIn result `, result);

    return {
      isOk: true,
      data: result.data[0],
    };
  } catch {
    return {
      isOk: false,
      message: "Authentication failed",
    };
  }
}

export async function getUser() {
  try {
    // Send request
    console.log(`getUser start`);
    return {
      // isOk: true,
      // data: defaultUser,
      isOk: false,
      data: {},
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to create account",
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}
