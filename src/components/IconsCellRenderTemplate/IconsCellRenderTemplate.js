import databaseIcon from "./icons/databaseIcon.svg";
import tableIcon from "./icons/tableIcon.svg";
import terminalIcon from "./icons/terminalIcon.svg";

import objectOff0 from "./icons/objectOff0.svg";
import objectOn1 from "./icons/objectOn1.svg";
import objectEmpty2 from "./icons/objectEmpty2.svg";
import containerOff3 from "./icons/containerOff3.svg";
import containerOn4 from "./icons/containerOn4.svg";
import containerEmpty5 from "./icons/containerEmpty5.svg";
import folder from "./icons/folder.svg";
import roleOff7 from "./icons/roleOff7.svg";
import roleOn8 from "./icons/roleOn8.svg";
import roleEmpty9 from "./icons/roleEmpty9.svg";
import groupOff10 from "./icons/groupOff10.svg";
import groupOn11 from "./icons/groupOn11.svg";
import groupEmpty12 from "./icons/groupEmpty12.svg";

import "./IconsCellRenderTemplate.scss";

const IconsCellRenderTemplate = (props) => {
  const {
    data: {icon, objName},
  } = props;

  const objAuditIcons =
    (icon === "Database_16x.png" && databaseIcon) ||
    (icon === "DatabaseStoredProcedures_16x.png" && terminalIcon) ||
    (icon === "Table_16x.png" && tableIcon);

  const {
    data: {OType, aName},
  } = props;

  const objPermissionsicons =
    (OType === 0 && objectOff0) ||
    (OType === 1 && objectOn1) ||
    (OType === 2 && objectEmpty2) ||
    (OType === 3 && containerOff3) ||
    (OType === 4 && containerOn4) ||
    (OType === 5 && containerEmpty5) ||
    (OType === 6 && folder) ||
    (OType === 7 && roleOff7) ||
    (OType === 8 && roleOn8) ||
    (OType === 9 && roleEmpty9) ||
    (OType === 10 && groupOff10) ||
    (OType === 11 && groupOn11) ||
    (OType === 12 && groupEmpty12);

  const styles = {
    bgIcon: {
      display: "inline-block",
      width: "16px",
      height: "16px",
      background: `url("${
        icon ? objAuditIcons : objPermissionsicons
      }") 0% 0% / 100% no-repeat`,
    },
  };

  return (
    <>
      <div className="img" style={styles.bgIcon} />
      &nbsp;&nbsp;
      <span className="name">{objName ? objName : aName}</span>
    </>
  );
};

export default IconsCellRenderTemplate;
