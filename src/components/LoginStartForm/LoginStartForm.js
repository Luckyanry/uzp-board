import React, {
  // useState,
  useCallback,
} from "react";
import {Link} from "react-router-dom";

import notify from "devextreme/ui/notify";

import {useAuth} from "../../contexts/Auth";
import {useLocalization} from "../../contexts/LocalizationContext";

import {ReactComponent as UserIcon} from "./icons/userIconGreen.svg";
import {ReactComponent as FlashCardIcon} from "./icons/flashIconGreen.svg";
import {ReactComponent as WindowIcon} from "./icons/windowIconGreen.svg";
import {ReactComponent as ArrowRightIcon} from "./icons/arrowRight.svg";
import "./LoginStartForm.scss";

const LoginStartForm = () => {
  const {signIn} = useAuth();
  // const [loading, setLoading] = useState(false);
  // const formData = useRef({});

  const {formatMessage} = useLocalization();

  const onADauthClickHendler = useCallback(
    async (e) => {
      e.preventDefault();
      // setLoading(true);

      const result = await signIn("", "");
      const {isOk, message} = result;

      if (!isOk) {
        // setLoading(false);
        notify(
          {
            message,
            position: {
              my: "center",
              at: "center",
              of: "#login-start-form-container",
              offset: "5 0",
            },
            width: 436,
            height: 64,
            shading: true,
          },
          "error",
          5000
        );
      }
    },
    [signIn]
  );

  return (
    <div className={"login-start-form"} id="login-start-form-container">
      <button className={"form-link"}>
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
      </button>

      <button className={"form-link"}>
        <Link to={"/digital-key"}>
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
      </button>

      <button className={"form-link"} onClick={onADauthClickHendler}>
        {/* <Link to={"/home"}> */}
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
        {/* </Link> */}
      </button>
    </div>
  );
};

export default LoginStartForm;
