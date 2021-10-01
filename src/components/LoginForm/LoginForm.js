import React, {useState, useRef, useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
// import notify from "devextreme/ui/notify";

import {useAuth} from "../../contexts/Auth";
import {useLocalization} from "../../contexts/LocalizationContext";
import {setToSessionStorege} from "../../helpers/functions";
import {ErrorPopup, Spinner} from "..";

import "./LoginForm.scss";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorTitle, setErrorTitle] = useState();

  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);

  const {signIn} = useAuth();
  const formData = useRef({});
  const {formatMessage} = useLocalization();

  const loginEditorOptions = {
    stylingMode: "filled",
    placeholder: formatMessage("msgEnterLogin"),
    mode: "text",
    elementAttr: {class: "form-input"},
    height: 64,
  };

  const passwordEditorOptions = {
    stylingMode: "filled",
    placeholder: formatMessage("msgEnterPassword"),
    mode: "password",
    elementAttr: {class: "form-input"},
    height: 64,
  };

  useEffect(() => {
    let ignore = false;

    login &&
      password &&
      (async () => {
        setLoading(true);

        const result = await signIn(login, password); // email, password
        const {isOk, message, errorAPIMsg} = result;

        if (!ignore) {
          setToSessionStorege("error", errorAPIMsg);
          setLoading(false);
        }

        if (!isOk && !ignore) {
          setLoading(false);
          setErrorStatus(true);
          setErrorTitle(formatMessage(message));

          return;
        }

        // window.location.reload();
      })();

    return () => {
      ignore = true;
    };
  }, [login, password, signIn, formatMessage]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const {login, password} = formData.current;

    setLogin(login);
    setPassword(password);
  };

  const View = () => (
    <Form
      formData={formData.current}
      disabled={loading}
      showColonAfterLabel={false}
      showRequiredMark={false}
    >
      <Item
        dataField={"login"}
        editorType={"dxTextBox"}
        editorOptions={loginEditorOptions}
        cssClass={"input"}
      >
        <RequiredRule message={formatMessage("msgRequiredLogin")} />
        <Label visible={true} text={formatMessage("msgLogin")} />
      </Item>

      <Item
        dataField={"password"}
        editorType={"dxTextBox"}
        editorOptions={passwordEditorOptions}
        ssClass={"input"}
      >
        <RequiredRule message={formatMessage("msgRequiredPassword")} />
        <Label visible={true} text={formatMessage("msgPassword")} />
      </Item>

      <Item>
        <div className={"link"}>
          <Link to={"/reset-password"}>
            {formatMessage("msgForgotPassword")}
          </Link>
        </div>
      </Item>

      <ButtonItem>
        <ButtonOptions
          width={"100%"}
          height={64}
          type={"default"}
          useSubmitBehavior={true}
        >
          <span className="dx-button-text">
            {loading ? (
              <LoadIndicator width={"24px"} height={"24px"} visible={true} />
            ) : (
              formatMessage("msgSignIn")
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
      popupPositionOf={"#login-form-container"}
    />
  ) : null;

  const spinner = loading ? (
    <Spinner loadingState={loading} positionOf={"#content"} />
  ) : null;

  return (
    <form
      id="login-form-container"
      className={"login-form"}
      onSubmit={onFormSubmit}
    >
      {errorMessage}
      {spinner}
      {content}
    </form>
  );
}

// notify(
//   {
//     message: result.message,
//     position: {
//       my: "center",
//       at: "center",
//       of: "#login-form-container",
//       offset: "0 0",
//     },
//     width: 426,
//     height: 64,
//     shading: true,
//   },
//   "error",
//   3000
// );
