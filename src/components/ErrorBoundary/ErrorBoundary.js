import {Component} from "react";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

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

      return <ErrorPopup />;
    }

    console.log(`this.porps no error `, this.porps);

    return this.props.children;
  }
}

export default ErrorBoundary;
