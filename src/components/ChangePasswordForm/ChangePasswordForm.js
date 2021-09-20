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
      const {password} = formData.current;
      setLoading(true);

      const result = await changePassword(password, recoveryCode);
      setLoading(false);

      if (result.isOk) {
        history.push("/login");
      } else {
        notify(result.message, "error", 2000);
      }
    },
    [history, recoveryCode]
  );

  return (
    <PasswordGenerator
      onFormSubmit={onSubmit}
      loadingState={loading}
      formData={formData.current}
    />
  );
}
