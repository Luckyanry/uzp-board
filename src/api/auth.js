import {getFromSessionStorege, setToSessionStorege} from "../helpers/functions";
import {FetchData} from "./pages-fetch";
import {urlAnonymous, urlADauth} from "./url-config";

export async function signIn(login = null, password = null) {
  const url = login && password ? urlAnonymous : urlADauth;
  sessionStorage.setItem("sessionURL", url);

  try {
    const signInUserData = FetchData(
      "/login-form",
      "w_CheckLogin",
      "wisdb",
      url,
      "login"
    ).signInUserData;

    const result = await signInUserData._loadFunc({
      "@uname": login,
      "@old": password,
    });
    setToSessionStorege("user", result.data[0]);

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
    const result = getFromSessionStorege("user", null);

    if (result) {
      return {
        isOk: true,
        data: result,
      };
    } else
      return {
        isOk: false,
      };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function resetPassword(email) {
  try {
    const resetPasswordData = FetchData(
      "/reset-password",
      "w_ResetPasswordByEmail",
      "wisdb",
      urlAnonymous
    ).signInUserData;

    const result = await resetPasswordData._loadFunc({"@email": email}, "POST");

    if (result.tokenSended) {
      return {
        isOk: true,
      };
    }

    return {
      isOk: false,
      message: "Your email is not registered in the UAIS database!",
    };
  } catch {
    return {
      isOk: false,
      message:
        "Failed to reset password, something is wrong with request to send to server.",
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

export async function changePassword(password, recoveryCode) {
  try {
    console.log("password & recoveryCode ", password, recoveryCode);

    const changePasswordData = FetchData(
      "/change-password",
      "w_ChangePasswordByToken",
      "wisdb",
      urlAnonymous
    ).signInUserData;

    const checkTokenData = FetchData(
      "/change-password",
      "w_CheckResetPasswordTokenExpired",
      "wisdb",
      urlAnonymous
    ).signInUserData;

    const isTokenValid = await checkTokenData._loadFunc(
      {"@resetToken": recoveryCode},
      "POST"
    );

    if (!isTokenValid) {
      return {
        isOk: false,
        message:
          "The token has expired, please repeat the password recovery process again.",
      };
    }

    await changePasswordData._loadFunc(
      {"@resetToken": recoveryCode, "@pwd": password},
      "POST"
    );

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message:
        "Failed to reset password, something is wrong with request to send to server.",
    };
  }
}
