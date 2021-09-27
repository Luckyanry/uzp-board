import {LoadPanel} from "devextreme-react/load-panel";
import {formatMessage} from "devextreme/localization";

const Spinner = ({loadingState, positionOf}) => (
  <LoadPanel
    position={{of: positionOf}}
    visible={loadingState}
    showIndicator={true}
    enabled="true"
    shading={false}
    showPane={false}
    width={400}
    message={formatMessage("msgLoadingMessage")}
  />
);

export default Spinner;
