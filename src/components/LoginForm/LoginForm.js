import React, {useState, useRef, useCallback} from "react";
import {Link, useHistory} from "react-router-dom";
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
import {useAuth} from "../../contexts/Auth";

import "./LoginForm.scss";

export default function LoginForm() {
  const history = useHistory();
  const {signIn} = useAuth();
  const [loading, setLoading] = useState(false);
  const formData = useRef({});

  const emailEditorOptions = {
    stylingMode: "filled",
    placeholder: "Введите логин",
    mode: "text",
  };
  const passwordEditorOptions = {
    stylingMode: "filled",
    placeholder: "Введите пароль",
    mode: "password",
  };
  const rememberMeEditorOptions = {
    text: "Remember me",
    elementAttr: {class: "form-text"},
  };

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const {email, password} = formData.current;
      setLoading(true);

      const result = await signIn(email, password);
      if (!result.isOk) {
        setLoading(false);
        notify(result.message, "error", 2000);
      }
    },
    [signIn]
  );

  const onCreateAccountClick = useCallback(() => {
    history.push("/create-account");
  }, [history]);

  return (
    <form className={"login-form"} onSubmit={onSubmit}>
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
          cssClass={"input"}
        >
          {/* <p>Логин</p> */}
          <RequiredRule message="Login is required" />
          {/* <EmailRule message="Email is invalid" /> */}
          <Label visible={true} text={"Логин"} />
        </Item>

        <Item
          dataField={"password"}
          editorType={"dxTextBox"}
          editorOptions={passwordEditorOptions}
        >
          {/* <p>Пароль</p> */}
          <RequiredRule message="Password is required" />
          <Label visible={true} text={"Пароль"} />
        </Item>

        <Item
          dataField={"rememberMe"}
          editorType={"dxCheckBox"}
          editorOptions={rememberMeEditorOptions}
        >
          <Label visible={false} />
        </Item>

        <Item>
          <div className={"link"}>
            <Link to={"/reset-password"}>Forgot password?</Link>
          </div>
        </Item>

        <ButtonItem>
          <ButtonOptions
            width={"100%"}
            type={"default"}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {loading ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                "Sign In"
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>

        {/* <ButtonItem>
          <ButtonOptions
            text={"Create an account"}
            width={"100%"}
            onClick={onCreateAccountClick}
          />
        </ButtonItem> */}
      </Form>
    </form>
  );
}
