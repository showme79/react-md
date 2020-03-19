import React, { FC } from "react";
import {
  FormMessageWithCounterProps,
  TextFieldProps,
  NumberValidityOptions,
  useNumberValidity,
  FormMessage,
  TextField,
  ErrorChangeHandler,
} from "@react-md/form";

type AllowedFormMessageProps = Pick<
  FormMessageWithCounterProps,
  "counterStyle" | "counterClassName" | "messageStyle" | "messageClassName"
>;

type AllowedValidityOptions = Pick<
  NumberValidityOptions,
  | "min"
  | "max"
  | "defaultValue"
  | "fixOnBlur"
  | "helpText"
  | "counter"
  | "reportOnEnter"
  | "validateOnChange"
  | "errorIcon"
  | "getErrorIcon"
  | "getErrorMessage"
>;

interface NumberFieldWithMessageProps
  extends Omit<TextFieldProps, "value" | "defaultValue" | "min" | "max">,
    AllowedFormMessageProps,
    AllowedValidityOptions {
  onErrorChange: ErrorChangeHandler;
}

const NumberFieldWithMessage: FC<NumberFieldWithMessageProps> = ({
  id,
  theme = "outline",
  onBlur,
  onChange,
  onKeyDown,
  pattern,
  required = false,
  min,
  max,
  minLength,
  maxLength,
  counter = false,
  defaultValue,
  reportOnEnter = false,
  validateOnChange,
  fixOnBlur = "both",
  errorIcon = null,
  getErrorIcon,
  getErrorMessage,
  helpText,
  counterStyle,
  counterClassName,
  messageStyle,
  messageClassName,
  onErrorChange,
  rightChildren,
  ...props
}) => {
  // the value will be the current numer value or undefined
  const { value: _numberValue, inputProps, messageProps } = useNumberValidity({
    id,
    theme,
    onBlur,
    onChange,
    onKeyDown,
    pattern,
    required,
    min,
    max,
    minLength,
    maxLength,
    counter,
    fixOnBlur,
    defaultValue,
    reportOnEnter,
    validateOnChange,
    errorIcon,
    getErrorIcon,
    getErrorMessage,
    helpText,
    onErrorChange,
  });

  // wrap in a span since it's within a grid layout. Don't want both the text
  // field and message to gain the default margin since they should normally be
  // grouped together.
  return (
    <span>
      <TextField
        {...props}
        {...inputProps}
        type="number"
        rightChildren={rightChildren || inputProps.rightChildren}
      />
      <FormMessage
        {...messageProps}
        counterStyle={counterStyle}
        counterClassName={counterClassName}
        messageStyle={messageStyle}
        messageClassName={messageClassName}
      />
    </span>
  );
};

export default NumberFieldWithMessage;
