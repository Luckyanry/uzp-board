import React from "react";
import ScrollView from "devextreme-react/scroll-view";
import "./SingleCard.scss";
import loginBg from "./loginBg.jpeg";
import logo from "./logo.svg";

export const SingleCard = ({title, description, children}) => {
  return (
    <ScrollView
      height={"100%"}
      width={"100%"}
      className={"with-footer single-card"}
    >
      <div className={"container"}>
        <div className={"dx-card img-wrapper"}>
          <img src={logo} alt="Logo" />
          <img src={loginBg} alt="Road traffic" />
          <h2>Админ панель </h2>
          <p>
            Вы находитесь на главном экране входа в админ панель ГУБДД
            Узбекистана. Вы можете войти в систему 3 способами: с помощью
            выданого логина и пароля, ключа доступа и AD аутентификации.
          </p>
        </div>
        <div className={"dx-card content"}>
          <div className={"header"}>
            <div className={"title"}>{title}</div>
            <div className={"description"}>{description}</div>
          </div>
          {children}
        </div>
      </div>
    </ScrollView>
  );
};
