import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {SingleCard} from "./layouts";
import {LoginForm, ResetPasswordForm, LoginStartForm} from "./components";

import {useLocalization} from "./contexts/LocalizationContext";

export default function UnauthenticatedContent() {
  const {formatMessage} = useLocalization();

  return (
    <Switch>
      <Route exact path="/login">
        <SingleCard
          title={formatMessage("msgLoginStartFormTitle")}
          description={formatMessage("msgLoginStartFormDesc")}
        >
          <LoginStartForm />
        </SingleCard>
      </Route>

      <Route exact path="/login-form">
        <SingleCard
          title={formatMessage("msgLoginFormTitle")}
          description={formatMessage("msgLoginFormDesc")}
          prevPage={true}
          footerTitle={formatMessage("msgLoginFormFooterTitle")}
          pageStep="02"
        >
          <LoginForm />
        </SingleCard>
      </Route>

      <Route exact path="/reset-password">
        <SingleCard
          title={formatMessage("msgResetPasswordFormTitle")}
          description={formatMessage("msgResetPasswordFormDesc")}
          prevPage={true}
          footerTitle={formatMessage("msgResetPasswordFormFooterTitle")}
          pageStep="02"
        >
          <ResetPasswordForm />
        </SingleCard>
      </Route>

      <Redirect to={"/login"} />
    </Switch>
  );
}
