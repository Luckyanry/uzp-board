import React, {useState, useRef, useCallback, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {formatMessage} from "devextreme/localization";
import notify from "devextreme/ui/notify";

import {changePassword} from "../../api/auth";
import {FetchData} from "../../api/pages-fetch";
import {urlAnonymous} from "../../api/url-config";
import {setToSessionStorege} from "../../helpers/functions";
import {ErrorPopup, Spinner, PasswordGenerator} from "..";
// import PasswordGenerator from "../PasswordGenerator/PasswordGenerator";

import "./ChangePasswordForm.scss";

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [token, setToken] = useState("");

  const history = useHistory();
  const formData = useRef({});

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      const {password} = formData.current;

      if (token) {
        const result = await changePassword(password, token);
        const {isOk, message, errorAPIMsg} = result;

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
        setErrorTitle(formatMessage(message));
        // notifyPopup(message);
      }
    },
    // eslint-disable-next-line
    [history, token]
  );

  useEffect(() => {
    async function checkToken() {
      const checkTokenData = FetchData(
        "/change-password",
        "w_CheckResetPasswordTokenExpired",
        "wisdb",
        urlAnonymous
      ).signInUserData({"@resetToken": token}, "POST");
      setLoading(true);

      getTokenFromUrl();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const isTokenValid = await checkTokenData;
        setLoading(false);

        if (isTokenValid.VBErr) {
          console.log(`isTokenValid.VBErr`, isTokenValid.VBErr);
          notifyPopup(isTokenValid.VBErr.Description);
        }

        if (!isTokenValid.tokenValid) {
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
        setErrorTitle(formatMessage("msgErrFaildToResetPass"));
      }
    }

    checkToken();
    // eslint-disable-next-line
  }, [token, history]);

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

    const getTokenFromUrl = urlSearchResult.substr(-36);
    setToken(getTokenFromUrl);
  }

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

  const errorMessage = errorStatus ? (
    <ErrorPopup
      errorState={errorStatus}
      errorTitle={errorTitle}
      popupPositionOf={"#change-password-form"}
    />
  ) : null;

  const spinner = loading ? (
    <Spinner loadingState={loading} positionOf={"#content"} />
  ) : null;

  return (
    <div id="change-password-form">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}
