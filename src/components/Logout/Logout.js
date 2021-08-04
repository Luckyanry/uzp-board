import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {authLogout} from "../../store/actions/authAction";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to={"/"} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(authLogout()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
