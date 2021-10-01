import React from "react";
import {Link} from "react-router-dom";
import {formatMessage} from "devextreme/localization";

import {ReactComponent as ArrowRightIcon} from "./icons/arrowRight.svg";
import "./CustomButton.scss";

const CustomButton = ({pathTo, btnTitle, btnDesc, Icon, onClick = null}) => {
  const linkMarkup = (
    <div className={"link-wrapper"}>
      <div className={"link-icon-border"}>
        <Icon className={"link-icon"} />
      </div>

      <div className={"link-content"}>
        <p className={"link-title"}>{formatMessage(btnTitle)}</p>
        <p className={"link-desc"}>{formatMessage(btnDesc)}</p>
      </div>

      <ArrowRightIcon className={"arrow-icon"} />
    </div>
  );

  return (
    <button className={"form-link"} onClick={!pathTo ? onClick : null}>
      {pathTo ? <Link to={pathTo}>{linkMarkup}</Link> : linkMarkup}
    </button>
  );
};

export default CustomButton;
