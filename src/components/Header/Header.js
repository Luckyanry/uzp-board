import React from "react";

import Toolbar, {Item} from "devextreme-react/toolbar";
import Button from "devextreme-react/button";
import {Template} from "devextreme-react/core/template";

import Localization from "../Localization/Localization";
import UserPanel from "../UserPanel/UserPanel";

import {ReactComponent as Logo} from "../../icons/logo.svg";
import "./Header.scss";

export const Header = ({menuToggleEnabled, title, toggleMenu, menuStatus}) => {
  return (
    <header className={"header-component"}>
      <Toolbar className={"header-toolbar"}>
        <Item
          visible={menuToggleEnabled}
          location={"before"}
          widget={"dxButton"}
          cssClass={"menu-button"}
        >
          <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
        </Item>
        {menuStatus === 1 && (
          <Item
            location={"before"}
            cssClass={"header-title"}
            text={title}
            visible={true}
          >
            <Logo className={"logo"} />
          </Item>
        )}
        <Item
          location={"after"}
          locateInMenu={"auto"}
          menuItemTemplate={"userPanelTemplate"}
        >
          <Localization />
        </Item>
        <Item
          location={"after"}
          locateInMenu={"auto"}
          menuItemTemplate={"userPanelTemplate"}
        >
          <Button
            className={"user-button authorization"}
            width="auto"
            height={"100%"}
            stylingMode={"text"}
          >
            <UserPanel menuMode={"context"} />
          </Button>
        </Item>
        <Template name={"userPanelTemplate"}>
          <UserPanel menuMode={"list"} />
        </Template>
      </Toolbar>
    </header>
  );
};
