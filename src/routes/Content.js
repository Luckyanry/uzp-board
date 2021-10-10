import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import {useLocalization} from "../contexts/LocalizationContext";
import {AppInfo} from "../app-info";
import routes from "./app-routes";

// import {SideNavInnerToolbar as SideNavBarLayout} from "./layouts";
import {SideNavInnerToolbar as SideNavBarLayout} from "../layouts";
import {Footer} from "../components";

export default function Content() {
  const {formatMessage} = useLocalization();

  return (
    <SideNavBarLayout title={formatMessage(AppInfo.title)}>
      <Switch>
        {routes.map(({path, component}) => (
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
