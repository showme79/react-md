import React, { FunctionComponent } from "react";

import Container from "./Container";
import TooltippedButton from "./TooltippedButton";

const CommonPatterns: FunctionComponent = () => (
  <Container>
    <TooltippedButton id="tooltipped-button-1">No Tooltip</TooltippedButton>
    <TooltippedButton id="tooltipped-button-2" tooltip="This is a tooltip">
      With Tooltip
    </TooltippedButton>
  </Container>
);

export default CommonPatterns;
