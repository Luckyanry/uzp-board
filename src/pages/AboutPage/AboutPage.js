import React from "react";
import {useLocalization} from "../../contexts/LocalizationContext";
import "./AboutPage.scss";

export const AboutPage = () => {
  const {formatMessage} = useLocalization();
  return (
    <>
      <h2 className={"content-block"}>{formatMessage("about")}</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <h5>{formatMessage("about_page_desc")}</h5>
        </div>
      </div>
    </>
  );
};
