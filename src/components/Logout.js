import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

import * as action from "../app/actioncreator";

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(action.logout()),
  };
};

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Navigate to="/" />;
  }
}

export default connect(null, mapDispatchToProps)(Logout);