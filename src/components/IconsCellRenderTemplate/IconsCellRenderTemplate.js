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

  const objAuditIcons = () => {
    switch (icon) {
      case "Database_16x.png":
        return databaseIcon;
      case "DatabaseStoredProcedures_16x.png":
        return terminalIcon;
      case "Table_16x.png":
        return tableIcon;

      default:
        return;
    }
  };

  const {
    data: {OType, aName},
  } = props;

  const objPermissionsicons = () => {
    switch (OType) {
      case 0:
        return objectOff0;
      case 1:
        return objectOn1;
      case 2:
        return objectEmpty2;
      case 3:
        return containerOff3;
      case 4:
        return containerOn4;
      case 5:
        return containerEmpty5;
      case 6:
        return folder;
      case 7:
        return roleOff7;
      case 8:
        return roleOn8;
      case 9:
        return roleEmpty9;
      case 10:
        return groupOff10;
      case 11:
        return groupOn11;
      case 12:
        return groupEmpty12;

      default:
        return;
    }
  };

  const styles = {
    bgIcon: {
      display: "inline-block",
      width: "16px",
      height: "16px",
      background: `url("${
        icon ? objAuditIcons() : objPermissionsicons()
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
