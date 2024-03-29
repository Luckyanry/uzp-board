import React, {useEffect, useRef, useCallback} from "react";
import TreeView from "devextreme-react/tree-view";

import {useNavigation} from "../../contexts/Navigation";
import {useAuth} from "../../contexts/Auth";
import {useScreenSize} from "../../utils/media-query";

// eslint-disable-next-line
import homeIcon from "../../icons/home.svg";
// eslint-disable-next-line
import legalsIcon from "../../icons/briefcase.svg";
// eslint-disable-next-line
import staffIcon from "../../icons/staff.svg";
// eslint-disable-next-line
import userACIcon from "../../icons/userAC.svg";
// eslint-disable-next-line
import administrationACIcon from "../../icons/administration.svg";
// eslint-disable-next-line
import dictionariesIcon from "../../icons/dictionaries.svg";
import "./SideNavigationMenu.scss";

import * as events from "devextreme/events";

export default function SideNavigationMenu(props) {
  const {children, selectedItemChanged, openMenu, compactMode, onMenuReady} =
    props;

  const {siteStructure} = useAuth();
  const {isLarge} = useScreenSize();

  function normalizePath() {
    if (!siteStructure) {
      return;
    }

    return siteStructure.map((item) => {
      if (item.path && !/^\//.test(item.path)) {
        item.path = `/${item.path}`;
      }
      return {...item, expanded: isLarge};
    });
  }

  const {
    navigationData: {currentPath},
  } = useNavigation();

  const treeViewRef = useRef();
  const wrapperRef = useRef();

  const getWrapperRef = useCallback(
    (element) => {
      const prevElement = wrapperRef.current;
      if (prevElement) {
        events.off(prevElement, "dxclick");
      }

      wrapperRef.current = element;
      events.on(element, "dxclick", (e) => {
        openMenu(e);
      });
    },
    [openMenu]
  );

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath);
    }

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath, compactMode]);

  return (
    <div
      className={"dx-swatch-additional side-navigation-menu"}
      ref={getWrapperRef}
    >
      {children}
      <div className={"menu-container"}>
        <TreeView
          ref={treeViewRef}
          items={normalizePath()}
          dataStructure="plain"
          displayExpr={"name"}
          parentIdExpr={"pid"}
          keyExpr={"path"}
          selectionMode={"single"}
          focusStateEnabled={true}
          expandEvent={"click"}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={"100%"}
          wordWrapEnabled={true}
          rowAlternationEnabled={false}
          virtualModeEnabled={true}
        />
      </div>
    </div>
  );
}
