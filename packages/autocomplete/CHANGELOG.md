# v2.0.0

The v2 release completely re-write the `Autocomplete` component and renamed it
to `AutoComplete`. There is a new API for dealing with data as well as a lot of
accessibility fixes.

## New Behavior and Features

- correctly forwards the ref to the `<input />` element
- inherits all the new text field styles
- inherits all the new `Option`/`ListItem` styles
- lots of accessibility fixes since it now respects to the
  [combobox role](https://www.w3.org/TR/wai-aria-practices/#combobox)
- opinionated better focus styles to help show keyboard focus vs "real" focus
- the `"inline"` autocomplete is no longer a clickable `<span>` and instead is
  done with `input.setSelectionRange`
- supports both `"inline"` and `"menu"` autocomplete behavior instead of being
  separate
- supports limited highlighting of text within the search results
- defaults to showing the list of suggestions once focused instead of after
  typing a letter
- added additional filter options to the filter function
- added a flag to be able to filter the data when there is no `value` for custom
  display items
- added `getResultId`, `getResultLabel` and `getResultValue` to customizing the
  displayed matches a bit nicer (this is also have the `data` is filtered)

## Breaking Changes

Everything is honestly a breaking change, but here's a few that are important to
mention:

- no longer has any styles of its own
- only supports "smart" menus (automatically render itself within the viewport)
- the `value` is no longer controllable (will be added in a later release)
- no longer supports adding `aria-setsize` and `aria-posinset` for each option
  automatically when paginating results (will be added in a later release)
- no longer supports rendering items that are not searchable and focusable (will
  be added in a later release)
- the visibility of the autocomplete list is no longer controllable
- renamed `dataLabel` to `labelKey`
- renamed `dataValue` to `valueKey`
- renamed the `deleteKeys` to `omitKeys`
- all the positioning options were renamed

### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-inline-autocomplete`
- removed `$md-autocomplete-suggestion-top`
- removed `$md-autocomplete-suggestion-mobile-floating-top`
- removed `$md-autocomplete-suggestion-mobile-block-top`
- removed `$md-autocomplete-suggestion-desktop-floating-top`
- removed `$md-autocomplete-suggestion-desktop-block-top`
- removed `@mixin react-md-autocompletes`
- removed `@mixin react-md-theme-autocompletes`
- removed `@mixin react-md-autocompletes-mobile`
- removed `@mixin react-md-autocompletes-desktop`
- removed `@mixin react-md-autocompletes-media`
