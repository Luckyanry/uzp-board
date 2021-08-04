import React from "react";

import Button from "devextreme-react/button";

// import "devextreme/dist/css/dx.common.css";
// import "devextreme/dist/css/dx.light.css";

class Btn extends React.Component {
  render() {
    return <Button text="Click me" onClick={this.sayHelloWorld} />;
  }

  sayHelloWorld() {
    alert("Hello world!");
  }
}

export default Btn;
