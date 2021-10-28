import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import {AppInfo} from "../app-info";
import {SideNavInnerToolbar as SideNavBarLayout} from "../layouts";
import {useLocalization} from "../contexts/LocalizationContext";
import {withNavigationWatcher} from "../contexts/Navigation";
import {DataGridPage, HomePage, TreeListPage} from "../pages";
import {Footer} from "../components";

export default function Content({siteStructure}) {
  const {formatMessage} = useLocalization();

  const routes =
    siteStructure &&
    siteStructure
      .filter(
        ({path, uiComponents}) =>
          path && {
            path,
            component: uiComponents,
          }
      )
      .map(({path, uiComponents}) => ({
        path,
        component: withNavigationWatcher(
          (uiComponents === "HomePage" && HomePage) ||
            (uiComponents === "DataGridPage" && DataGridPage) ||
            (uiComponents === "TreeListPage" && TreeListPage)
        ),
      }));

  return (
    <SideNavBarLayout title={formatMessage(AppInfo.title)}>
      <Switch>
        {routes &&
          routes.map(({path, component}) => (
            <Route exact key={path} path={path} component={component} />
          ))}
        <Redirect to={getFromSessionStorege("currentPath", "/home")} />
      </Switch>
      <Footer>
        © {formatMessage(AppInfo.title)} Inc., {new Date().getFullYear()}
      </Footer>
    </SideNavBarLayout>
  );
}

function getFromSessionStorege(key, ifIsNull) {
  const storage = sessionStorage.getItem(key);
  return storage !== null ? storage : ifIsNull;
}
