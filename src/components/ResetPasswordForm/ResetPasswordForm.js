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
import {setToSessionStorege} from "../../helpers/functions";
import {ErrorPopup, Spinner} from "..";

import "./ResetPasswordForm.scss";

const submitButtonAttributes = {class: "submit-button"};

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorTitle, setErrorTitle] = useState();

  const history = useHistory();
  const formData = useRef({});

  const {formatMessage} = useLocalization();

  const emailEditorOptions = {
    stylingMode: "filled",
    placeholder: formatMessage("msgEnterEmail"),
    mode: "email",
    elementAttr: {class: "form-input"},
    height: 64,
  };

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      const {email} = formData.current;

      const result = await resetPassword(email);
      const {isOk, message, errorAPIMsg} = result;

      setToSessionStorege("error", errorAPIMsg);
      setLoading(false);

      if (!isOk && errorAPIMsg) {
        setErrorStatus(true);
        setErrorTitle(formatMessage(message));

        return;
      }

      if (!isOk && !errorAPIMsg) {
        return notify(
          {
            message: formatMessage(message),
            position: {
              my: "center",
              at: "center",
              of: "#reset-password-form-container",
              offset: "0 0",
            },
            width: 426,
            height: 64,
            shading: true,
          },
          "error",
          3000
        );
      }

      history.push("/login");

      notify(
        {
          message: formatMessage("msgResetNotificationText"),
          position: {
            my: "center",
            at: "center",
            of: "#login-start-form-container",
            offset: "0 0",
          },
          width: 428,
          height: 64,
          shading: true,
        },
        "success",
        4000
      );
    },
    // eslint-disable-next-line
    [history]
  );

  const View = () => (
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
  );

  const content = !(loading || errorStatus) ? <View /> : null;

  const errorMessage = errorStatus ? (
    <ErrorPopup
      errorState={errorStatus}
      errorTitle={errorTitle}
      popupPositionOf={"#reset-password-form-container"}
    />
  ) : null;

  const spinner = loading ? (
    <Spinner loadingState={loading} positionOf={"#content"} />
  ) : null;

  return (
    <form
      id="reset-password-form-container"
      className={"reset-password-form"}
      onSubmit={onSubmit}
    >
      {errorMessage}
      {spinner}
      {content}
    </form>
  );
}
