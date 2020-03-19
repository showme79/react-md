import React, { FC, useCallback, useState } from "react";
import { Button } from "@react-md/button";
import { DialogFooter } from "@react-md/dialog";
import { ErrorChangeHandler, Form } from "@react-md/form";
import { InfoSVGIcon } from "@react-md/material-icons";
import { Grid } from "@react-md/utils";

import TextFieldWithMessage from "./TextFieldWithMessage";
import NumberFieldWithMessage from "./NumberFieldWithMessage";

const DEFAULT_ERRORED_STATE = {
  // since it's required
  "validation-field-1": true,
};

const SimpleTextFieldValidation: FC = () => {
  const [errored, setErrored] = useState<Record<string, boolean>>(
    DEFAULT_ERRORED_STATE
  );
  const onErrorChange = useCallback<ErrorChangeHandler>((id, error) => {
    setErrored(prevErrored => ({
      ...prevErrored,
      [id]: error,
    }));
  }, []);

  const [key, setKey] = useState("true");

  /**
   * This is a pretty "simple" way of resetting the form by just forcing
   * the form elements to be re-mounted by changing the key. Another solution
   * could be to have an effect in each component to trigger the `resetValue`
   * function returned from `useValidity` when a specific prop changes instead.
   *
   * Using `resetValue` will animate floating labels back to their starting
   * position while the remount with `key` will not.
   */
  const resetForm = useCallback(() => {
    setKey(prevKey => `${prevKey !== "true"}`);
    setErrored(DEFAULT_ERRORED_STATE);
  }, []);

  return (
    <Form onReset={resetForm} style={{ maxWidth: "25rem", margin: "0 auto" }}>
      <Grid columns={1} key={key}>
        <TextFieldWithMessage
          id="validation-field-1"
          label="Name *"
          name="name"
          counter
          required
          helpText="Help text"
          minLength={4}
          maxLength={20}
          autoComplete="none"
          errorIcon={<InfoSVGIcon />}
          onErrorChange={onErrorChange}
        />
        <TextFieldWithMessage
          id="validation-field-2"
          name="email"
          type="email"
          label="Email *"
          required
          helpText="example@email.com"
          pattern="[A-z0-9]+@[A-z0-9.]+"
          errorIcon={<InfoSVGIcon />}
          onErrorChange={onErrorChange}
        />
        <TextFieldWithMessage
          id="validation-field-3"
          name="phone"
          type="tel"
          label="Phone"
          helpText="(XXX) XXX-XXXX"
          pattern="\(\d{3}\) \d{3}-\d{4}"
          required
          minLength={14}
          maxLength={14}
          errorIcon={<InfoSVGIcon />}
          onErrorChange={onErrorChange}
        />
        <NumberFieldWithMessage
          id="validation-field-4"
          name="age"
          label="Age"
          required
          min={1}
          max={120}
          errorIcon={<InfoSVGIcon />}
          onErrorChange={onErrorChange}
        />
      </Grid>
      <DialogFooter>
        <Button
          type="submit"
          theme="primary"
          disabled={Object.values(errored).some(Boolean)}
        >
          Submit
        </Button>
        <Button type="reset" theme="secondary">
          Reset
        </Button>
      </DialogFooter>
    </Form>
  );
};

export default SimpleTextFieldValidation;
