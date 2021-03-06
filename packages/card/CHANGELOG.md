# v2.0.0

The card package was re-written from the ground up for the v2 release which
should allow for additional customization and styling behavior. Almost
everything is a breaking change.

## New Behavior and Features

- all the card components now correctly forward the `ref` to the DOM element
- the card's title component has been separated into three components for
  additional customization and styling: `CardHeader`, `CardTitle`, and
  `CardSubtitle`
- a new `CardContent` component was added for general styles around the main
  content
- built-in support for right-to-left languages
- a new theming API to update all the colors for a card through SCSS mixins
- cards now have a default border radius

## Breaking Changes

- The `Card` component no longer handles anything with expanding child items and
  must now be done manually
- The `CardMedia` and `CardActionOverlay` components were removed since the new
  `MediaContainer` and `MediaOverlay` components from the `@react-md/media`
  package should be used instead
- The `CardText` component was removed since the new `CardContent` component is
  recommended instead

### New SCSS Variables, Functions, and Mixins

- `$rmd-card-background-color: rmd-theme-var(surface) !default` - The background
  colors to use for cards
- `$rmd-card-color: rmd-theme-var(on-surface) !default` - The text color to use
  for cards
- `$rmd-card-secondary-color: if(rmd-theme-tone($rmd-theme-surface) == light, rmd-theme-var(text-primary-on-light), rmd-theme-var(text-primary-on-dark)) !default` -
  The secondary text color to use for cards
- `$rmd-card-elevation: 2 !default` - The elevation to use for cards that are
  not raisable
- `$rmd-card-base-elevation: 1 !default` - The starting elevation for a raisable
  card
- `$rmd-card-raised-elevation: 8 !default` - The ending elevation for a raisable
  card
- `$rmd-card-border-radius: 0.25rem !default` - The border radius to apply to
  cards
- `$rmd-card-header-padding: 1rem !default` - The default padding to apply to
  the `CardHeader` component
- `$rmd-card-header-padding-top: 1.5rem !default` - Any extra amount of padding
  to apply to the top of the `CardHeader` component since it normally looks a
  bit nicer with additional padding.
- `$rmd-card-content-padding: 1rem !default` - The amount of padding to apply to
  the `CardContent` component
- `$rmd-card-content-padding-extra: 1.5rem !default` - An additional amount of
  padding-bottom to apply to the `CardContent` component when it is the last
  child in a `Card`
- `$rmd-card-actions-padding: 0.5rem !default` - The amount of padding to apply
  to the `CardActions` component
- `$rmd-card-border-color: rmd-divider-theme-var(background-color) !default` -
  The border color for a card
- `$rmd-card-border-width: $rmd-divider-size !default` - The border width for a
  card
- `@function rmd-card-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-card-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-card-theme` - applies one of the theme values to a css property as
  a css variable
- `@mixin rmd-card-theme-update-var` - updates one of the theme values as a css
  variable

### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-card-include-text` since it is no longer required
- removed `$md-card-include-title` since it is no longer required
- removed `$md-card-include-title-avatar` since it is no longer required
- removed `$md-card-include-actions` since it is no longer required
- removed `$md-card-include-tables` since there is no longer built-in table
  support
- removed `$md-card-padding-extra` since the new `$rmd-card-content-padding` and
  `$rmd-card-content-padding-extra` variables replace this functionality
- removed `$md-card-text-font-size` since this is no longer configurable with a
  SCSS variable
- removed `$md-card-title-font-size` since this is no longer configurable with a
  SCSS variable
- removed `$md-card-title-large-font-size` since this is no longer configurable
  with a SCSS variable
