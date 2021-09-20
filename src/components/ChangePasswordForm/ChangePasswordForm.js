import React, {useState, useRef, useCallback} from "react";
import {useHistory, useParams} from "react-router-dom";

import notify from "devextreme/ui/notify";
// import {formatMessage} from "devextreme/localization";

import PasswordGenerator from "../PasswordGenerator/PasswordGenerator";
import {changePassword} from "../../api/auth";

import "./ChangePasswordForm.scss";

export default function ChangePasswordForm(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const formData = useRef({});
  const {recoveryCode} = useParams();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(`CPF recoveryCode `, recoveryCode);
      console.log(`CPF formData `, formData);
      console.log(`CPF history`, history);

      const {password} = formData.current;
      setLoading(true);

      const result = await changePassword(password, recoveryCode);
      setLoading(false);

      if (result.isOk) {
        console.log(`result`, result);
        // history.push("/login");
      } else {
        notify(
          {
            message: result.message,
            position: {
              my: "center bottom",
              at: "center",
              of: "#change-password-form-container",
              offset: "0 236",
            },
            width: 428,
            height: 66,
            shading: true,
          },
          "error",
          3000
        );
      }
    },
    [history, recoveryCode]
  );

  return (
    <PasswordGenerator
      onSubmit={onSubmit}
      loadingState={loading}
      formData={formData.current}
    />
  );
}
