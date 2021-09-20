import React from "react";
import Form, {ButtonItem, ButtonOptions} from "devextreme-react/form";

import {useLocalization} from "../../contexts/LocalizationContext";

import {ReactComponent as SecureIcon} from "./icons/secureIcon.svg";
import "./DigitalKeyForm.scss";
import Button from "devextreme-react/button";

const DigitalKeyForm = () => {
  const {formatMessage} = useLocalization();

  const submitButtonAttributes = {class: "submit-button"};

  return (
    <div className={"digital-key-form"}>
      <Form>
        <ButtonItem>
          <ButtonOptions
            elementAttr={submitButtonAttributes}
            width={"100%"}
            height={64}
            type={"default"}
            useSubmitBehavior={true}
            disabled
          >
            <span className="dx-button-text">
              {formatMessage("msgDigitalKeyConfirmBtn")}
            </span>
          </ButtonOptions>
        </ButtonItem>
      </Form>
      <p className={"secure-text"}>
        <span>
          <SecureIcon className={"secure-icon"} />
        </span>
        &nbsp;&nbsp; {formatMessage("msgDigitalKeyBtnText")}v
      </p>
    </div>
  );
};

export default DigitalKeyForm;
