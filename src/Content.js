import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {AppInfo} from "./app-info";
import routes from "./app-routes";
import {SideNavInnerToolbar as SideNavBarLayout} from "./layouts";
import {Footer} from "./components";

export default function Content() {
  return (
    <SideNavBarLayout title={AppInfo.title}>
      <Switch>
        {routes.map(({path, component}) => (
          <Route exact key={path} path={path} component={component} />
        ))}
        <Redirect to={"/home"} />
      </Switch>
      <Footer>
        Copyright © 2011-{new Date().getFullYear()} {AppInfo.title} Inc.
        <br />
        All trademarks or registered trademarks are property of their respective
        owners.
      </Footer>
    </SideNavBarLayout>
  );
}
