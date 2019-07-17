<!-- markdownlint-disable MD024-->
# Change Log

All notable changes to the "minifyall" extension will be documented in this file.

## [0.6.1] - 2019-07-17

### Added

- Configuration for disabling status bar output.
- More information in the output of the status bar.
- Changed picture of the documentation of the output in readme.md and in /Screenshots

## [0.6.0] - 2019-07-17

### Added

- Configuration setting to set hexadecimal shortener to true or false.

## [0.5.9] - 2019-07-17

### Changed

- When the file is not css, scss, json, jsonc or html it will now display a waring instead of an error.

### Added

- More examples in readme.md
- 1 More Known bugs in readme.md

## [0.5.8] - 2019-07-17

### Added

- Keybindings to readme.md

### Fixed

- Mistake in package.json that made the keybindings don't work.

## [0.5.7] - 2019-07-17

### Added

- Keybindings and more info to package.json

---

## [RELEASED] - 2019-07-17

## [0.5.6] - 2019-07-16

### Added

- Readme added much more documentation

## [0.5.5] - 2019-07-16

### Added

- Comments in main.js
- File type in output of statusbar

### Changed

- Name of folder from Minifier to src as there is more things than just minifiers.
- From let to const in main.js
- Now the function transform size is in src/sizeTransform.js to improve main.js readability

### Fixed

- Bug with the status bar that displayed the size of the last minify created

## [0.5.4] - 2019-07-15

### Fixed

- Fixed some fails with uppercasing json attributes

## [0.5.3] - 2019-07-15

### Changed

- Now the screenshots are minified

### Fixed

- Bug supper annoying that didn't let minify two different files in main.js . Not optimiced at all yet, just fixed.

## [0.5.2] - 2019-07-15

### Fixed

- Bugs that let multiple spaces exist.
- Bug that didn't let 6 digit hexadecimal be formatted
- Bug that didn't uppercase the hexadecimal values

### Added

- Readme.md section with known bugs.
- Improved status bar

## [0.5.1] - 2019-07-15

### Fixed

- Bug from the single line remover that removed a false line from an http: // link. It looked for the double '/' and removed it all to the next line.

## [0.5.0] - 2019-07-15

### Added

- When saving a file without wanting to get the new modified text in other document (default MinifyAll command). After you save the new minified text it will display in the status bar the original value --> the new value
- When you click in the status bar item it will display a table with information about the path, and the new and original size
- The status bar will dissapear when you change document or when you click to see the output!

## [0.4.2] - 2019-07-14

### Added

- Support for RGBA colors. rgba colors will be formatted to hex but rgba with alpha(transparency) color in percentajes or rgba with a 0 value in transparency.

### Changed

- Hex colors will always be formatted in uppercase.

## [0.4.2] - 2019-07-14

### Added

- When a file is formatted in other document preserving the original one; now this new document is automatically opened after saving it.

## [0.4.1] - 2019-07-14

### Added

- An icon to the project.
- Icon to the readme.md file.

## [0.4.0] - 2019-07-14

### Added

- Added emojis to the titles of the commands
- Added other command that the minified content don't replace the original and creates other document with the new minified content.
- Removed debug comments that I forgot to remove.
- Donate button in readme.md

## [0.3.0] - 2019-07-13

### Added

- Support for html
- Html minify removes single line and multiline comments and doesn't care if its set on the same line or not.

### Removed

- jsonMinifier.js removed lines minifier because its already in lineRemover.js

## [0.2.3] - 2019-07-13

### Added

- README.MD information.

## [0.2.2] - 2019-07-13

### Added

- Optimization, removed lines will be on a different module so all languages will use this module instead of having the same code in each one.

## [0.2.1] - 2019-07-13

### Changed

- Hex code is now in hexMinifier.js and all the languages will use this module instead of having the same code in each one.

### Fixed

- Several bugs with css minify, hex and spaces with selectors.
- Bug that removed a space when a tab was after

## [0.2.0] - 2019-07-13

### Added

- JSON minify support
- JSON single line comment support
- JSON multiline comment support
- JSON Multiline if its placed between code it will only remove the comment
- Now minifiers also remove tabs

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
