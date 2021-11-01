import {Link} from "react-router-dom";
import ScrollView from "devextreme-react/scroll-view";

import {Localization} from "../../components";
import {useLocalization} from "../../contexts/LocalizationContext";

import loginBgHD from "./img/loginBgHD.jpeg";
import {ReactComponent as Logo} from "./icons/logo.svg";
import {ReactComponent as AngleIcon} from "./icons/angleIcon.svg";

import "./AuthorizationLayout.scss";
import {setToSessionStorege} from "../../helpers/functions";

const AuthorizationLayout = ({
  title,
  description,
  prevPage = false,
  footerTitle = "",
  pageStep = "01",
  children,
}) => {
  const {formatMessage} = useLocalization();
  setToSessionStorege("error", "");

  return (
    <ScrollView
      height={"100%"}
      width={"100%"}
      className={"with-footer single-card"}
    >
      <div className={"container"}>
        <div
          className={"bgImgContainer"}
          style={{
            background: `rgb(1, 68, 58) url('${loginBgHD}') 50% 0% no-repeat`,
            backgroundSize: "cover",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className={"left-content-wrapper"}>
            <Logo className={"logo"} />

            <h2 className={"img-title"}>{formatMessage("msgAdminPanel")}</h2>

            <p className={"img-text"}>
              {formatMessage("msgStartPageImgDescription")}
            </p>

            <AngleIcon className={"angle-icon"} />
          </div>
        </div>

        <div id="content" className={"content"}>
          <ul className={"toolbar"}>
            <li className={"link left-btn"}>
              {prevPage && (
                <Link to={"/login"}>
                  &#10094;&nbsp;&nbsp; {formatMessage("msgGoBack")}
                </Link>
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
            <li className={"page-counter"}>{`${formatMessage(
              "msgPageStep"
            )} ${pageStep}/02`}</li>
            <li className={"text"}>{footerTitle}</li>
          </ul>
        </div>
      </div>
    </ScrollView>
  );
};

export default AuthorizationLayout;
