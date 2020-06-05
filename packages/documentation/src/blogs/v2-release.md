## v2 Release

The v2 release is a complete re-write of react-md to address the majority of
problems encountered while using v1. Unfortunately, this took a **lot** longer
than I had hoped since I ended up using this project to learn
[Typescript](https://www.typescriptlang.org/) as well as the new
[React hooks API](https://reactjs.org/docs/hooks-intro.html). Even though there
are some missing components from v1, I think the new functionality outweighs it
and the components are scoped for a later release.

#### Missing Components and Functionality from v1 <!-- no-margin-bottom -->

Before starting the migration to v2, I highly recommend reviewing the
[Working with v1](/guides/working-with-v1) guide and reviewing the following
missing functionality:

- some styling props have been removed since the new component API should
  hopefully eliminate the need for those props. (These props were normally
  `get*Style`, `get*ClassName`, etc)
- controlling the visibility and value of some components has been removed since
  I struggled figuring out a good way to handle controlled/uncontrolled
  components and hooks. I definitely plan on adding support for this
  functionality back in.
- the `BottomNavigation` component has not been added to the initial v2 release.
  This component might be added at a later time, but the new #app-bar package
  should be able to solve a decent amount of use cases.
- the `DatePicker` and `TimePicker` components have not been added to the
  initial v2 release. These two components will definitely be added in a later
  release, but require a lot more time to implement since **dates are hard** and
  I want to create all the sub-components in a reusable and exportable way for
  additional customization.
- removed the `FileUpload` component since it didn't feel extremely useful since
  it didn't actually upload a file to a server
- the `mini` variants for the `Drawer`/`NavigationDrawer` components have not
  yet been implemented in the new `Layout` component.
- removed the `MenuTab` component due to never really working correctly and the
  new #tabs package should allow for a much better user experience and
  customization.
- removed the `ListItemControl` component since it was implemented pretty badly.
  The new #list and #form packages should allow for this to be re-implemented in
  your app fairly easily though.
- removed the `TablePagination` and `TableCardHeader` components since I wasn't
  sure how helpful they were and didn't really work. The new #table styling
  behavior and customization should allow for a custom implementation fairly
  easily though.
- removed the `EditDialogColumn`, `SelectFieldColumn`, `*Column` components from
  the #table package since they aren't really needed anymore. Form elements
  should be renderable within tables without the weird hacks these components
  were implementing.
- removed the `Version` component since it was probably only ever used by the
  documentation site.

## What's new in v2?

This release focused on updating `react-md` to be as customizable as possible by
exporting a lot more low-level components, hooks, and utils that were used
internally. Something that I noticed from the v1 release is that if something
was not easily customizable or specific components were not public, it was
**easier to actually write your own version of that component**. This was a
major flaw and caused lots of problems especially since the majority of the
functionality behind these components were not reusable. The new components and
hooks should be able to help for these use cases but the down side is that
you'll still need to create a custom implementation for common patterns
throughout your app because some patterns seem repetitive.

### Rewrite to Typescript

> Note: Upgrading to v2 of `react-md` does **not** require you to also use
> Typescript even though it is highly recommended to do so. You can still use
> `react-md` with JavaScript as you have done before, but all the examples and
> documentation will be written with Typescript.

[v1.1.0](/v1/discover-more/whats-new#v1-1-0-released) was the first `react-md`
release to add support for Typescript but unfortunately the type definitions
were [not that great]({{GITHUB_URL}}/blob/v1/src/js/index.ts) because I did not
fully understand Typescript and kept getting out of sync or forgotten. Since
Typescript is becoming the new trend for web development with additional tooling
and editor integrations, it seemed like a good time to finally start learning
Typescript and re-write `react-md` to use it natively.

One of the biggest pros for rewriting to Typescript is that now all the
documentation around Component props, hooks, or utils can now be viewed within
your editor or IDE if it supports the `"Go to Definition"` functionality due to
being compiled with the `*.d.ts` files now. In addition, the type definitions
should never be out of sync and should be much more strictly typed than before
since the entire library has been written in Typescript.

That being said, there are a few type definitions that could still be improved
in v2 especially around [generics and Records]({{GITHUB_URL}}/issues/859) so any
suggestions or PRs are welcomed.

### New Behavior for Determining the Current Application Size

In v1, the `Drawer` and `NavigationDrawer` components were used to be able to
determine the current app size using the static methods: `getCurrentMedia` and
`matchesMedia`. This meant that the only way to determine the current
application size through media queries was to either:

- render a `Drawer` or `NavigationDrawer` components and hook into the
  `onMediaTypeChange` callback prop
- manually create a resize listener and use the
  `Drawer.getCurrentMedia`/`NavigationDrawer.getCurrentMedia` static methods
- implement a custom solution

This solution was pretty terrible and lead to confusion, out-of-sync behavior,
and bugs.

Starting with v2 these issues should be resolved due to React implementing the
new [Context API](https://reactjs.org/docs/context.html) along with the new
[AppSizeListener](/packages/utils/demos#app-size-listener-example-title)
component and media query SCSS mixins.

#### AppSizeListener Component and useAppSize Hook <!-- no-margin-bottom -->

The new `AppSizeListener` component should be mounted **once** near the root of
your app which will initialize multiple resize and media query event listeners
to determine what size your app is currently being rendered while the
`useAppSize` hook allows access to the current size.

Check out the
[AppSizeListener example](/packages/utils/demos#app-size-listener-example-title)
for more details and a live demo.

#### Media Query Mixins and Components <!-- no-margin-bottom -->

In addition to the new component and hook, `react-md` now provides a few utility
SCSS mixins for applying styles at different media query sizes:

- [rmd-utils-phone-media](/packages/utils/sassdoc#utils-mixin-rmd-utils-phone-media)
- [rmd-utils-tablet-media](/packages/utils/sassdoc#utils-mixin-rmd-utils-tablet-media)
- [rmd-utils-tablet-only-media](/packages/utils/sassdoc#utils-mixin-rmd-utils-tablet-only-media)
- [rmd-utils-desktop-media](/packages/utils/sassdoc#utils-mixin-rmd-utils-desktop-media)
- [rmd-utils-large-desktop-media](/packages/utils/sassdoc#utils-mixin-rmd-utils-large-desktop-media)

There are also a few media query components which can be used to conditionally
render components based on the current application site. Check out the
[Media Query Components example](/packages/utils/demos#media-query-components-title)
for some more information.

### New Utility SCSS Mixins

### SCSS Variables and Default Values in JavaScript

### New Theme API

### Automatic Color Fixes for Accessible Contrast Ratios

### Improved Typography and CSS Reset

To be honest, I had no idea what I was doing with typography in v1 <sup>_(I
still don't really understand typography)_</sup> and defaulted to modifying the
default tags with `react-md` typography styles:

- `<h1> - <h6>`
- `<p>`
- `<caption>`
- `<input>`
- `<textarea>`
- `<button>`

Starting with v2, `react-md` will provide a much simpler
[CSS reset](/packages/utils/sassdoc#utils-mixin-rmd-utils-base) and not apply
any typography to html tags. In addition, the default typography styles can be
overridden or merged with new styles using the
[\$rmd-typography-styles variable](/packages/typography/sassdoc#typography-variable-rmd-typography-styles).
The new #typography package also exports two new components for general text
styling and reusable typography mixins.

### Improved User Interaction States

### Improved Accessibility and Keyboard Movement

### Right to left Language Support

`react-md` will now automatically update the provided styles when a parent
element (normally the root `<html>`) for `dir="rtl"` to support right to left
languages. The following properties will be automatically inversed:

- `margin-left`
- `margin-right`
- `padding-left`
- `padding-right`
- `left`
- `right`

Since it might be required to update non-react-md components with these styles,
the #utils package also exports the following mixins to implement this behavior:

- [rmd-utils-rtl](/packages/utils/sassdoc#utils-mixin-rmd-utils-rtl)
- [rmd-utils-rtl-auto](/packages/utils/sassdoc#utils-mixin-rmd-utils-rtl-auto)
- [rmd-utils-rtl-auto-group](/packages/utils/sassdoc#utils-mixin-rmd-utils-rtl-auto-group)

> The documentation site allows for a live preview for this functionality! If
> you are on desktop, click the right to left toggle button in the main header.
> If you are on mobile, click the kebab menu in the main header and then click
> the toggle right to left option.

This feature is enabled by default starting with v2 but can be disabled by
updating the
[rmd-utils-enable-rtl](/packages/utils/sassdoc#utils-variable-rmd-utils-enable-rtl)
variable:

```scss
$rmd-utils-enable-rtl: false;

@import "~react-md/dist/react-md";
```

### Convenience Configuration and Context Provider Components

### Around 50 new Components and 40 hooks

### All Material Icons Available as Components

Since it can be difficult to remember all the icon names or even mistyping a
font icon name, `react-md@v2` now provides every material icon as a `FontIcon`
and `SVGIcon` implementation. At the time of writing these release notes, there
are **932 icons available** which means **1864 icon components**. Check out the
#material-icons package for more info and previewing every icon.

### Scoped Packages

Since v2 of `react-md` ended up being a complete re-write, I wanted to create a
way to be able to slowly update existing apps from v1 to v2 without forcing an
immediate re-write.

### New Documentation Site

The documentation site has been re-written to use [NextJS](https://nextjs.org/)
instead of the extremely outdated custom implementation with different webpack
configs. This should hopefully allow contributors to get started more quickly
and apply changes as needed. Each page should now also provide a table of
contents to be able to quickly navigate to a specific heading, demo,
documentation, etc. There are also some other small other documentation
improvements that will be outlined below.

#### Improved Documentation <!-- no-margin-bottom -->

After reviewing feedback about the v1 documentation site, the main problem areas
were:

- unable to view the full context of the example code
- unable to live-edit the example code
- unable to see the default compiled value for SCSS variables
- not enough useful documentation around SCSS usage
- not enough information about the example

To solve the first two issues, a custom
[sandbox generator script]({{GITHUB_FILE_URL}}/packages/dev-utils/src/sandbox/index.ts)
was created that resolves every
[dependency and file name]({{GITHUB_FILE_URL}}/packages/dev-utils/src/sandbox/extract.ts#L58)
for each demo and generates a
[sandbox json file]({{GITHUB_FILE_URL}}/packages/dev-utils/src/sandbox/generate.ts#L139).
This allows for the new and improved
[DemoSandbox]({{GITHUB_FILE_URL}}/packages/documentation/src/components/DemoSandbox/DemoSandbox.tsx)
to render all the files for a demo as well as dynamically creating an editable
code sandbox using the
[codesandbox define API](https://codesandbox.io/docs/importing#define-api). Each
demo will now have a button to preview the code in the new `DemoSandbox`, create
an editable sandbox with [CodeSandbox](https://codesandbox.io/), and a directly
link to the source code within GitHub to help show the full context of the
demos. In addition, each demo was updated to hopefully be a lot less complex
than some that appeared in v1.

The third issue was solved by re-writing the
[sassdoc generator script]({{GITHUB_FILE_URL}}/packages/dev-utils/src/sassdoc.ts)
to
[hackily force compile the scss variable]({{GITHUB_FILE_URL}}/packages/dev-utils/src/utils/getCompiledScssVariable.ts#L134).
Now if a variable references another SCSS variable, the default compiled value
can be viewed by enabling the "Default Compiled Value" switch for that variable.
Check out the
[\$rmd-alert-theme-values variable](/packages/alert/sassdoc#alert-variable-rmd-alert-theme-values)
for a quick example.

The forth issue has not been solved completely, but there is now a new solution
in place by being able to render examples a bit easier within SassDoc and
showing the compiled value. The
[rmd-utils-rtl mixin](/packages/utils/sassdoc#utils-mixin-rmd-utils-rtl) has a
pretty good example to reference for this functionality.

The last issue about missing information for the example has hopefully been
solved by the new writing patterns throughout the documentation site. Each
example should now have a bit more information about the components being used
along with some background information about what the demo is trying to
accomplish. **Documentation is difficult** so please provide feedback for what
has been helpful and what has not.

### GZip Size Comparison

There was a slight size increase with the v2 release now that a lot more
functionality and components have been added. The UMD size has increased by
`~17%` and the CSS bundles have increased by `~7% - 9%`:

```sh
v2 size
The gzipped UMD bundle size is:
 - dist/umd/react-md.production.min.js 55 B

The min and max gzipped CSS bundle sizes are:
 - dist/css/react-md.red-lime-100-light.min.css 61 B
 - dist/css/react-md.blue_grey-deep_orange-100-light.min.css 76 B

v1 size
The gzipped UMD bundle size is:
 - v1/dist/umd/react-md.min.js 47 B

The min and max gzipped CSS bundle sizes are:
 - v1/dist/css/react-md.blue-red.min.css 56 B
 - v1/dist/css/react-md.deep_orange-light_green.min.css 71 B
```

That being said, v2 _should_ have finally solved the code splitting issue that
existing in v1 and produce a smaller bundle if every feature within `react-md`
is not used.

## In-depth Changelogs

This should be the main highlights for the v2 release. If you are interested in
an in-depth package-by-package update and changelog, you can view one of the
following changelogs:

- [@react-md/alert](/packages/alert/changelog#v200)
- [@react-md/app-bar](/packages/app-bar/changelog#v200)
- [@react-md/autocomplete](/packages/autocomplete/changelog#v200)
- [@react-md/avatar](/packages/avatar/changelog#v200)
- [@react-md/badge](/packages/badge/changelog#v200)
- [@react-md/button](/packages/button/changelog#v200)
- [@react-md/card](/packages/card/changelog#v200)
- [@react-md/chip](/packages/chip/changelog#v200)
- [@react-md/dialog](/packages/dialog/changelog#v200)
- [@react-md/divider](/packages/divider/changelog#v200)
- [@react-md/elevation](/packages/elevation/changelog#v200)
- [@react-md/expansion-panel](/packages/expansion-panel/changelog#v200)
- [@react-md/form](/packages/form/changelog#v200)
- [@react-md/icon](/packages/icon/changelog#v200)
- [@react-md/layout](/packages/layout/changelog#v200)
- [@react-md/link](/packages/link/changelog#v200)
- [@react-md/list](/packages/list/changelog#v200)
- [@react-md/material-icons](/packages/material-icons/changelog#v200)
- [@react-md/media](/packages/media/changelog#v200)
- [@react-md/menu](/packages/menu/changelog#v200)
- [@react-md/overlay](/packages/overlay/changelog#v200)
- [@react-md/portal](/packages/portal/changelog#v200)
- [@react-md/progress](/packages/progress/changelog#v200)
- [@react-md/sheet](/packages/sheet/changelog#v200)
- [@react-md/states](/packages/states/changelog#v200)
- [@react-md/table](/packages/table/changelog#v200)
- [@react-md/tabs](/packages/tabs/changelog#v200)
- [@react-md/theme](/packages/theme/changelog#v200)
- [@react-md/tooltip](/packages/tooltip/changelog#v200)
- [@react-md/transition](/packages/transition/changelog#v200)
- [@react-md/tree](/packages/tree/changelog#v200)
- [@react-md/typography](/packages/typography/changelog#v200)
- [@react-md/utils](/packages/utils/changelog#v200)
