import { useRef, useCallback, ChangeEvent, ChangeEventHandler } from "react";

export default function usePhoneNumber(
  onChange?: ChangeEventHandler<HTMLInputElement>
): ChangeEventHandler<HTMLInputElement> {
  const prevValue = useRef("");
  return useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }

      if (event.isPropagationStopped()) {
        return;
      }

      let { value } = event.currentTarget;
      value = value.replace(/(\(|\))+/, "$1").replace(/[^0-9() -]/g, "");
      if (!prevValue.current && value.length > 1) {
        let remaining = value;
        let nextValue = "(";
        if (remaining.length) {
          const end = Math.min(remaining.length, 3);
          nextValue = `(${value.substring(0, end)}) `;
          remaining = value.substring(end);
        }

        if (remaining.length) {
          const end = Math.min(remaining.length, 3);
          nextValue = `${nextValue}${remaining.substring(0, end)}-`;
          remaining = remaining.substring(end);
        }

        if (remaining.length) {
          nextValue = `${nextValue}${remaining}`;
        }

        value = nextValue;
      }

      if (value.length < prevValue.current.length) {
        if (/\(\d{3}\) \d{3}-$/.test(value)) {
          value = value.substring(0, value.length - 1);
        } else if (/\(\d{3}\) $/.test(value)) {
          value = value.substring(0, value.length - 2);
        } else if (/\($/.test(value)) {
          value = "";
        }
      } else if (/\(\d{3}$/.test(value)) {
        value = `${value}) `;
      } else if (/\(\d{4}$/.test(value)) {
        value = `${value.substring(0, 4)}) ${value.substring(4)}`;
      } else if (/\(\d{3}\) \d{3}$/.test(value)) {
        value = `${value}-`;
      } else if (/^\d$/.test(value)) {
        value = `(${value}`;
      }
      prevValue.current = value;
      event.currentTarget.value = value;
    },
    [onChange]
  );
}
