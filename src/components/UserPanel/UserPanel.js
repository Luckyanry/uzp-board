import React from "react";
// import {useHistory} from "react-router-dom";

import ContextMenu, {Position} from "devextreme-react/context-menu";
import List from "devextreme-react/list";

import {useLocalization} from "../../contexts/LocalizationContext";
import {useAuth} from "../../contexts/Auth";
import {firstLetterToUpper} from "../../helpers/functions";

// import userIcon from "./icons/object.svg";
import exitIcon from "./icons/exit.svg";
import "./UserPanel.scss";

export default function UserPanel({menuMode}) {
  const {user, signOut} = useAuth();
  const {formatMessage} = useLocalization();

  // const history = useHistory();

  // function navigateToProfile() {
  //   history.push("/profile");
  // }

  const menuItems = () => [
    // {
    //   text: formatMessage("msgProfileMenuTitle"),
    //   icon: userIcon,
    //   onClick: navigateToProfile,
    // },
    {
      text: formatMessage("msgLogout"),
      icon: exitIcon,
      onClick: signOut,
    },
  ];

  const {uname, suname} = user;
  const userInitials = `${uname[0].toUpperCase()}${suname[0].toUpperCase()}`;

  return (
    <div className={"user-panel"}>
      <div className={"user-info"}>
        <div className={"user-name"}>
          {firstLetterToUpper(uname)} {firstLetterToUpper(suname)}
        </div>
        <div className={"image-container"}>
          <div className={"user-image"}>{userInitials}</div>
        </div>
      </div>

      {menuMode === "context" && (
        <ContextMenu
          items={menuItems()}
          target={".user-button"}
          showEvent={"dxclick"}
          width={210}
          cssClass={"user-menu"}
        >
          <Position my={"top center"} at={"bottom center"} />
        </ContextMenu>
      )}
      {menuMode === "list" && (
        <List className={"dx-toolbar-menu-action"} items={menuItems()} />
      )}
    </div>
  );
}
