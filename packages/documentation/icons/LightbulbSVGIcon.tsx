import React, { FunctionComponent } from "react";
import cn from "classnames";
import { ISVGIconProps } from "@react-md/icon";
import { Component as LightbulbIcon } from "./lightbulb.svg";

// this one isn't included in material icons for some reason?
const LightbulbSVGIcon: FunctionComponent<ISVGIconProps> = ({
  className,
  ...props
}) => (
  <LightbulbIcon
    {...props}
    className={cn("rmd-icon rmd-icon--svg", className)}
  />
);

LightbulbSVGIcon.defaultProps = {
  role: "img",
  focusable: "false",
};

export default LightbulbSVGIcon;