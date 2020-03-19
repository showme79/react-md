import { useCallback, useState } from "react";

import useValidity, {
  DEFAULT_GET_ERROR_MESSAGE,
  DEFFAULT_GET_ERROR_ICON,
  ProvidedTextFieldValidityProps,
  ValidityOptions,
  ValidityReturnValue,
} from "./useValidity";

/**
 * The current value for the number field. This will only be `undefined` if the
 * `defaultValue` was omitted.
 */
export type CurrentNumber = number | undefined;

/**
 * This is how the value within the text field should be "fixed" on blur. By
 * default, the value will not be fixed and continue to display an error if
 * there is an error.
 *
 * If this is set to `true`, the value will be updated to be within the `min`
 * and `max` values. Otherwise, setting this to `min` will only fix the minimum
 * value while `max` will only fix the maximum.
 */
export type FixNumberOnBlur = boolean | "min" | "max";

export interface NumberValidityOptions
  extends Omit<ValidityOptions, "defaultValue"> {
  /**
   * The minimum number allowed in the input.
   */
  min?: number;

  /**
   * The maximum number allowed in the input.
   */
  max?: number;

  /**
   * @see FixNumberOnBlur
   */
  fixOnBlur?: FixNumberOnBlur;

  /**
   * The default value for the input field.
   */
  defaultValue?: number;

  /**
   * Boolean if the `value` should be updated whenever the user types instead
   * of only on blur.
   */
  updateOnChange?: boolean;
}

type ProvidedNumberFieldValidityProps = ProvidedTextFieldValidityProps &
  Pick<NumberValidityOptions, "min" | "max"> & { type: "number" };

export interface NumberValidityReturnValue
  extends Omit<ValidityReturnValue, "inputProps"> {
  /**
   * The current numeric value from the text field. This will only be
   * `undefined` if the `defaultValue` was omitted. This is really just the
   * `event.currentTarget.valueAsNumber` that ensures that it is never `NaN`.
   */
  value: CurrentNumber;
  inputProps: ProvidedNumberFieldValidityProps;
}

/**
 * Updates the value to be within the min anx max values if they were provided.
 */
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

/**
 * Checks if the input is currently in an invalid state that can be fixed by the
 * fixOnBlur behavior. This will only return true if the current state is
 * invalid, the fix on blur behavior is disabled or the validation error was due
 * to something other than the matching min/max validation.
 */
function isInvalidAndUnfixable(
  isValid: boolean,
  validity: ValidityState,
  fixOnBlur: FixNumberOnBlur
): boolean {
  if (isValid) {
    return false;
  }

  const isBoth = fixOnBlur === true;
  if ((isBoth || fixOnBlur === "min") && validity.rangeUnderflow) {
    return false;
  }

  if ((isBoth || fixOnBlur === "max") && validity.rangeOverflow) {
    return false;
  }

  return true;
}

/**
 * The `useNUmberValidity` hook is used to add some simple form validation and
 * number parsing to the `TextField` component by using the browser validity
 * API. The main benefit to this hook is that it will always return the current
 * number value from the text field and ensure that it is always a valid number
 * and not `NaN`. However, the `value` can be `undefined` if the `defaultValue`
 * was omitted.
 *
 * This hook's implementation will attempt to not modify or prevent characters
 * from being typed within the text field, but instead just parse valid numbers
 * and display errors for invalid characters. Most browsers will prevent invalid
 * characters from being entered automatically for number text fields, but
 * things like `1e3` can still be entered.
 */
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
  fixOnBlur = false,
  reportOnEnter = false,
  validateOnChange = true,
  errorIcon = null,
  updateOnChange = false,
  getErrorIcon = DEFFAULT_GET_ERROR_ICON,
  getErrorMessage = DEFAULT_GET_ERROR_MESSAGE,
  ...options
}: NumberValidityOptions): NumberValidityReturnValue {
  const [number, setNumber] = useState(defaultValue);
  const {
    inputProps: textInputProps,
    messageProps,
    errorMessage,
    resetValue,
    setValue,
    setErrorMessage,
  } = useValidity({
    ...options,
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
      if (isInvalidAndUnfixable(isValid, input.validity, fixOnBlur)) {
        return;
      }

      event.stopPropagation();

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
      type: "number",
      min,
      max,
    },
    messageProps,
    errorMessage,
    resetValue: reset,
    setValue,
    setErrorMessage,
  };
}
