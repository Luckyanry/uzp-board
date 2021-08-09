import React from "react";
import {HashRouter as Router} from "react-router-dom";
import LoadPanel from "devextreme-react/load-panel";

import {NavigationProvider} from "./contexts/Navigation";
import {AuthProvider, useAuth} from "./contexts/Auth";
import {LocalizationProvider} from "./contexts/LocalizationContext";
import {useScreenSizeClass} from "./utils/media-query";
import Content from "./Content";
import UnauthenticatedContent from "./UnauthenticatedContent";

import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import "./dx-styles.scss";

function AppWrapper() {
  const {user, loading} = useAuth();

  if (loading) {
    return <LoadPanel visible={true} />;
  }

  if (user) {
    return <Content />;
  }

  return <UnauthenticatedContent />;
}

export default function App() {
  const screenSizeClass = useScreenSizeClass();

  return (
    <Router>
      <LocalizationProvider>
        <AuthProvider>
          <NavigationProvider>
            <div className={`app ${screenSizeClass}`}>
              <AppWrapper />
            </div>
          </NavigationProvider>
        </AuthProvider>
      </LocalizationProvider>
    </Router>
  );
}
