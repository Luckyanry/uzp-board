import React, {Component} from "react";

import CountriesList from "../../components/CountriesList/CountriesList";
// import TestDevEx from "../../components/TestDevEx/TestDevEx";

import classes from "./App.module.css";

export default class App extends Component {
  render() {
    return (
      <div className={classes.appWrapper}>
        <h1 className={classes.appTitle}>Countries</h1>
        <CountriesList />
        {/* <TestDevEx /> */}
      </div>
    );
  }
}
