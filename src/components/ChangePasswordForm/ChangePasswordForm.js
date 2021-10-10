import React, {useState, useRef, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {formatMessage} from "devextreme/localization";
import notify from "devextreme/ui/notify";

import {changePassword} from "../../api/auth";
import {FetchData} from "../../api/pages-fetch";
import {urlAnonymous} from "../../api/url-config";
import {setToSessionStorege} from "../../helpers/functions";
import {
  // ErrorPopup,
  Spinner,
  PasswordGenerator,
} from "..";
// import PasswordGenerator from "../PasswordGenerator/PasswordGenerator";

import "./ChangePasswordForm.scss";

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  // const [errorTitle, setErrorTitle] = useState();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState(null);

  const history = useHistory();
  const formData = useRef({});

  useEffect(() => {
    let ignore = false;

    const getChangePassword = async () => {
      setLoading(true);

      if (token) {
        const result = await changePassword(password, token);
        const {
          isOk,
          // message,
          errorAPIMsg,
        } = result;

        setToSessionStorege("error", errorAPIMsg);
        setLoading(false);

        if (isOk) {
          notifyPopup(
            "msgSuccessPassChange",
            "#login-start-form-container",
            "success",
            3000
          );

          return history.push("/login");
        }

        setErrorStatus(true);
        // setErrorTitle(formatMessage(message));
      }
    };

    password && !ignore && getChangePassword();

    return () => {
      ignore = true;
      getChangePassword();
    };
  }, [token, password, history]);

  useEffect(() => {
    let ignore = false;

    const checkResetPasswordTokenExpired = async () => {
      const checkTokenData = FetchData(
        "/change-password",
        "w_CheckResetPasswordTokenExpired",
        "wisdb",
        urlAnonymous
      ).signInUserData({"@resetToken": token}, "POST");
      setLoading(true);

      !ignore && getTokenFromUrl();

      if (!token && !ignore) {
        setLoading(false);
        return;
      }

      try {
        const isTokenValid = await checkTokenData;
        setLoading(false);

        if (isTokenValid.VBErr && !ignore) {
          notifyPopup(isTokenValid.VBErr.Description);
        }

        if (!isTokenValid.tokenValid && !ignore) {
          history.push("/login");

          notifyPopup(
            "msgErrTokenHasExpired",
            "#login-start-form-container",
            "error",
            4000
          );
        }
      } catch (error) {
        setLoading(false);
        setToSessionStorege("error", error);

        setErrorStatus(true);
        // setErrorTitle(formatMessage("msgErrFaildToResetPass"));
      }
    };

    checkResetPasswordTokenExpired();

    function getTokenFromUrl() {
      const urlSearchResult = history.location.search;
      const checkStringForToken = urlSearchResult.includes("resetToken");

      if (!checkStringForToken) {
        notifyPopup(
          "msgErrMissedTokenOnResetForm",
          "#change-password-form-container",
          "error",
          4000
        );

        setLoading(false);
        history.push("/login");
        return;
      }

      const getToken = urlSearchResult.substr(-36);
      setToken(getToken);
    }

    return () => {
      checkResetPasswordTokenExpired();
      ignore = true;
    };
  }, [token, history]);

  const onSubmit = () => {
    const {password} = formData.current;

    setPassword(password);
  };

  function notifyPopup(
    message,
    containerId = "#login-start-form-container",
    type = "error",
    duration = 3000
  ) {
    notify(
      {
        message: formatMessage(message),
        position: {
          my: "center",
          at: "center",
          of: containerId,
          offset: "0 36",
        },
        width: 426,
        height: 80,
        shading: true,
      },
      type,
      duration
    );
  }

  const View = () => (
    <PasswordGenerator
      onSubmit={onSubmit}
      loadingState={loading}
      formData={formData.current}
    />
  );

  const content = !(loading || errorStatus) ? <View /> : null;

  // const errorMessage = errorStatus ? (
  //   <ErrorPopup
  //     errorState={errorStatus}
  //     popupPositionOf={"#change-password-form"}
  //     errorTitle={errorTitle}
  //   />
  // ) : null;

  const spinner = loading ? (
    <Spinner loadingState={loading} positionOf={"#content"} />
  ) : null;

  return (
    <div id="change-password-form">
      {/* {errorMessage} */}
      {spinner}
      {content}
    </div>
  );
}
