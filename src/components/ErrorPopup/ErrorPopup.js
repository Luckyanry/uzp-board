import {useEffect, useState} from "react";

import {Popup, Position} from "devextreme-react/popup";
import {formatMessage} from "devextreme/localization";

import {
  // getFromSessionStorege,
  setToSessionStorege,
} from "../../helpers/functions";

import "./ErrorPopup.scss";

// export function getErrorData(data) {
//   console.log(`data `, data);
//   setToSessionStorege("error", data);
//   return data;
// }

const ErrorPopup = ({errorState, popupPositionOf = "#root", errorTitle}) => {
  const [isPopupVisible, setPopupVisibility] = useState(Boolean(errorState));
  const [errorObj, setErrorObj] = useState(null);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
    setToSessionStorege("error", "");
    // window.location.reload();
  };

  // const ssesionStorrageError = getFromSessionStorege("error", "");

  useEffect(() => {
    const storage = JSON.parse(sessionStorage.getItem("error"));
    storage && setErrorObj(storage);
  }, []);

  // const test = getFromSessionStorege("error", "");

  // const {
  //   ScriptFile,
  //   VBErr: {Description, Number, Source},
  // } = Object.keys(test).length > 0 ? test : "";
  // setTimeout(() => {
  //   console.log("timeout");
  //   setErrorObj(getFromSessionStorege("error", ""));
  // }, 250);

  const markup = () => {
    // console.log(`in errorObj `, errorObj);
    const {
      JSONErrorMessage,
      ScriptFile,
      VBErr: {Description, Number, Source},
    } = errorObj;

    return (
      <>
        <p className={"error-text"}>
          URL: <span className={"error-desc"}>{window.location.href}</span>
        </p>
        {JSONErrorMessage && (
          <p className={"error-text"}>
            JSONErrorMessage:{" "}
            <span className={"error-desc"}>{JSONErrorMessage}</span>
            &nbsp;
          </p>
        )}
        {ScriptFile && (
          <p className={"error-text"}>
            ScriptFile: <span className={"error-desc"}>{ScriptFile}</span>
            &nbsp;
          </p>
        )}
        {Description && (
          <p className={"error-text"}>
            Description: <span className={"error-desc"}>{Description}</span>
          </p>
        )}
        {Number && (
          <p className={"error-text"}>
            Error Number: <span className={"error-desc"}>{Number}</span>
          </p>
        )}
        {Source && (
          <p className={"error-text"}>
            Source: <span className={"error-desc"}>{Source}</span>
          </p>
        )}
      </>
    );
  };

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
      {errorObj && markup()}
    </Popup>
  );
};

export default ErrorPopup;
