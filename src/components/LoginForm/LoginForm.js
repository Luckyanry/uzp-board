import React, {useState, useRef, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";

import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
} from "devextreme-react/form";
import notify from "devextreme/ui/notify";

import {useAuth} from "../../contexts/Auth";
import {useLocalization} from "../../contexts/LocalizationContext";
import {Spinner} from "..";

import "./LoginForm.scss";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);

  const {signIn} = useAuth();
  const formData = useRef({});
  const {formatMessage} = useLocalization();
  const history = useHistory();

  useEffect(() => {
    let ignore = false;

    login &&
      password &&
      !ignore &&
      (async () => {
        setLoading(true);

        const result = await signIn(login, password);
        const {isOk, Alert, NativeError, errorAPIMsg} = result;

        if (!isOk && Alert && NativeError === 153649 && !errorAPIMsg) {
          setErrorStatus(true);
          setLoading(false);

          notify(
            {
              message: Alert,
              position: {
                my: "center",
                at: "center",
                of: "#content",
                offset: "0 36",
              },
              width: 426,
              height: 80,
              shading: true,
            },
            "error",
            3000
          );

          return history.push("/renewal-password");
        }

        if (!isOk && errorAPIMsg) {
          setErrorStatus(true);
          setLoading(false);
          return history.push("/login");
        }
      })();

    return () => {
      ignore = true;
    };
  }, [login, password, signIn, formatMessage, history]);

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
          <span className="dx-button-text">{formatMessage("msgSignIn")}</span>
        </ButtonOptions>
      </ButtonItem>
    </Form>
  );

  const content = !(loading || errorStatus) ? <View /> : null;

  const spinner = loading ? (
    <Spinner loadingState={loading} positionOf={"#content"} />
  ) : null;

  return (
    <form
      id="login-form-container"
      className={"login-form"}
      onSubmit={onFormSubmit}
    >
      {spinner}
      {content}
    </form>
  );
}
