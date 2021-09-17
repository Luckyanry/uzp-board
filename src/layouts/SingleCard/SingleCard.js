import React from "react";
import {Link, useHistory} from "react-router-dom";
import ScrollView from "devextreme-react/scroll-view";

import {Localization} from "../../components";
// import {useLocalization} from "../../contexts/LocalizationContext";

import loginBg from "./img/loginBg.jpeg";
import {ReactComponent as Logo} from "./icons/logo.svg";
import {ReactComponent as AngleIcon} from "./icons/angleIcon.svg";

import "./SingleCard.scss";

const SingleCard = ({
  title,
  description,
  prevPage = false,
  footerTitle = "",
  pageStep = "01",
  children,
}) => {
  // const {formatMessage} = useLocalization();
  // formatMessage("msgStatusActive")

  const styles = {
    bgImgContainer: {
      display: "inline-block",
      maxWidth: "574px",
      minHeight: "100%",
      background: `url("${loginBg}"), rgba(1, 68, 58, 1)`,
      backgroundBlendMode: "overlay",
      backgroundRepeat: "no-repeat",
    },
  };

  return (
    <ScrollView
      height={"100%"}
      width={"100%"}
      className={"with-footer single-card"}
    >
      <div className={"container"}>
        <div style={styles.bgImgContainer}>
          <div className={"left-content-wrapper"}>
            <Logo className={"logo"} />
            <h2 className={"img-title"}>Админ панель</h2>
            <p className={"img-text"}>
              Вы находитесь на главном экране входа в админ панель ГУБДД
              Узбекистана. Вы можете войти в систему 3 способами: с помощью
              выданого логина и пароля, ключа доступа и AD аутентификации.
            </p>
            <AngleIcon className={"angle-icon"} />
          </div>
        </div>

        <div className={"content"}>
          <ul className={"toolbar"}>
            <li className={"link left-btn"}>
              {prevPage && (
                <Link to={"/login"}>&#10094;&nbsp;&nbsp; {`Назад`}</Link>
              )}
            </li>

            <li className={"link right-btn"}>
              <Localization />
            </li>
          </ul>

          <div className={"header"}>
            <h2 className={"title"}>{title}</h2>
            <p className={"description"}>{description}</p>
            {children}
          </div>

          <ul className={"content-footer"}>
            <li className={"page-counter"}>{`ШАГ ${pageStep}/02`}</li>
            <li className={"text"}>{footerTitle}</li>
          </ul>
        </div>
      </div>
    </ScrollView>
  );
};

export default SingleCard;

// <Link to={"/reset-password"}>&#10094;&nbsp;&nbsp; {`Назад`}</Link>;
