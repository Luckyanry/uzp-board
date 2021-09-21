// import LoadIndicator from "devextreme-react/load-indicator";
import React from "react";
import {useLocalization} from "../../contexts/LocalizationContext";
// import {formatMessage} from "devextreme/localization";
import "./HomePage.scss";
import {ReactComponent as Logo} from "./logo.svg";

export const HomePage = () => {
  const {formatMessage} = useLocalization();

  return (
    <>
      {/* <h2 className={"content-block"}>{formatMessage("msgHomeMenuTitle")}</h2> */}
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <div className={"logos-container"}>
            <Logo />
          </div>

          <h2 className={"home-title"}>{formatMessage("msgHomePageTitle")}</h2>

          <p className={"home-desc"}>{formatMessage("msgHomePageTextAbout")}</p>
        </div>
      </div>
    </>
  );
};
