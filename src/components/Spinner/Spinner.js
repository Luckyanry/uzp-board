import {LoadPanel} from "devextreme-react/load-panel";
import {formatMessage} from "devextreme/localization";
import spinner from "./icons/spinner.svg";

import "./icons/spinner.svg";

const Spinner = ({loadingState, positionOf}) => (
  <LoadPanel
    className={"load-panel"}
    position={{of: positionOf}}
    visible={loadingState}
    showIndicator={true}
    enabled="true"
    shading={false}
    showPane={false}
    width={400}
    height={140}
    message={formatMessage("msgLoadingMessage")}
    indicatorSrc={spinner}
  />
);

export default Spinner;
