import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {AuthorizationLayout} from "../layouts";
import {
  LoginForm,
  ResetPasswordForm,
  LoginTypes,
  ChangePasswordForm,
  LoginDigitalKeyForm,
  RenewalPasswordForm,
} from "../components";

import {useLocalization} from "../contexts/LocalizationContext";

export default function UnauthenticatedContent() {
  const {formatMessage} = useLocalization();

  return (
    <Switch>
      <Route exact path="/login">
        <AuthorizationLayout
          title={formatMessage("msgLoginStartFormTitle")}
          description={formatMessage("msgLoginStartFormDesc")}
        >
          <LoginTypes />
        </AuthorizationLayout>
      </Route>

      <Route exact path="/login-form">
        <AuthorizationLayout
          title={formatMessage("msgLoginFormTitle")}
          description={formatMessage("msgLoginFormDesc")}
          prevPage={true}
          footerTitle={formatMessage("msgLoginFormFooterTitle")}
          pageStep="02"
        >
          <LoginForm />
        </AuthorizationLayout>
      </Route>

      <Route exact path="/reset-password">
        <AuthorizationLayout
          title={formatMessage("msgResetPasswordFormTitle")}
          description={formatMessage("msgResetPasswordFormDesc")}
          prevPage={true}
          footerTitle={formatMessage("msgResetPasswordFormFooterTitle")}
          pageStep="02"
        >
          <ResetPasswordForm />
        </AuthorizationLayout>
      </Route>

      <Route exact path="/digital-key">
        <AuthorizationLayout
          title={formatMessage("msgDigitalKeyFormTitle")}
          description={formatMessage("msgDigitalKeyFormDesc")}
          prevPage={true}
          footerTitle={formatMessage("msgDigitalKeyFormFooterTitle")}
          pageStep="02"
        >
          <LoginDigitalKeyForm />
        </AuthorizationLayout>
      </Route>

      <Route exact path="/change-password">
        <AuthorizationLayout
          title={formatMessage("msgChangePasswordFormTitle")}
          description={formatMessage("msgChangePasswordFormDesc")}
          prevPage={true}
          footerTitle={formatMessage("msgChangePasswordFormFooterTitle")}
          pageStep="02"
        >
          <ChangePasswordForm />
        </AuthorizationLayout>
      </Route>

      <Route exact path="/renewal-password">
        <AuthorizationLayout
          title={formatMessage("msgRenewalPasswordFormTitle")}
          description={formatMessage("msgRenewalPasswordFormDesc")}
          prevPage={true}
          footerTitle={formatMessage("msgRenewalPasswordFormFooterTitle")}
          pageStep="02"
        >
          <RenewalPasswordForm />
        </AuthorizationLayout>
      </Route>

      <Redirect to={"/login"} />
    </Switch>
  );
}
