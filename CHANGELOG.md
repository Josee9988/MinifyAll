<!-- markdownlint-disable MD024-->
# Change Log

All notable changes to the "minifyall" extension will be documented in this file.

## [0.1.2] - 2019-07-13

### Added

- RGB values will now be converted into short hexadecimal.

### Removed

- Unnecesary if.

## [0.1.1] - 2019-07-12

### Changed

- Name of the get function of css: from endWork to getCssMinified
- Name of extension.js to main.js

### Added

- Info in the package.json
- Css minify now removes a space after a ':'
- Css minify now removes a space after a '{'
- Comments in cssMinifier.js
- Comment in main.js

## [0.1.0] - 2019-07-12

### Added

- Added all the initial files.
- Support for css
- Css minify hexadecimal 6 digit colors will now be turned into 3 digit ones
- Css minify can now be minified in one line.
- Css minify will now be displayed without comments
- Css minify remmoves all the spaces but the ones after the : (need to be fixed)
- Folder with all the languages that we will support (Minifiers)
