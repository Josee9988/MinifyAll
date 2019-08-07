<!-- markdownlint-disable MD024-->
# **Change Log** 📜📝

All notable changes to the "**MinifyAll**" VSCode extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [**1.1.0**] - 2019-08-07

### Fixed

* CSS now supports 'px' and 'keyframes' as a class or id name!.

## [**1.0.3**] - 2019-08-07

### Changed

* Badges link updated to current header.

## [**1.0.2**] - 2019-08-06

### Changed

* In the readme.md file changed one checkbox of upcoming features.

### Added

* In the readme.md file added one to-do checkbox.

## [**1.0.1**] - 2019-08-05

### Added

* Beta tag of JavaScriptReact in the readme.md file.
* Tag of JavaScriptReact in package.json.

## [**1.0.0**] - 2019-08-05

### Added

* Support for multi-line comments inside Strings.
* Version 1.0.0 because the extension seems mature enough knowing that JavaScript is giving some bugs yet. But all the income work will be mostly new features and enhancements.
* Heading in the changelog.md file.

### Changed

* How the comments are removed (reworked).
* An asterisk instead of a hyphen in the changelog.md file.
* Version number in bold.

### Fixed

* Some spelling mistakes.
* MinifyAll2OtherDoc (JavaScript) did not have a Time Spend console.log as the others did.

## [**0.11.0**] - 2019-08-05

### Added

* Support for JavaScriptReact (disabled by default, same as JavaScript).
* Setting for disabling/enabling JavaScriptReact.

### Fixed

* Bug that appeared when you started VSCode without any document.

## [**0.10.7**] - 2019-08-05

### Added

* Links to my other extensions in the readme.md file.
* Added a little warning message in the readme.md file.

## [**0.10.6**] - 2019-07-31

### Changed

* Javascript is disabled by default because it is not on a stable version yet(It is giving a lot of trouble and it will be disabled until everything seems fixed)
* JavaScript minify development will take a little break.

## [**0.10.5**] - 2019-07-31

### Fixed

* Multiple spelling mistakes

### Added

* Spaces in the documentation before a **@return** tag
* README.md to screenshots/

## [**0.10.4**] - 2019-07-31

### Added

* Readme inside /src/ explaining what that folder has.
* Readme inside /src/utilities/ explaining what that folder has.
* Readme inside /src/langDefaultMinifiers/ explaining what that folder has.
* @access tag in all functions (documentation)
* Description tag in all functions (documentation)
* Summary tag in all functions (documentation)

### Changed

* Name of class 'lineRemover.js' to 'commentRemover.js'
* location of readme.md in the description src/ classes

## [**0.10.3**] - 2019-07-30

### Added

* Method to display a message, so instead of having it in every case it will simply call the method for better readability!
* Some comments added
* Css less sass scss removes space before '!'
* Css less sass scss removes space before and after a','
* Css less sass scss from '0px' to '0'

### Changed

* Readme.md css example adding the new from 0px to 0 feature

## [**0.10.2**] - 2019-07-30

### Added

* Readme examples changed things that now the minifier is capable of doing

### Changed

* Package.json changed group name of editor/context from myGroup to 'MinifyAll'
* jsMinifier.js changed from a single space to \s

### Fixed

* JavaScript fixed a bug that didn't remove a comment if in the line was found a String

## [**0.10.1**] - 2019-07-30

### Added

* Css less sass scss removes space before a hexadecimal colour.
* Css less sass scss removes two single spaces at once into one.
* Css less sass scss removes space before '}'
* Css less sass scss removes space before ';'
* Css less sass scss removes space after ':'
* Css less sass scss removes space before and after ')'
* Css less sass scss removes space before and after '('

## [**0.10.0**] - 2019-07-30

### Added

* Javascript doesn't remove '//' in a regex expression!!
* Javascript removes spaces after and before '?'
* Javascript removes spaces after and before '+'
* Javascript removes spaces after and before '<'
* Javascript removes spaces after and before '>'
* Javascript removes spaces after and before ','
* Javascript removes spaces after and before '+'
* Javascript removes spaces after and before '-'
* Javascript removes spaces after and before '!='
* Javascript removes spaces after and before '!=='

### Changed

* Javascript example in readme.md

## [**0.9.12**] - 2019-07-29

### Added

* Added know bugs in readme.md

### Changed

* Line removed reworked because the function that I added in 0.9.9 has a ton of bugs
* Remove multiple lines reworked

### Fixed

* Multiple bugs removing comments (tested in jquery js(10k lines) and only gives one mistake at one regex that is not scaped)

## [**0.9.11**] - 2019-07-29

### Fixed

* Problem with multiline comments
* Multiline comments regex multiline was disabled by a mistake
* Problem with the new comment remover that added undefined. If the number of undefined changes it will simply don't remove anything from this.

### Added

* Before removing multiline comments globally, it will remove multiline comments from a single line. Reduced bugs
* Testing javascript in readme.md as it already has some bugs with hard codes. (now testing minifying jquery)

## [**0.9.10**] - 2019-07-29

### Added

* Improved overall readability
* Improved some comments
* "Remove multiline comments" in line removed added because the new method does not remove multiline comments.
* Improved readme.md examples
* Know bugs in readme.md: "Multiline comments inside of a String will be removed. Single line comments inside of a string *are allowed* but *multiline* are **not**."
* "Remove comments" seems to work perfectly but for multiline comments inside quotes

## [**0.9.9**] - 2019-07-29

### Fixed

* Remove comments completely removed by only one method [**from:**](https://j11y.io/javascript/javascript-comment-removal-revisted/) that doesn't remove comments inside strings and is much solid than my older one.

## [**0.9.8**] - 2019-07-29

### Fixed

* Reworked and improved multiline comments
* Removed some bugs with the comments

## [**0.9.7**] - 2019-07-28

### Fixed

* Bug at removing single lines
* A bug that let a single '/' when removing multiple line comments

### Changed

* Now single-line comments are removed before the multiple ones due to some bugs

## [**0.9.6**] - 2019-07-28

### Added

* Comments to the configuration in readme.md

### Changed

* Readme.md little things...
* Hex shortener is default set by true (by default is **disabled**)

## [**0.9.5**] - 2019-07-28

### Fixed

* Bug in JSONC. Trailing commas removed (,}) (,**])

## [**0.9.4**] - 2019-07-28

### Changed

* Now all the source code can be found inside src/
* Location of main.js into folder src/
* All global utilities that multiple languages use are now in src/utilities/
* All personal minifiers are in src/langDefaultMinifiers/all the files correspond to each language and perform specific tasks for each language.

### Added

* Improved readability in main.js
* Function in main.js with the CommentRemover so in the switch, you will not need to initialize a class every time, just call this method.

### Fixed

* A ton of bad spelt words.
* Some variable names fixed lowercasing when using a new word.

## [**0.9.3**] - 2019-07-28

### Fixed

* icon.png, rawicon.png and jsMinifier.js were not added!

## [**0.9.2**] - 2019-07-28

### Added

* Raw icon without the text in Screenshots/rawicon.png

### Changed

* Icon (added new languages available)
* Folder of the icon. Now it is in Screenshots/
* Readme icon to the new one
* Readme list of languages available added boldly
* Examples fixed some mistakes of order and headings

## [**0.9.1**] - 2019-07-28

### Added

* Configuration setting for disabling javascript and added in readme.md
* Improved by a lot javascript minimization

## [**0.9.0**] - 2019-07-27

### Added

* JavaScript support!!. Made from scratch, I will be improving and fixing some bugs with javascript in the upcoming days...
* Image used of right-clicking minify is now in the Screenshots/ folder

## [**0.8.6**] - 2019-07-27

### Added

* Right-click on the open file will show you both commands

## [**0.8.5**] - 2019-07-27

### Added

* Description to configuration 'statusbarAlignment' which it had not.
* Upcoming features in the readme.md file
* Improved readme
* Added 'click me to see ...' So all the configuration and the examples don't show at first.

## [**0.8.4**] - 2019-07-27

### Changed

* A lot of code that was in each language now is only in a couple of functions. (Improved readability and code consistency by a lot)
* Removed about 50 total lines of code.

## [**0.8.3**] - 2019-07-26

### Added

* 2 configuration setting for minimizing every time you save. It will minify your actual document or to a new one.

## [**0.8.2**] - 2019-07-26

### Added

* Configuration setting for disabling each language
* Information about the new configuration settings
* Configuration setting for disabling all kind of messages (error, warning and information)

## [**0.8.1**] - 2019-07-23

### Changed

* Mistake in readme.md

## [**0.8.0**] - 2019-07-18

### Changed

* Module sizeTransform only had one function and was stupid to have one module for just one function. So sizeTransform is now directly in main.js again.
* Reorganized the code in main.js
* Renamed the icon from icon-min.png to icon.png as all the pictures are minified there is no need to add this suffix.
* Readme.md examples are now underneath the configuration.

### Fixed

* When you triggered the command from now on every time you saved the document you would get a new status bar item. This is now fixed. It will only appear once and after you run MinifyAll and save.
* Output now displays all inline in the same tab.

### Added

* Configuration for setting the priority of the status bar
* Configuration for setting the alignment of the status bar (right, left)
* Time of execution of the program in the output of the status bar will also display in seconds.
* Readme new configuration settings explanation

## [**0.7.0**] - 2019-07-18

### Added

* Compatibility with LESS and SASS

## [**0.6.2**] - 2019-07-18

### Added

* Time of execution of the program in the output of the status bar (if you are using Minify2OtherDoc it will display in console.log).

## [**0.6.1**] - 2019-07-17

### Added

* Configuration for disabling status bar output.
* More information in the output of the status bar.
* Changed picture of the documentation of the output in the readme.md and /Screenshots

## [**0.6.0**] - 2019-07-17

### Added

* Configuration setting to set hexadecimal shortener to true or false.

## [**0.5.9**] - 2019-07-17

### Changed

* When the file is not css, scss, json, jsonc or HTML it will now display a warning instead of an error.

### Added

* More examples in readme.md
* 1 More Known bugs in readme.md

## [**0.5.8**] - 2019-07-17

### Added

* Keybindings to readme.md

### Fixed

* A mistake in package.json that made the keybindings don't work.

## [**0.5.7**] - 2019-07-17

### Added

* Keybindings and more info to package.json

---

## [**RELEASED**] - 2019-07-17

## [**0.5.6**] - 2019-07-16

### Added

* Readme added much more documentation

## [**0.5.5**] - 2019-07-16

### Added

* Comments in main.js
* File type in the output of status bar

### Changed

* Name of the folder from Minifier to src as there are more things than just minifiers.
* From let to const in main.js
* Now the function transform size is in src/sizeTransform.js to improve main.js readability

### Fixed

* Bug with the status bar that displayed the size of the last minify created

## [**0.5.4**] - 2019-07-15

### Fixed

* Fixed some fails with uppercasing json attributes

## [**0.5.3**] - 2019-07-15

### Changed

* Now the screenshots are minified

### Fixed

* Bug supper annoying that didn't let minify two different files in main.js. Not optimized at all yet, just fixed.

## [**0.5.2**] - 2019-07-15

### Fixed

* Bugs that let multiple spaces exist.
* A bug that didn't let 6 digit hexadecimal be formatted
* A bug that didn't uppercase the hexadecimal values

### Added

* Readme.md section with known bugs.
* Improved status bar

## [**0.5.1**] - 2019-07-15

### Fixed

* A bug from the single line remover that removed a false line from an HTTP: // link. It looked for the double '/' and removed it all to the next line.

## [**0.5.0**] - 2019-07-15

### Added

* When saving a file without wanting to get the new modified text in another document (default MinifyAll command). After you save the new minified text it will display in the status bar the original value --> the new value
* When you click on the status bar item it will display a table with information about the path, and the new and original size
* The status bar will disappear when you change document or when you click to see the output!

## [**0.4.2**] - 2019-07-14

### Added

* Support for RGBA colours. RGBA colours will be formatted to hex but rgba with alpha(transparency) colour in percentages or rgba with a 0 value in transparency.

### Changed

* Hex colours will always be formatted in uppercase.

## [**0.4.2**] - 2019-07-14

### Added

* When a file is formatted in other document preserving the original one; now this new document is automatically opened after saving it.

## [**0.4.1**] - 2019-07-14

### Added

* An icon to the project.
* Icon to the readme.md file.

## [**0.4.0**] - 2019-07-14

### Added

* Added emojis to the titles of the commands
* Added other command that the minified content doesn't replace the original and creates another document with the new minified content.
* Removed debug comments that I forgot to remove.
* Donate button in readme.md

## [**0.3.0**] - 2019-07-13

### Added

* Support for HTML
* Html minify removes the single line and multiline comments and doesn't care if its set on the same line or not.

### Removed

* jsonMinifier.js removed lines minifier because it is already in lineRemover.js

## [**0.2.3**] - 2019-07-13

### Added

* README.MD information.

## [**0.2.2**] - 2019-07-13

### Added

* Optimization, removed lines will be on a different module so all languages will use this module instead of having the same code in each one.

## [**0.2.1**] - 2019-07-13

### Changed

* Hex code is now in hexMinifier.js and all the languages will use this module instead of having the same code in each one.

### Fixed

* Several bugs with css minify, hex and spaces with selectors.
* Bug that removed a space when a tab was after

## [**0.2.0**] - 2019-07-13

### Added

* JSON minify support
* JSON single line comment support
* JSON multiline comment support
* JSON Multiline if it's placed between code it will only remove the comment
* Now minifiers also remove tabs

## [**0.1.2**] - 2019-07-13

### Added

* RGB values will now be converted into short hexadecimal.

### Removed

* Unnecessary if.

## [**0.1.1**] - 2019-07-12

### Changed

* Name of the get function of css: from endWork to getCssMinified
* Name of extension.js to main.js

### Added

* Info in the package.json
* Css minify now removes a space after a ':'
* Css minify now removes a space after a '{'
* Comments in cssMinifier.js
* Comment in main.js

## [**0.1.0**] - 2019-07-12

### Added

* Added all the initial files.
* Support for css
* Css minify hexadecimal 6 digit colours will now be turned into 3 digit ones
* Css minify can now be minified in one line.
* Css minify will now be displayed without comments
* Css minify removes all the spaces but the ones after the : (need to be fixed)
* Folder with all the languages that we will support (Minifiers)
