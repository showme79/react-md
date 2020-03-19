import React, { FC } from "react";
import {
  FormMessageWithCounterProps,
  TextFieldProps,
  ValidityOptions,
  useValidity,
  FormMessage,
  TextField,
  ErrorChangeHandler,
} from "@react-md/form";

type AllowedFormMessageProps = Pick<
  FormMessageWithCounterProps,
  "counterStyle" | "counterClassName" | "messageStyle" | "messageClassName"
>;

type AllowedValidityOptions = Pick<
  ValidityOptions,
  | "helpText"
  | "counter"
  | "reportOnEnter"
  | "validateOnChange"
  | "errorIcon"
  | "getErrorIcon"
  | "getErrorMessage"
>;

interface TextFieldWithMessageProps
  extends Omit<TextFieldProps, "value">,
    AllowedFormMessageProps,
    AllowedValidityOptions {
  onErrorChange: ErrorChangeHandler;
}

const TextFieldWithMessage: FC<TextFieldWithMessageProps> = ({
  id,
  theme = "outline",
  onBlur,
  onChange,
  onKeyDown,
  pattern,
  required = false,
  minLength,
  maxLength,
  counter = false,
  defaultValue = "",
  reportOnEnter = false,
  validateOnChange,
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
  const { inputProps, messageProps } = useValidity({
    id,
    theme,
    onBlur,
    onChange,
    onKeyDown,
    pattern,
    required,
    minLength,
    maxLength,
    counter,
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

export default TextFieldWithMessage;
