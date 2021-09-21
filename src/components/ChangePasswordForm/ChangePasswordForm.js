import React, {useState, useRef, useCallback, useEffect} from "react";
import {useHistory} from "react-router-dom";

import notify from "devextreme/ui/notify";

import PasswordGenerator from "../PasswordGenerator/PasswordGenerator";
import {changePassword} from "../../api/auth";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./ChangePasswordForm.scss";
import {FetchData} from "../../api/pages-fetch";
import {urlAnonymous} from "../../api/url-config";

export default function ChangePasswordForm(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const formData = useRef({});
  const [token, setToken] = useState("");

  const {formatMessage} = useLocalization();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const {password} = formData.current;
      setLoading(true);

      if (token) {
        const result = await changePassword(password, token);
        setLoading(false);

        result.isOk ? history.push("/login") : notifyPopup(result.message);
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
      ).signInUserData;

      const urlSearchResult = history.location.search;
      const checkStringForToken = urlSearchResult.includes("resetToken");

      if (!checkStringForToken) {
        setLoading(false);
        return notifyPopup(
          "msgErrMissedTokenOnResetForm",
          "#change-password-form-container"
        );
      }

      const getTokenFromUrl = urlSearchResult.substr(-36);
      setToken(getTokenFromUrl);

      if (!token) return;

      const isTokenValid = await checkTokenData._loadFunc(
        {"@resetToken": token},
        "POST"
      );

      if (isTokenValid.VBErr) {
        notifyPopup(isTokenValid.VBErr.Description);
        return {
          isOk: false,
        };
      }

      if (!isTokenValid.tokenValid) {
        notifyPopup(
          "msgErrTokenHasExpired",
          "#change-password-form-container",
          4000
        );
        history.push("/login");
        return {
          isOk: false,
        };
      }
    }

    checkToken();
    // eslint-disable-next-line
  }, [history, token]);

  function notifyPopup(
    message,
    containerId = "#login-start-form-container",
    duration = 3000
  ) {
    notify(
      {
        message: formatMessage(message),
        position: {
          my: "center bottom",
          at: "center",
          of: containerId,
          offset: "0 36",
        },
        width: 428,
        height: 66,
        shading: true,
      },
      "error",
      duration
    );
  }

  return (
    <PasswordGenerator
      onSubmit={onSubmit}
      loadingState={loading}
      formData={formData.current}
    />
  );
}
