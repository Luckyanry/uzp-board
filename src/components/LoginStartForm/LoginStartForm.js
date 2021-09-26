import React, {
  // useState,
  useCallback,
} from "react";

import notify from "devextreme/ui/notify";

import {useAuth} from "../../contexts/Auth";
import {useLocalization} from "../../contexts/LocalizationContext";
import {CustomButton} from "..";

import {ReactComponent as UserIcon} from "./icons/userIconGreen.svg";
import {ReactComponent as FlashCardIcon} from "./icons/flashIconGreen.svg";
import {ReactComponent as WindowIcon} from "./icons/windowIconGreen.svg";

import "./LoginStartForm.scss";

const LoginStartForm = () => {
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
      // setLoading(true);

      const result = await signIn("", "");
      const {isOk, message} = result;

      if (!isOk) {
        // setLoading(false);
        notify(
          {
            message: formatMessage(message),
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
          4000
        );
      }
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

  return (
    <div className={"login-start-form"} id="login-start-form-container">
      {elements}
    </div>
  );
};

export default LoginStartForm;
