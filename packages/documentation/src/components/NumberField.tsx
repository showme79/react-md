import React, { FC, CSSProperties, useEffect, useRef } from "react";
import {
  TextFieldProps,
  NumberValidityOptions,
  useNumberValidity,
  FormMessage,
  TextField,
} from "@react-md/form";

export interface NumberFieldProps
  extends Omit<
      TextFieldProps,
      "type" | "defaultValue" | "value" | "min" | "max"
    >,
    Omit<NumberValidityOptions, "counter"> {
  containerStyle?: CSSProperties;
  containerClassName?: string;
  onNumberChange?(value: number): void;
}

const NumberField: FC<NumberFieldProps> = ({
  id,
  theme,
  containerStyle,
  containerClassName,
  defaultValue,
  min,
  max,
  onBlur,
  onChange,
  onKeyDown,
  pattern,
  required,
  minLength,
  maxLength,
  helpText,
  fixOnBlur,
  reportOnEnter,
  validateOnChange,
  errorIcon,
  updateOnChange,
  getErrorIcon,
  getErrorMessage,
  onErrorChange,
  onNumberChange,
  ...props
}) => {
  const { value, inputProps, messageProps } = useNumberValidity({
    id,
    theme,
    helpText,
    defaultValue,
    min,
    max,
    onBlur,
    onChange,
    onKeyDown,
    pattern,
    required,
    minLength,
    maxLength,
    fixOnBlur,
    reportOnEnter,
    validateOnChange,
    errorIcon,
    updateOnChange,
    onErrorChange,
    getErrorIcon,
    getErrorMessage,
  });

  const renderedOnce = useRef(false);
  useEffect(() => {
    if (!renderedOnce.current) {
      renderedOnce.current = true;
      return;
    }

    if (onNumberChange && typeof value === "number") {
      onNumberChange(value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span style={containerStyle} className={containerClassName}>
      <TextField {...inputProps} {...props} />
      <FormMessage {...messageProps} />
    </span>
  );
};

export default NumberField;
