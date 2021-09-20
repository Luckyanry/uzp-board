import React, {useState, useRef, useCallback} from "react";
import {Link} from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
import notify from "devextreme/ui/notify";

import {useAuth} from "../../contexts/Auth";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./LoginForm.scss";

export default function LoginForm() {
  const {signIn} = useAuth();
  const [loading, setLoading] = useState(false);
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

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const {login, password} = formData.current;

      console.log(`LoginForm formData.current(): `, formData.current);
      setLoading(true);

      const result = await signIn(login, password);
      console.log(`LoginForm result for signIn: `, result);

      if (!result.isOk) {
        setLoading(false);
        notify(
          {
            message: result.message,
            position: {
              my: "center bottom",
              at: "center bottom",
              of: "#login-form-container",
              offset: "0 80",
            },
            width: 426,
            height: 64,
            shading: true,
          },
          "error",
          3000
        );
      }
    },
    [signIn]
  );

  return (
    <form
      className={"login-form"}
      id="login-form-container"
      onSubmit={onSubmit}
    >
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
    </form>
  );
}
