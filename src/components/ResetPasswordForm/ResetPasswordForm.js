import React, {useState, useRef, useEffect} from "react";
import {useHistory} from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule,
} from "devextreme-react/form";
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
  const [email, setEmail] = useState(null);

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

  useEffect(() => {
    let ignore = false;

    email &&
      (async () => {
        setLoading(true);

        const result = await resetPassword(email);
        const {isOk, message, errorAPIMsg} = result;

        if (!ignore) {
          setToSessionStorege("error", errorAPIMsg);
          setLoading(false);
        }

        if (!isOk && errorAPIMsg && !ignore) {
          setLoading(false);
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
      })();

    return () => {
      ignore = true;
    };
  }, [email, history, formatMessage]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const {email} = formData.current;

    setEmail(email);
  };

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
            {formatMessage("msgSendEmailBtn")}
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
      onSubmit={onFormSubmit}
    >
      {errorMessage}
      {spinner}
      {content}
    </form>
  );
}
