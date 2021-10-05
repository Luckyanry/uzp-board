import {useState, useEffect} from "react";
// import notify from "devextreme/ui/notify";

import {useAuth} from "../../contexts/Auth";
import {useLocalization} from "../../contexts/LocalizationContext";
import {CustomButton, Spinner, ErrorPopup} from "..";

import {setToSessionStorege} from "../../helpers/functions";

import {ReactComponent as UserIcon} from "./icons/userIconGreen.svg";
import {ReactComponent as FlashCardIcon} from "./icons/flashIconGreen.svg";
import {ReactComponent as WindowIcon} from "./icons/windowIconGreen.svg";

import "./LoginStartForm.scss";

const buttonOptions = [
  {
    pathTo: "/login-form",
    btnTitle: "msgStartPageLoginPass",
    btnDesc: "msgStartPageLogPassDesc",
    Icon: UserIcon,
  },
  {
    pathTo: "/digital-key",
    btnTitle: "msgStartPageElKey",
    btnDesc: "msgStartPageElKeyDesc",
    Icon: FlashCardIcon,
  },
  {
    pathTo: "",
    btnTitle: "msgStartPageAuthAD",
    btnDesc: "msgStartPageAuthADDesc",
    Icon: WindowIcon,
  },
];

const LoginStartForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorTitle, setErrorTitle] = useState();

  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);

  const {signIn} = useAuth();
  const {formatMessage} = useLocalization();

  useEffect(() => {
    let ignore = false;

    login === "" &&
      password === "" &&
      (async () => {
        setLoading(true);

        const result = await signIn(login, password);
        const {isOk, message, errorAPIMsg} = result;

        if (!isOk && !ignore) {
          console.log("LoginStartForm err ");
          setToSessionStorege("error", errorAPIMsg);
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

  const onHendleClick = () => {
    setLogin("");
    setPassword("");
  };

  const buttons = buttonOptions.map((item, idx) => (
    <CustomButton key={idx} {...item} onClick={!item.pathTo && onHendleClick} />
  ));

  const content = !(loading || errorStatus) ? buttons : null;

  const errorMessage = errorStatus ? (
    <ErrorPopup
      errorState={errorStatus}
      popupPositionOf={"#login-start-form-container"}
      errorTitle={errorTitle}
    />
  ) : null;

  const spinner = loading ? (
    <Spinner loadingState={loading} positionOf={"#content"} />
  ) : null;

  return (
    <div className={"login-start-form"} id="login-start-form-container">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default LoginStartForm;

// notify(
//   {
//     message: formatMessage(message),
//     position: {
//       my: "center",
//       at: "center",
//       of: "#login-start-form-container",
//       offset: "5 0",
//     },
//     width: 436,
//     height: 64,
//     shading: true,
//   },
//   "error",
//   4000
// );
