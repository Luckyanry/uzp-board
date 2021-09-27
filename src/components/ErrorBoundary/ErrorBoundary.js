import {Component} from "react";
import {Popup, Position, ToolbarItem} from "devextreme-react/popup";

import "./ErrorBoundary.scss";

class ErrorBoundary extends Component {
  closeButtonOptions = null;

  state = {
    error: false,
    currentAPIMsg: {},
    popupVisible: true,
  };

  closeButtonOptions = {
    text: "Close",
    onClick: this.hideInfo,
  };

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);

    this.setState({error: true});
  }

  showInfo = (message) => {
    this.setState({
      currentAPIMsg: message,
      popupVisible: true,
    });
  };

  hideInfo = () => {
    this.setState({
      currentAPIMsg: {},
      popupVisible: false,
    });
  };

  render() {
    if (this.state.error) {
      console.log(`this.porps is error `, this.porps.msg);

      return (
        <Popup
          visible={this.state.popupVisible}
          onHiding={this.hideInfo}
          dragEnabled={false}
          closeOnOutsideClick={true}
          showCloseButton={true}
          showTitle={true}
          title="Error message"
          container=".dx-viewport"
          width={500}
          height={480}
        >
          <Position at="center" my="center" />
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location="after"
            options={this.closeButtonOptions}
          />
          <h1>Error!!!</h1>
          {/* <p>
            ScriptFile: <span>{this.state.currentAPIMsg.ScriptFile}</span>&nbsp;
          </p>
          <p>
            <span>{this.state.currentAPIMsg.VBErr.Description}</span>
          </p>
          <p>
            Error Number: <span>{this.state.currentAPIMsg.VBErr.Number}</span>
          </p>
          <p>
            Source: <span>{this.state.currentAPIMsg.VBErr.Source}</span>
          </p>
          <p>
            Hint: <span>{this.state.currentAPIMsg.hint}</span>
          </p> */}
        </Popup>
      );
    }

    console.log(`this.porps no error `, this.porps);

    return this.props.children;
  }
}

export default ErrorBoundary;
