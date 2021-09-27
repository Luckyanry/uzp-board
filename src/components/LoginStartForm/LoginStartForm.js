import {useState, useCallback} from "react";
// import notify from "devextreme/ui/notify";

import {useAuth} from "../../contexts/Auth";
import {useLocalization} from "../../contexts/LocalizationContext";
import {CustomButton, Spinner, ErrorPopup} from "..";

import {setToSessionStorege} from "../../helpers/functions";

import {ReactComponent as UserIcon} from "./icons/userIconGreen.svg";
import {ReactComponent as FlashCardIcon} from "./icons/flashIconGreen.svg";
import {ReactComponent as WindowIcon} from "./icons/windowIconGreen.svg";

import "./LoginStartForm.scss";

const LoginStartForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorTitle, setErrorTitle] = useState();

  const {signIn} = useAuth();
  const {formatMessage} = useLocalization();

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

  const onADAuthClickHendler = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      const result = await signIn("3", "");
      const {isOk, message, errorAPIMsg} = result;
      setToSessionStorege("error", errorAPIMsg);

      if (!isOk) {
        setLoading(false);
        setErrorStatus(true);
        setErrorTitle(formatMessage(message));

        return;
      }

      setLoading(false);
      window.location.reload();
    },
    // eslint-disable-next-line
    [signIn]
  );

  const elements = buttonOptions.map((item, idx) => (
    <CustomButton
      key={idx}
      {...item}
      onClick={!item.pathTo && onADAuthClickHendler}
    />
  ));

  const content = !(loading || errorStatus) ? elements : null;
  const errorMessage = errorStatus ? (
    <ErrorPopup errorState={errorStatus} errorTitle={errorTitle} />
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
