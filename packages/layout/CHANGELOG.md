# v2.0.0

This package is kind of a replacement for the `NavigationDrawer` component that
also now has a top-level `Configuration` provider for `react-md`.

## New Behavior and Features

- every part of the layout is now completely configurable by exporting multiple
  layout components along with a `<name>Props` configuration object
- better built-in support for rendering navigation trees with the new
  `useLayoutNavigation` hook and `LayoutTree` component
- when the persistent navigation panel toggles in and out of view, the title and
  main content will now correctly use the same animation timing as the panel
- the layout will no longer animate while switching layout types due to resizing
  and instead will update instantly
- a new `useLayoutConfig` hook that allows controlled the layout for additional
  customization
- new exported utils for determining what the current layout type is being
  rendered as
- keyboard focus behavior is now correctly maintained while toggling the
  temporary and persistent layout types
- all the icon buttons now have a default `aria-label` for toggling the
  temporary and persistent layouts
- the `<main>` element will now gain a focus box-shadow while being keyboard
  focused
- the `<main>` element will only gain a `tabIndex={-1}` while in keyboard mode
  so that clicking anywhere in the `<main>` content will not re-focus the main
  element. This is super nice since it allows you to click somewhere within the
  `<main>` element and press `tab` to focus the closest focusable element

## Breaking Changes

Everything is a really a breaking change since the components were re-written
and the API has changed, but here are a few notable points:

- this release does not have a `mini` variant for the temporary and persistent
  layout types. The `mini` variant will be added in a following release once I
  figure out a better way to handle these types along with keyboard movement
- the `Layout` has no functionality for determining your current app size since
  it was moved to the [@react-md/utils] package as `AppSizeListener` and
  `useAppSize`
- removed the static `getCurrentMedia` function from the component
- removed the `DrawerType` and `DrawerTypes` static enums from the component

### New SCSS Variables, Functions, and Mixins

- `$rmd-layout-enter-duration: $rmd-sheet-enter-duration !default` - the
  duration when the toggleable navigation panel comes into view
- `$rmd-layout-leave-duration: $rmd-sheet-leave-duration !default` - the
  duration when the toggleable navigation panel leaves the view
- `$rmd-layout-main-focus-shadow: $rmd-states-focus-shadow !default` - the
  box-shadow to use when the `<main>` element has been keyboard focused
- `$rmd-layout-main-focus-z-index: 999 !default` - the z-index for the `<main>`
  element when it has been keyboard focused
- `$rmd-layout-navigation-z-index: $rmd-dialog-z-index !default` - the z-index
  for the navigation pane
- `$rmd-layout-navigation-width: $rmd-sheet-static-width !default` - the width
  to use for the desktop persistent navigation panel
- `$rmd-layout-mini-navigation-width: 4.5rem !default` - the width to use for
  the mini navigation tree. **Note: currently not implemented**
- `@function rmd-layout-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-layout-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-layout-theme-update-var` - updates one of the theme values as a
  css variable

### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-navigation-drawer-enforce-height` since it is no longer used
- removed `$md-navigation-drawer-use-view-height` since it lead to a lot of
  problems
- removed `$md-navigation-drawer-include-cross-fade`,
  `$md-cross-fade-transition-time`, and `$md-cross-fade-distance` since this is
  now part of the [@react-md/transition] package
- removed `$md-navigation-drawer-title-offset` since this is automatically
  calculated with CSS variables

[@react-md/transition]:
  https://github.com/mlaursen/react-md/tree/master/packages/transition
[@react-md/utils]:
  https://github.com/mlaursen/react-md/tree/master/packages/utils
