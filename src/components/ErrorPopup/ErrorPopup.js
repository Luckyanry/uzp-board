import {useState} from "react";
import {Popup, Position} from "devextreme-react/popup";

import {
  // getFromSessionStorege,
  setToSessionStorege,
} from "../../helpers/functions";
import "./ErrorPopup.scss";
import {formatMessage} from "devextreme/localization";

const ErrorPopup = ({errorState, errorTitle, popupPositionOf}) => {
  const [isPopupVisible, setPopupVisibility] = useState(errorState);

  const togglePopup = () => {
    console.log(`popup `);
    setPopupVisibility(!isPopupVisible);
    setToSessionStorege("error", "");
    // window.location.reload();
  };

  function getFromSessionStorege(key, ifIsNull) {
    const storage = JSON.parse(sessionStorage.getItem(key));
    return storage !== null ? storage : ifIsNull;
  }

  const test = getFromSessionStorege("error", "");

  console.log(`test `, test);
  const {
    ScriptFile,
    VBErr: {Description, Number, Source},
  } = Object.keys(test).length > 0 ? test : "";

  return (
    <Popup
      visible={isPopupVisible}
      onHiding={togglePopup}
      closeOnOutsideClick={true}
      showCloseButton={true}
      showTitle={true}
      title={!errorTitle ? formatMessage("msgErrServerFetch") : errorTitle}
      dragEnabled={true}
      container=".dx-viewport"
      width={600}
      height={"auto"}
      // shadingColor="rgba(0, 0, 0, 0.4)"
    >
      <Position at="center" my="center" of={popupPositionOf} />
      <h3 className={"error-title"}>
        {!errorTitle ? formatMessage("msgErrServerFetch") : errorTitle}
      </h3>
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
