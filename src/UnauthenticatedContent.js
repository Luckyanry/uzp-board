import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {SingleCard} from "./layouts";
import {
  LoginForm,
  ResetPasswordForm,
  ChangePasswordForm,
  LoginStartForm,
} from "./components";

// import {useLocalization} from "../../contexts/LocalizationContext";

export default function UnauthenticatedContent() {
  // const {formatMessage} = useLocalization();
  // formatMessage("msgStatusActive")

  return (
    <Switch>
      <Route exact path="/login">
        <SingleCard
          title={"Вход в систему"}
          description={"Выберите один из вариантов входа в админ панель ГУБДД."}
        >
          <LoginStartForm />
        </SingleCard>
      </Route>

      <Route exact path="/login-form">
        <SingleCard
          title={"Вход в систему"}
          description={
            "Введите логин и пароль. Если у вас их нет, обратитесь к админу."
          }
          prevPage={true}
          footerTitle={"Вход через логин"}
          pageStep="02"
        >
          <LoginForm />
        </SingleCard>
      </Route>

      <Route exact path="/reset-password">
        <SingleCard
          title="Reset Password"
          description="Please enter the email address that you used to register, and we will send you a link to reset your password via Email."
        >
          <ResetPasswordForm />
        </SingleCard>
      </Route>

      <Route exact path="/change-password/:recoveryCode">
        <SingleCard title="Change Password">
          <ChangePasswordForm />
        </SingleCard>
      </Route>

      <Redirect to={"/login"} />
    </Switch>
  );
}
