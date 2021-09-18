import React, {useState, useRef, useCallback} from "react";
import {Link} from "react-router-dom";
import Form, {Item} from "devextreme-react/form";
import notify from "devextreme/ui/notify";

import {useAuth} from "../../contexts/Auth";
import {useLocalization} from "../../contexts/LocalizationContext";

import {ReactComponent as UserIcon} from "./icons/userIconGreen.svg";
import {ReactComponent as FlashCardIcon} from "./icons/flashIconGreen.svg";
import {ReactComponent as WindowIcon} from "./icons/windowIconGreen.svg";
import {ReactComponent as ArrowRightIcon} from "./icons/arrowRight.svg";
import "./LoginStartForm.scss";

const LoginStartForm = () => {
  // const {signIn} = useAuth();
  // const [loading, setLoading] = useState(false);
  const formData = useRef({});

  const {formatMessage} = useLocalization();
  console.log(`LoginStartForm formData: `, formData);
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

  return (
    <Form
      formData={formData.current}
      // disabled={loading}
    >
      {/* <form className={"login-start-form"} onSubmit={onSubmit}> */}
      <Item>
        <div className={"form-link"}>
          <Link to={"/login-form"}>
            <div className={"link-wrapper"}>
              <div className={"link-icon-border"}>
                <UserIcon className={"link-icon"} />
              </div>
              <div className={"link-content"}>
                <p className={"link-title"}>
                  {formatMessage("msgStartPageLoginPass")}
                </p>
                <p className={"link-desc"}>
                  {formatMessage("msgStartPageLogPassDesc")}
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
                <p className={"link-title"}>
                  {formatMessage("msgStartPageElKey")}
                </p>
                <p className={"link-desc"}>
                  {formatMessage("msgStartPageElKeyDesc")} &nbsp;&nbsp;
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
                <p className={"link-title"}>
                  {formatMessage("msgStartPageAuthAD")}
                </p>
                <p className={"link-desc"}>
                  {formatMessage("msgStartPageAuthADDesc")}
                </p>
              </div>
              <ArrowRightIcon className={"arrow-icon"} />
            </div>
          </Link>
        </div>
      </Item>
      {/* </form> */}
    </Form>
  );
};

export default LoginStartForm;
