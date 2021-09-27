import React, {useState, useRef, useCallback, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {formatMessage} from "devextreme/localization";

import PasswordGenerator from "../PasswordGenerator/PasswordGenerator";
import {changePassword} from "../../api/auth";

import "./ChangePasswordForm.scss";
import {FetchData} from "../../api/pages-fetch";
import {urlAnonymous} from "../../api/url-config";
import notify from "devextreme/ui/notify";

export default function ChangePasswordForm() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const formData = useRef({});
  const [token, setToken] = useState("");

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const {password} = formData.current;
      setLoading(true);

      if (token) {
        const result = await changePassword(password, token);
        setLoading(false);

        if (result.isOk) {
          notifyPopup(
            "msgSuccessPassChange",
            "#login-start-form-container",
            "success",
            3000
          );

          return history.push("/login");
        }

        notifyPopup(result.message);
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

      getTokenFromUrl();

      if (!token) return;

      const isTokenValid = await checkTokenData;

      if (isTokenValid.VBErr) {
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

  return (
    <PasswordGenerator
      onSubmit={onSubmit}
      loadingState={loading}
      formData={formData.current}
    />
  );
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
