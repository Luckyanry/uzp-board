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

import "./LoginStartForm.scss";

import {ReactComponent as UserIcon} from "./icons/userIconGreen.svg";
import {ReactComponent as FlashCardIcon} from "./icons/flashIconGreen.svg";
import {ReactComponent as WindowIcon} from "./icons/windowIconGreen.svg";
import {ReactComponent as ArrowRightIcon} from "./icons/arrowRight.svg";

const LoginStartForm = () => {
  const history = useHistory();
  const {signIn} = useAuth();
  const [loading, setLoading] = useState(false);
  const formData = useRef({});

  const emailEditorOptions = {
    stylingMode: "filled",
    placeholder: "Email",
    mode: "email",
  };
  const passwordEditorOptions = {
    stylingMode: "filled",
    placeholder: "Password",
    mode: "password",
  };
  const rememberMeEditorOptions = {
    text: "Remember me",
    elementAttr: {class: "form-text"},
  };

  // const onSubmit = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     const {email, password} = formData.current;
  //     setLoading(true);

  //     const result = await signIn(email, password);
  //     if (!result.isOk) {
  //       setLoading(false);
  //       notify(result.message, "error", 2000);
  //     }
  //   },
  //   [signIn]
  // );

  const onCreateAccountClick = useCallback(() => {
    history.push("/create-account");
  }, [history]);

  return (
    <Form formData={formData.current} disabled={loading}>
      <Item>
        <div className={"form-link"}>
          <Link to={"/login-form"}>
            <div className={"link-wrapper"}>
              <div className={"link-icon-border"}>
                {/* <img
                  className={"link-icon"}
                  src={userIconGreen}
                  alt="User icon"
                /> */}
                <UserIcon className={"link-icon"} />
              </div>
              <div className={"link-content"}>
                <p className={"link-title"}>Логин/Пароль</p>
                <p className={"link-desc"}>
                  Если у вас нет логина и пароля, то спросите его у вашего
                  админа.
                </p>
              </div>
              <ArrowRightIcon className={"arrow-icon"} />
            </div>
          </Link>
        </div>
      </Item>

      <Item>
        <div className={"form-link"}>
          <Link to={"/reset-password"}>
            <div className={"link-wrapper"}>
              <div className={"link-icon-border"}>
                <FlashCardIcon className={"link-icon"} />
              </div>
              <div className={"link-content"}>
                <p className={"link-title"}>ЭЦП</p>
                <p className={"link-desc"}>
                  При наличии флешки с ключом &nbsp;&nbsp;
                </p>
              </div>
              <ArrowRightIcon className={"arrow-icon"} />
            </div>
          </Link>
        </div>
      </Item>

      <Item>
        <div className={"form-link"}>
          <Link to={"/home"}>
            <div className={"link-wrapper"}>
              <div className={"link-icon-border"}>
                <WindowIcon className={"link-icon"} />
              </div>
              <div className={"link-content"}>
                <p className={"link-title"}>Авторизация AD</p>
                <p className={"link-desc"}>
                  При наличии доменной учетной записи
                </p>
              </div>
              <ArrowRightIcon className={"arrow-icon"} />
            </div>
          </Link>
        </div>
      </Item>
      {/* <Item
          dataField={"email"}
          editorType={"dxTextBox"}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message="Login is required" />

          <Label visible={false} />
        </Item>
        <Item
          dataField={"password"}
          editorType={"dxTextBox"}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"rememberMe"}
          editorType={"dxCheckBox"}
          editorOptions={rememberMeEditorOptions}
        >
          <Label visible={false} />
        </Item> */}
      {/* <ButtonItem>
        <ButtonOptions width={"100%"} type={"default"} useSubmitBehavior={true}>
          <span className="dx-button-text">
            {loading ? (
              <LoadIndicator width={"24px"} height={"24px"} visible={true} />
            ) : (
              "Sign In"
            )}
          </span>
        </ButtonOptions>
      </ButtonItem> */}
      {/* <Item>
          <div className={"link"}>
            <Link to={"/reset-password"}>Forgot password?</Link>
          </div>
        </Item> */}
      {/* <ButtonItem>
          <ButtonOptions
            text={"Create an account"}
            width={"100%"}

            onClick={onCreateAccountClick}
          />
        </ButtonItem> */}
    </Form>
  );
};

export default LoginStartForm;
