To help out with some simple validation flows, this package also exports two
helper hooks: `useValidity` and `useNumberField`.

The `useValidity` hook is a pretty nice wrapper for the
[constraint validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation)
that provides the required props for both a `TextField` and `FormMessage`
component and dynamically applies error messages when needed. The functionality
out of the box is:

- real-time validity checks on change instead of only on form submit (can be
  disabled by setting `validateOnChange` to `false`)
- display an error when the input is required and the user blurs the field
  without a value
- display an error if the `minLength` only on blur
- display an error if the `maxLength` is exceeded (most browsers will prevent
  this behavior though)
- display a counter if the `counter` option is set to `true`
- display an error if the provided `pattern` doesn't match only on blur (see
  `validateOnChange` below)
- display an optional `helpText` until an error occurs
- display an optional `errorIcon` as the `rightChildren` for the `TextField`
  when an error occurs
- use browser translated error messages based on the validity state but allow
  for custom messages

The `validateOnChange` option is set to a "recommended" state by default that
only validates the `valueMissing`, `tooLong`, and `badInput` states on change.
These three were chosen since they are normally fairly short messages and are
more useful for live-updates than the remaining states. This can be configured
to be a boolean to report all states on change or be a list of the
[ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
keys that should trigger validation errors on change.

This is a giant wall of text, so it's recommended to just look at the example
below, open the code sandbox, and play with the props a bit to get a better feel
for these hooks.

> Note: I am honestly pretty bad at forms so these hooks are just a simple
> suggestion as an implementation. If you are creating much more complex forms,
> you should probably choose something like
> [formik](https://github.com/jaredpalmer/formik) or your library of choice.
