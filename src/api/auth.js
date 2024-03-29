import {getFromSessionStorege, setToSessionStorege} from "../helpers/functions";
import {FetchData} from "./pages-fetch";
import {urlAnonymous, urlADauth} from "./url-config";

let getUserUGID = null;

export async function signIn(login = null, password = null) {
  const url = login && password ? urlAnonymous : urlADauth;
  sessionStorage.setItem("sessionURL", url);

  const getPrefLocaleFromStorage = sessionStorage.getItem("language");

  try {
    const signInUserData = FetchData(
      "/login-form",
      "w_CheckLogin",
      "wisdb",
      url,
      "login"
    ).signInUserData(
      {
        "@uname": login,
        "@old": password,
        "@prefLocale": getPrefLocaleFromStorage,
      },
      "POST"
    );

    const result = await signInUserData;

    if (result.UGID) {
      const checkForUGID = Object.keys(result).includes("UGID");
      const checkForErrorNum = Object.values(result).includes(153649);

      getUserUGID = checkForErrorNum && checkForUGID ? result.UGID : null;

      return {
        isOk: false,
        Alert: result.Alert,
        NativeError: result.NativeError,
      };
    }

    setToSessionStorege("user", result.data[0]);

    return {
      isOk: true,
      data: result.data[0],
    };
  } catch (err) {
    return {
      isOk: false,
      message: "msgErrAuthFailed",
      errorAPIMsg: err,
    };
  }
}

export async function getUser() {
  try {
    const result = getFromSessionStorege("user", "");

    if (result) {
      return {
        isOk: true,
        data: result,
      };
    } else {
      return {
        isOk: false,
      };
    }
  } catch (err) {
    return {
      isOk: false,
      errorAPIMsg: err,
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
    ).signInUserData({"@email": email}, "POST");

    const {tokenSended} = await resetPasswordData;

    if (tokenSended) {
      return {
        isOk: true,
      };
    }

    return {
      isOk: false,
      message: "msgErrEmailNotRegInUAIS",
    };
  } catch (err) {
    return {
      isOk: false,
      message: "msgErrFailedResetPass",
      errorAPIMsg: err,
    };
  }
}

export async function changePassword(password, resetToken) {
  try {
    await FetchData(
      "/change-password",
      "w_ChangePasswordByToken",
      "wisdb",
      urlAnonymous
    ).signInUserData({"@resetToken": resetToken, "@pwd": password}, "POST");

    return {
      isOk: true,
    };
  } catch (err) {
    return {
      isOk: false,
      message: "msgErrFaildToResetPass",
      errorAPIMsg: err,
    };
  }
}

export async function renewalPassword(oldPwd, newPwd) {
  if (!getUserUGID) return;

  try {
    await FetchData(
      "/renewal-password",
      "w_ChangePasswordByUGID",
      "wisdb",
      urlAnonymous
    ).signInUserData(
      {"@old": oldPwd, "@new": newPwd, "@UGID": getUserUGID},
      "POST"
    );

    return {
      isOk: true,
    };
  } catch (err) {
    return {
      isOk: false,
      message: "msgErrFaildToResetPass",
      errorAPIMsg: err,
    };
  }
}

export async function logOff() {
  try {
    await FetchData(
      "/log-off",
      "w_LogOff",
      "wisdb",
      urlAnonymous
    ).signInUserData();

    return {
      isOk: true,
    };
  } catch (err) {
    return {
      isOk: false,
      errorAPIMsg: err,
    };
  }
}
