import React, {useEffect, useRef, useCallback, useState} from "react";
import TreeView from "devextreme-react/tree-view";

import {FetchData} from "../../api/pages-fetch";
// import {AppNavigation} from "../../app-navigation";
import {useNavigation} from "../../contexts/Navigation";
import {useScreenSize} from "../../utils/media-query";

import homeIcon from "../../icons/home.svg";
import legalsIcon from "../../icons/briefcase.svg";
import staffIcon from "../../icons/staff.svg";
import userACIcon from "../../icons/userAC.svg";
import administrationACIcon from "../../icons/administration.svg";
import dictionariesIcon from "../../icons/dictionaries.svg";
import "./SideNavigationMenu.scss";

import * as events from "devextreme/events";

export default function SideNavigationMenu(props) {
  const [appNav, setAppNav] = useState([]);

  const {children, selectedItemChanged, openMenu, compactMode, onMenuReady} =
    props;

  const {isLarge} = useScreenSize();
  // const navigationPathsArr = AppNavigation();
  function normalizePath() {
    if (!appNav) {
      return;
    }
    // return navigationPathsArr.map((item) => {
    return appNav.map((item) => {
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

  useEffect(() => {
    if (!appNav) {
      return;
    }

    const fetchData = FetchData(
      "/siteStructure",
      "ShortDicsRecordsFlat&@name=SiteStructure",
      "hbdb"
    ).fetchColumnsSchemaData;

    fetchData.load().then(({data}) => setAppNav(data));
    // eslint-disable-next-line
  }, []);

  // console.log(`normalizePath()`, normalizePath());

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
          // columnAutoWidth={true}
          virtualModeEnabled={true}
        />
      </div>
    </div>
  );
}
