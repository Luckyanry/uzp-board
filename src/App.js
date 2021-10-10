import React from "react";
import {HashRouter as Router} from "react-router-dom";
import LoadPanel from "devextreme-react/load-panel";
import {formatMessage} from "devextreme/localization";

import {NavigationProvider} from "./contexts/Navigation";
import {AuthProvider, useAuth} from "./contexts/Auth";
import {LocalizationProvider} from "./contexts/LocalizationContext";
import {useScreenSizeClass} from "./utils/media-query";
import Content from "./routes/Content";
import UnauthenticatedContent from "./routes/UnauthenticatedContent";

import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import "./dx-styles.scss";
// import {Spinner} from "./components";
import spinner from "./components/Spinner/icons/spinner.svg";

function AppWrapper() {
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <LoadPanel
        deferRendering={true}
        enabled="true"
        shading={false}
        showPane={false}
        width={400}
        height={140}
        message={formatMessage("msgLoadingMessage")}
        indicatorSrc={spinner}
      />
    );
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
