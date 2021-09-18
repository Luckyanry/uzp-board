import React, {useState, useRef, useCallback} from "react";
import {useHistory} from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule,
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
import notify from "devextreme/ui/notify";

import {resetPassword} from "../../api/auth";
import {useLocalization} from "../../contexts/LocalizationContext";
import "./ResetPasswordForm.scss";

const submitButtonAttributes = {class: "submit-button"};

export default function ResetPasswordForm(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const formData = useRef({});

  const {formatMessage} = useLocalization();

  const emailEditorOptions = {
    stylingMode: "filled",
    placeholder: formatMessage("msgEnterEmail"),
    mode: "email",
    elementAttr: {class: "form-input"},
    height: 64,
  };
  console.log(`ResetPasswordForm props `, props);
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const {email} = formData.current;
      setLoading(true);
      console.log(`ResetPasswordForm email: `, email);
      const result = await resetPassword(email);
      setLoading(false);

      if (result.isOk) {
        history.push("/login");
        notify(formatMessage("msgResetNotificationText"), "success", 2500);
      } else {
        notify(result.message, "error", 2000);
      }
    },
    // eslint-disable-next-line
    [history]
  );

  return (
    <form className={"reset-password-form"} onSubmit={onSubmit}>
      <Form
        formData={formData.current}
        disabled={loading}
        showColonAfterLabel={false}
        showRequiredMark={false}
      >
        <Item
          dataField={"email"}
          editorType={"dxTextBox"}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message={formatMessage("msgRequiredEmail")} />
          <EmailRule message={formatMessage("msgEmailFieldIsInvalid")} />
          <Label visible={true} text={formatMessage("msgEmail")} />
        </Item>

        <ButtonItem>
          <ButtonOptions
            elementAttr={submitButtonAttributes}
            width={"100%"}
            height={64}
            type={"default"}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {loading ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                formatMessage("msgSendEmailBtn")
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
      </Form>
    </form>
  );
}
