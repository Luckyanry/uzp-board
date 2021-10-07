import databaseIcon from "./icons/databaseIcon.svg";
import tableIcon from "./icons/tableIcon.svg";
import terminalIcon from "./icons/terminalIcon.svg";
import "./IconsCellRenderTemplate.scss";

const IconsCellRenderTemplate = ({data: {icon, objName}}) => {
  console.log("cellRender => ", icon, objName);

  const icons =
    (icon === "Database_16x.png" && databaseIcon) ||
    (icon === "DatabaseStoredProcedures_16x.png" && terminalIcon) ||
    (icon === "Table_16x.png" && tableIcon);

  const styles = {
    bgIcon: {
      display: "inline-block",
      width: "16px",
      height: "16px",
      background: `url("${icons}") 0% 0% / 100% no-repeat`,
    },
  };

  return (
    <>
      <div className="img" style={styles.bgIcon} />
      &nbsp;&nbsp;
      <span className="name">{objName}</span>
    </>
  );
};

export default IconsCellRenderTemplate;
