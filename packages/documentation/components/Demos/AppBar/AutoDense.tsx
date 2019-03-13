import React, { FunctionComponent } from "react";
import { AppBar, AppBarNav, AppBarTitle } from "@react-md/app-bar";
import { MenuSVGIcon } from "@react-md/material-icons";

import "./auto-dense.scss";
import Container from "./Container";

const AutoDense: FunctionComponent = () => (
  <Container className="auto-dense">
    <AppBar id="auto-dense-app-bar">
      <AppBarNav id="auto-dense-app-bar-nav" aria-label="Navigation">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarTitle>Auto Dense</AppBarTitle>
    </AppBar>
    <AppBar
      id="auto-prominent-dense-app-bar"
      className="auto-dense__prominent"
      prominent
    >
      <AppBar component="div">
        <AppBarNav
          id="auto-prominent-dense-app-bar-nav"
          aria-label="Navigation"
        >
          <MenuSVGIcon />
        </AppBarNav>
        <AppBarTitle>Auto Dense and prominent</AppBarTitle>
      </AppBar>
    </AppBar>
  </Container>
);

export default AutoDense;