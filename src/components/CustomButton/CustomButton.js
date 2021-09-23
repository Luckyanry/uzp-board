import React from "react";
import {Link} from "react-router-dom";
import {formatMessage} from "devextreme/localization";

import {ReactComponent as ArrowRightIcon} from "./icons/arrowRight.svg";
import "./CustomButton.scss";

const CustomButton = ({item}) => {
  const {pathTo, btnTitle, btnDesc, Icon} = item;

  return (
    <button className={"form-link"}>
      <Link to={pathTo}>
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
      </Link>
    </button>
  );
};

export default CustomButton;
