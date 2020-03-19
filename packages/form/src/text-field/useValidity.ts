import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
  useRef,
} from "react";
import { TextFieldTheme } from "./TextFieldContainer";
import { FormMessageCounterProps } from "./FormMessage";

export type TextFieldValidityOptions = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "pattern" | "required" | "minLength" | "maxLength"
>;

export type TextFieldValidityHandlers = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "onBlur" | "onChange" | "onKeyDown"
>;

/**
 * A function to get a custom error message for specific errors. This is really
 * useful when using the `pattern` attribute to give additional information or
 * changing the native "language translated" error message.
 */
export type GetErrorMessage = (
  validity: ValidityState,
  validationMessage: string,
  options: TextFieldValidityOptions
) => ErrorMessage;

/**
 * A function that can be used to dynamically get an error icon based on the
 * current visible error.
 */
export type GetErrorIcon = (
  errorMessage: ErrorMessage,
  errorIcon: ReactNode
) => ReactNode;

/**
 * A function that reports the error state changing. A good use-case for this is
 * to keep track of all the errors within your form and keep a submit button
 * disabled until they have been resolved.
 */
export type ErrorChangeHandler = (id: string, error: boolean) => void;

export type ValidateOnChange =
  | boolean
  | "recommended"
  | keyof ValidityState
  | (keyof ValidityState)[];

const RECOMMENDED_STATE_KEYS: (keyof ValidityState)[] = [
  "valueMissing",
  "tooLong",
  "badInput",
];

function isValidationIgnored(
  validateOnChange: ValidateOnChange,
  validity: ValidityState
): boolean {
  if (typeof validateOnChange === "boolean") {
    return false;
  }

  let keys = RECOMMENDED_STATE_KEYS;
  if (Array.isArray(validateOnChange)) {
    keys = validateOnChange;
  } else if (validateOnChange !== "recommended") {
    keys = [validateOnChange];
  }

  return !keys.some(key => validity[key]);
}

export interface ValidityOptions
  extends TextFieldValidityHandlers,
    TextFieldValidityOptions {
  /**
   * The id for the `TextField`. This is used to generate the id for the message
   * component and adds an `aria-describedby` attribute for the `TextField`.
   */
  id: string;

  /**
   * The default value for the `TextField`. This value should not be changed
   * while the component is mounted.
   */
  defaultValue?: string;

  /**
   * The theme to use for the `TextField`. This is really just used so that it
   * is automatically passed to the message props as well.
   *
   * Defaults to `"outline"` just like the `TextField` component.
   */
  theme?: TextFieldTheme;

  /**
   * Boolean if the `FormMessage` should also display a counter for the
   * remaining letters allowed based on the `maxLength`.
   *
   * This will still be considered false if the `maxLength` value is not
   * provided.
   */
  counter?: boolean;

  /**
   * Optional help text that should be displayed in the `FormMessage` component
   * while there is no error.
   */
  helpText?: ReactNode;

  /**
   * An optional error icon to display while there is an error due to
   * validation.
   */
  errorIcon?: ReactNode;

  /**
   * @see GetErrorIcon
   */
  getErrorIcon?: GetErrorIcon;

  /**
   * @see GetErrorMessage
   */
  getErrorMessage?: GetErrorMessage;

  /**
   * Boolean if the native `input.checkValidity()` function should be called
   * when the enter key is pressed while the input is focused. This will cause
   * the `TextField` to be re-focused due to native behavior and show a browser
   * error message.
   */
  reportOnEnter?: boolean;

  /**
   * Describes the validation behavior that should be done when the value within
   * the `TextField` changes. This can either be:
   *
   * - a boolean
   * - the string `"recommended"`
   * - a single key of the ValidityState that should trigger the validation
   * - a list of keys of the ValidityState that should trigger the validation
   */
  validateOnChange?: ValidateOnChange;

  /**
   * @see ErrorChangeHandler
   */
  onErrorChange?: ErrorChangeHandler;
}

export interface ProvidedTextFieldValidityProps
  extends TextFieldValidityOptions,
    Required<TextFieldValidityHandlers> {
  /**
   * The `id` for the `FormMessage` component that is related to the validation
   * messages.
   */
  "aria-describedby": string;

  /**
   * The id for the `TextField`.
   */
  id: string;

  /**
   * The current value for the `TextField`.
   */
  value: string;

  /**
   * The current theme for the `TextField`. Defaults to `"outline"` like the
   * `TextField` component.
   */
  theme: TextFieldTheme;

  /**
   * Boolean if the `TextField` has the `error` state due to a validation error,
   */
  error: boolean;

  /**
   * Either `null` or an icon to display to the right of the `TextField` while
   * there is an error.
   */
  rightChildren: ReactNode;
}

export interface ValidityMessageProps {
  /**
   * The id for the `FormMessage` component. This will be generated as
   * `${id}-message`.
   */
  id: string;

  /**
   * The current theme of the text field to match the horizontal padding.
   */
  theme: TextFieldTheme;

  /**
   * Boolean if the message should gain the error state which defaults to
   * changing the color to red.
   */
  error: boolean;

  /**
   * Either the current `helpText` if there is no error or the current error
   * message.
   */
  children: ReactNode;
}

export interface ValidityMessageCounterProps
  extends ValidityMessageProps,
    Pick<FormMessageCounterProps, "length" | "maxLength"> {}

export type ErrorMessage = string;
export type NoError = "";
export type ResetValue = () => void;
type SetValue = Dispatch<SetStateAction<string>>;
type SetErrorMessage = Dispatch<SetStateAction<ErrorMessage>>;

export interface ValidityReturnValue {
  /**
   * The props that should be provided to the `TextField` component to get the
   * validation to work.
   */
  inputProps: ProvidedTextFieldValidityProps;

  /**
   * The props that should be provided to the `FormMessage` component to
   * conditionally display help and error messages as well as an optional
   * counter.
   */
  messageProps: ValidityMessageProps | ValidityMessageCounterProps;

  /**
   * If the default behavior for the message component is not desired, the
   * current error message is available at the "top-level" return value as well.
   */
  errorMessage: ErrorMessage | NoError;

  /**
   * A function to call that will reset the `value` back to the `defaultValue`.
   * This is recommended to use with the `onReset` handler for a `Form`
   * component.
   */
  resetValue: ResetValue;

  /**
   * A `useState` setter for the `value` of the text field. This should probably
   * not be used unless implementing behavior to "fix" the errors for the user.
   */
  setValue: SetValue;

  /**
   * A `useState` setter for the `errorMessage` that is being displayed. This
   * should really not be used that much as the built-in validation is
   * recommended.
   */
  setErrorMessage: SetErrorMessage;
}

/**
 *
 * @private
 */
export const DEFAULT_GET_ERROR_MESSAGE: GetErrorMessage = (
  _validity,
  validationMessage,
  _options
) => validationMessage;

/**
 *
 * @private
 */
export const DEFFAULT_GET_ERROR_ICON: GetErrorIcon = (message, errorIcon) =>
  !!message && errorIcon;

/**
 *
 * @private
 */
const DEFAULT_ON_ERROR_CHANGE: ErrorChangeHandler = () => {};

/**
 * The `useValidity` hook is used to add some simple form validation to the
 * `TextField` component by using the browser validity API. This hook is
 * probably really only useful for small forms and a better solution or library
 * should be used instead for more complex forms.
 *
 * The hook will generate props to provide to the `TextField` and `FormMessage`
 * components along with displaying help or error messages as needed.
 */
export default function useValidity({
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
  validateOnChange = "recommended",
  errorIcon = null,
  getErrorIcon = DEFFAULT_GET_ERROR_ICON,
  getErrorMessage = DEFAULT_GET_ERROR_MESSAGE,
  helpText = null,
  onErrorChange = DEFAULT_ON_ERROR_CHANGE,
}: ValidityOptions): ValidityReturnValue {
  const [value, setValue] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>("");
  const errored = useRef(!!errorMessage);
  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(event);
      }

      if (event.isPropagationStopped()) {
        return;
      }

      const input = event.currentTarget;
      input.setCustomValidity("");
      input.checkValidity();

      const message = getErrorMessage(input.validity, input.validationMessage, {
        pattern,
        required,
        minLength,
        maxLength,
      });

      if (errored.current !== !!message) {
        errored.current = !!message;
        onErrorChange(id, !!message);
      }

      if (message !== input.validationMessage) {
        input.setCustomValidity(message);
      }

      setValue(input.value);
      setErrorMessage(message);
    },
    [
      getErrorMessage,
      id,
      maxLength,
      minLength,
      onBlur,
      onErrorChange,
      pattern,
      required,
    ]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }

      if (!validateOnChange) {
        return;
      }

      const input = event.currentTarget;
      input.setCustomValidity("");
      input.checkValidity();

      const message = getErrorMessage(input.validity, input.validationMessage, {
        pattern,
        required,
        minLength,
        maxLength,
      });

      if (errored.current !== !!message) {
        errored.current = !!message;
        onErrorChange(id, !!message);
      }

      const isNativeMessage = message === input.validationMessage;
      if (isNativeMessage) {
        input.setCustomValidity(message);
      }

      // the native tooShort message is extremely verbose, so the default
      // behavior is to not display it and only update the value UNLESS the
      // error message is already being displayed due to blurring the input. The
      // message will stay visible until it is no longer "errored" to not give
      // false-positive of fixing the error
      if (!!message && isValidationIgnored(validateOnChange, input.validity)) {
        setValue(input.value);
        setErrorMessage("");
        return;
      }

      setValue(input.value);
      setErrorMessage(message);
    },
    [
      getErrorMessage,
      id,
      maxLength,
      minLength,
      onChange,
      onErrorChange,
      pattern,
      required,
      validateOnChange,
    ]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (event.key === "Enter" && reportOnEnter) {
        event.currentTarget.reportValidity();
      }
    },
    [onKeyDown, reportOnEnter]
  );

  const resetValue = useCallback(() => {
    setValue(defaultValue);
    setErrorMessage("");
  }, [defaultValue]);

  const error = !!errorMessage;
  const messageId = `${id}-message`;
  const isCounting = counter && typeof maxLength === "number";

  return {
    inputProps: {
      "aria-describedby": messageId,
      id,
      theme,
      value,
      error,
      pattern,
      required,
      minLength,
      maxLength,
      onBlur: handleBlur,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      rightChildren: getErrorIcon(errorMessage, errorIcon),
    },
    messageProps: {
      id: messageId,
      error,
      theme,
      children: errorMessage || helpText,
      length: isCounting ? value.length : undefined,
      maxLength: isCounting ? maxLength : undefined,
    },
    errorMessage,
    resetValue,
    setValue,
    setErrorMessage,
  };
}
