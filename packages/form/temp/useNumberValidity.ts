import { useCallback, useState } from "react";
import useValidity, {
  DEFAULT_GET_ERROR_MESSAGE,
  DEFFAULT_GET_ERROR_ICON,
  ValidityOptions,
  HTMLInputValidityProps,
  ValidityReturnValue,
} from "./useValidity";

export type CurrentNumber = number | undefined;

export interface NumberValidityOptions
  extends Omit<ValidityOptions, "defaultValue"> {
  min?: number;
  max?: number;
  defaultValue?: number;
  updateOnChange?: boolean;
}

type HTMLInputNumberValidityProps = HTMLInputValidityProps &
  Pick<NumberValidityOptions, "min" | "max">;

export interface NumberValidityReturnValue
  extends Omit<ValidityReturnValue, "inputProps"> {
  value: CurrentNumber;
  inputProps: HTMLInputNumberValidityProps;
}
function withinRange(
  value: number,
  min: number | undefined,
  max: number | undefined
): number {
  let nextValue = value;
  if (typeof min === "number") {
    nextValue = Math.max(min, nextValue);
  }

  if (typeof max === "number") {
    nextValue = Math.min(max, nextValue);
  }

  return nextValue;
}

export default function useNumberValidity({
  min,
  max,
  onBlur,
  onChange,
  onKeyDown,
  pattern,
  required = false,
  minLength,
  maxLength,
  defaultValue,
  reportOnEnter = false,
  validateOnChange = true,
  errorIcon = null,
  updateOnChange = false,
  getErrorIcon = DEFFAULT_GET_ERROR_ICON,
  getErrorMessage = DEFAULT_GET_ERROR_MESSAGE,
}: NumberValidityOptions): NumberValidityReturnValue {
  const [number, setNumber] = useState(defaultValue);
  const {
    inputProps: textInputProps,
    errorMessage,
    resetValue,
    setValue,
    setErrorMessage,
  } = useValidity({
    onBlur: event => {
      if (onBlur) {
        onBlur(event);
      }

      if (event.isPropagationStopped()) {
        return;
      }

      const input = event.currentTarget;
      const value = input.value.replace(/^0+([0-9]*)$/, "$1");

      input.setCustomValidity("");
      const isValid = input.checkValidity();

      if (!isValid) {
        const message = getErrorMessage(
          input.validity,
          input.validationMessage
        );

        if (message !== input.validationMessage) {
          input.setCustomValidity(message);
        }

        setValue(value);
        setErrorMessage(message);

        event.stopPropagation();
        return;
      }

      const { valueAsNumber } = input;
      setErrorMessage("");

      const number = withinRange(valueAsNumber, min, max);
      if (!value || Number.isNaN(number)) {
        resetValue();
        setNumber(defaultValue);
        return;
      }

      setNumber(number);
      setValue(`${number}`);
    },
    onChange: event => {
      if (onChange) {
        onChange(event);
      }

      if (!updateOnChange || event.isPropagationStopped()) {
        return;
      }

      const number = withinRange(event.currentTarget.valueAsNumber, min, max);
      if (!Number.isNaN(number)) {
        setNumber(number);
      }
    },
    onKeyDown,
    pattern,
    required,
    minLength,
    maxLength,
    defaultValue:
      typeof defaultValue === "number" ? defaultValue.toString() : "",
    reportOnEnter,
    validateOnChange,
    errorIcon,
    getErrorIcon,
    getErrorMessage,
  });

  const reset = useCallback(() => {
    setNumber(defaultValue);
    resetValue();
  }, [defaultValue, resetValue]);

  return {
    value: number,
    inputProps: {
      ...textInputProps,
      min,
      max,
    },
    errorMessage,
    resetValue: reset,
    setValue,
    setErrorMessage,
  };
}
