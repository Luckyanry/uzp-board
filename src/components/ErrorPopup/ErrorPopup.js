import {useState} from "react";
import {Popup, Position} from "devextreme-react/popup";

import "./ErrorPopup.scss";
import {getFromSessionStorege} from "../../helpers/functions";

const ErrorPopup = ({errorState, errorTitle}) => {
  const [isPopupVisible, setPopupVisibility] = useState(errorState);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
    window.location.reload();
  };

  const {
    ScriptFile,
    VBErr: {Description, Number, Source},
  } = getFromSessionStorege("error", null);

  return (
    <Popup
      visible={isPopupVisible}
      onHiding={togglePopup}
      dragEnabled={true}
      closeOnOutsideClick={true}
      showCloseButton={true}
      showTitle={true}
      title={errorTitle}
      container=".dx-viewport"
      width={500}
      height={"auto"}
    >
      <Position at="center" my="center" of="#login-start-form-container" />
      <p className={"error-text"}>
        ScriptFile: <span className={"error-desc"}>{ScriptFile}</span>&nbsp;
      </p>
      <p className={"error-text"}>
        Description: <span className={"error-desc"}>{Description}</span>
      </p>
      <p className={"error-text"}>
        Error Number: <span className={"error-desc"}>{Number}</span>
      </p>
      <p className={"error-text"}>
        Source: <span className={"error-desc"}>{Source}</span>
      </p>
    </Popup>
  );
};

export default ErrorPopup;
