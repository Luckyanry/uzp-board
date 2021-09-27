import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {SignInPage} from "./pages";
import {
  LoginForm,
  ResetPasswordForm,
  LoginStartForm,
  ChangePasswordForm,
  DigitalKeyForm,
} from "./components";

import {useLocalization} from "./contexts/LocalizationContext";

export default function UnauthenticatedContent() {
  const {formatMessage} = useLocalization();

  return (
    <Switch>
      <Route exact path="/login">
        <SignInPage
          title={formatMessage("msgLoginStartFormTitle")}
          description={formatMessage("msgLoginStartFormDesc")}
        >
          <LoginStartForm />
        </SignInPage>
      </Route>

      <Route exact path="/login-form">
        <SignInPage
          title={formatMessage("msgLoginFormTitle")}
          description={formatMessage("msgLoginFormDesc")}
          prevPage={true}
          footerTitle={formatMessage("msgLoginFormFooterTitle")}
          pageStep="02"
        >
          <LoginForm />
        </SignInPage>
      </Route>

      <Route exact path="/reset-password">
        <SignInPage
          title={formatMessage("msgResetPasswordFormTitle")}
          description={formatMessage("msgResetPasswordFormDesc")}
          prevPage={true}
          footerTitle={formatMessage("msgResetPasswordFormFooterTitle")}
          pageStep="02"
        >
          <ResetPasswordForm />
        </SignInPage>
      </Route>

      <Route exact path="/digital-key">
        <SignInPage
          title={formatMessage("msgDigitalKeyFormTitle")}
          description={formatMessage("msgDigitalKeyFormDesc")}
          prevPage={true}
          footerTitle={formatMessage("msgDigitalKeyFormFooterTitle")}
          pageStep="02"
        >
          <DigitalKeyForm />
        </SignInPage>
      </Route>

      <Route exact path="/change-password/">
        <SignInPage
          title={formatMessage("msgChangePasswordFormTitle")}
          description={formatMessage("msgChangePasswordFormDesc")}
          prevPage={true}
          footerTitle={formatMessage("msgChangePasswordFormFooterTitle")}
          pageStep="02"
        >
          <ChangePasswordForm />
        </SignInPage>
      </Route>

      <Redirect to={"/login"} />
    </Switch>
  );
}
