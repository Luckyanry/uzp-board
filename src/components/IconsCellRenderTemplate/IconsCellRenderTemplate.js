import databaseIcon from "./icons/databaseIcon.svg";
import tableIcon from "./icons/tableIcon.svg";
import terminalIcon from "./icons/terminalIcon.svg";

import "./IconsCellRenderTemplate.scss";

const IconsCellRenderTemplate = (props) => {
  const {
    data: {icon, objName},
  } = props;

  const styles = (icon) => ({
    bgIcon: {
      display: "inline-block",
      width: "16px",
      height: "16px",
      background: `url("${icon}") 0% 0% / 100% no-repeat`,
    },
  });

  const objAuditIcons = () => {
    switch (icon) {
      case "Database_16x.png":
        return styles(databaseIcon).bgIcon;
      case "DatabaseStoredProcedures_16x.png":
        return styles(terminalIcon).bgIcon;
      case "Table_16x.png":
        return styles(tableIcon).bgIcon;

      default:
        return;
    }
  };

  return (
    <>
      <div className="img" style={objAuditIcons()} />
      &nbsp;&nbsp;
      <span className="name">{objName}</span>
    </>
  );
};

export default IconsCellRenderTemplate;
