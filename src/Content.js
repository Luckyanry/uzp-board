import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {AppInfo} from "./app-info";
import routes from "./app-routes";
// import {SideNavInnerToolbar as SideNavBarLayout} from "./layouts";
import {SideNavOuterToolbar as SideNavBarLayout} from "./layouts";
import {Footer} from "./components";
import {useLocalization} from "./contexts/LocalizationContext";

export default function Content() {
  const {formatMessage} = useLocalization();

  return (
    <SideNavBarLayout title={formatMessage(AppInfo.title)}>
      <Switch>
        {routes.map(({path, component}) => (
          <Route exact key={path} path={path} component={component} />
        ))}
        <Redirect to={"/home"} />
      </Switch>
      <Footer>
        © {formatMessage(AppInfo.title)} Inc., {new Date().getFullYear()}
      </Footer>
    </SideNavBarLayout>
  );
}
