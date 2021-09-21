import React, {useState, useRef, useCallback, useEffect} from "react";
import {useHistory} from "react-router-dom";

import notify from "devextreme/ui/notify";
// import {formatMessage} from "devextreme/localization";

import PasswordGenerator from "../PasswordGenerator/PasswordGenerator";
import {changePassword} from "../../api/auth";

import "./ChangePasswordForm.scss";
import {FetchData} from "../../api/pages-fetch";
import {urlAnonymous} from "../../api/url-config";

export default function ChangePasswordForm(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const formData = useRef({});
  const [token, setToken] = useState();
  // const {recoveryCode} = useParams();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const {password} = formData.current;
      setLoading(true);

      console.log(`CPF password`, password);

      const urlSearchResult = history.location.search;
      const checkStringForToken = urlSearchResult.includes("resetToken");

      if (!checkStringForToken) {
        setLoading(false);
        return notifyPopup(
          "Url parameters do not contain a token! Please use the link received in your email."
        );
      }

      const getTokenFromUrl = urlSearchResult.substr(-36);
      setToken(getTokenFromUrl);

      const result = await changePassword(password, token);
      setLoading(false);

      result.isOk ? history.push("/login") : notifyPopup(result.message);
    },
    [history, token]
  );

  useEffect(() => {
    async function chekcToken() {
      const checkTokenData = FetchData(
        "/change-password",
        "w_CheckResetPasswordTokenExpired",
        "wisdb",
        urlAnonymous
      ).signInUserData;

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
          "The token has expired, please repeat the password recovery process again."
        );
        return {
          isOk: false,
        };
      }
    }

    chekcToken();
  }, [token]);

  function notifyPopup(message) {
    notify(
      {
        message,
        position: {
          my: "center",
          at: "center",
          of: "#change-password-form-container",
          offset: "0 36",
        },
        width: 428,
        height: 66,
        shading: true,
      },
      "error",
      3000
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
