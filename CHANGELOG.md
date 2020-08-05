<!-- markdownlint-disable MD024-->
# **Change Log** 📜📝

All notable changes to the "**MinifyAll**" VSCode extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [**2.4.0**] - 2020-08-05

### Added

* Terser now removes by default the console logs statements.

## [**2.3.2**] - 2020-07-23

### Fixed

* Fixed multiple JSON problems by updating the MinifyAllCLi to 1.1.5.

## [**2.3.1**] - 2020-05-26

### Added

* Workflow to test the extension automatically on push/pull-request (win+mac+ubuntu).
* Tests from the npm run scripts.
* CI badge on the readme.md file.

### Fixed

* Test: "Function \'getNewFilePath\' works" fixed to work on Windows.
* Right click minify on the explorer working for JavaScript and JSX to close #48.

### Changed

* From github workflow badge to png to solve vsce problem.

## [**2.3.0**] - 2020-05-18

### Added

* MinifyAll core.

### Removed

* Tests that are now included in the MinifyAll core.
* All the files that now are located in the package MinifyAll core.

## [**2.2.4**] - 2020-05-16

### Added

* Link in the readme.md file to the new Minifyall cli package.

## [**2.2.3**] - 2020-04-10

### Fixed

* Problem with the HTML minimization that caused the tags to don't keep its space between others.

## [**2.2.2**] - 2020-04-10

### Added

* Support for HTML meta tags.

### Removed

* Email from the readme.md file as it was unnecessary.

## [**2.2.1**] - 2020-03-28

### Added

* Link to the MinifyAll webpage in the readme.md file.

## [**2.2.0**] - 2020-03-21

### Added

* Support for TWIG.

### Changed

* PHP is enabled by default.

## [**2.1.6**] - 2020-03-14

### Security

* Some dependencies updated to fix one security issue.

## [**2.1.5**] - 2020-03-03

### Fixed

* Fixed problem with CSS minification (HTTPS URLS).

## [**2.1.4**] - 2020-02-14

### Fixed

* Fixed problem with CSS minification, issue #20.

## [**2.1.3**] - 2020-02-07

### Fixed

* Bug that changed '0%' into -> '0' in the css files.

## [**2.1.2**] - 2020-01-27

### Fixed

* Fixed/improved some issues with the JSON minifier. (it wasn't removing some spaces) issue#18

## [**2.1.1**] - 2020-01-10

### Fixed

* Issue #16. HTML removed spaces on line endings causing to join two words into one, the regex was improved and commented in some regex instructions.

## [**2.1.0**] - 2020-01-06

### Added

* Setting to disable PHP.

### Fixed

* Some variable names that weren't following the tslint rules at the main.ts file.

## [**2.0.3**] - 2019-12-30

### Added

* Some missing TypeScript variable declaration types.

### Fixed

* Command MinifyAll2OtherDocSelected wasn't able to detect JavaScript files, now it does.

### Changed

* Variable 'path' from var-require to import-from.
* Variable 'FileSaver'(fs) from var-require to import-from.
* Variable 'Terser' from var-require to import-from.

## [**2.0.2**] - 2019-12-30

### Added

* More complete move from JavaScript to TypeScript.
* TypeScript variable declaration types.
* TypeScript annotations.
* TypeScript documentation.
* Multiple improvements to make it easy to maintain this project in typescript.

### Changed

* Improved semantics in the main.ts file.
* Improved readability in the main.ts file.
* Typos in the setting descriptions.
* From var-require to import from.

### Removed

* Redundant code from showing messages in the main.ts file.
* Useless code.
* About 100 lines length in the main.ts file.
* Useless tslint rules that were already extended from the recomended tslint options.

## [**2.0.1**] - 2019-12-26

### Added

* Multiple ignored folders for VSCode in the .vscodeignore file to download fewer files.

## [**2.0.0**] - 2019-12-26

### Changed

* The project now uses TypeScript.
* Code is better structured and with less redundant code and way easier to be maintained.

### Added

* Extension recomendations in the .vscode/extension.json.
* File showMessage.
* Information in the controller's readme.md file about the new file showMessage.
* Multiple changes to make the project use TypeScript.
* File tsconfig and tslint to manage the TypeScript behaviour.

### Removed

* The status bar information and all the settings that came with it.
* Setting statusbarAlignment.
* Setting disableStatusbarInformation.
* Setting statusbarPriority.
* Information about the new minified size.
* All the settings from the readme.md file.
* TypeScript minify as it won't help and wasn't working well.

## [**1.10.1**] - 2019-12-24

### Added

* Setting 'minifyOnSaveToNewFile' to replace 'minifyOnSaveToNewF**I**le'
* Support for the new setting 'minifyOnSaveToNewFile' aswell as keeping retrocompatibility with the deprecated setting.
* Warning message to warn the users about the bad setting.

### Deprecated

* Setting 'minifyOnSaveToNewF**I**le' is deprecated as it has typo, use 'minifyOnSaveToNewFile' instead.

### Changed

* Setting: 'minifyOnSave' description as it was unaccurate.
* Setting: 'minifyOnSaveToNewFile' description as it was unaccurate.

### Fixed

* Multiple typos.

## [**1.10.0**] - 2019-12-19

### Added

* File getNewFilePath which contains the function getNewFilePath.
* File replaceCode which contains the functions replaceActualCode and replaceSelectedCode.
* File checkLanguage that will remove all ifs checking if the selected language is disabled or not.
* File transformSize that will contain the function transformSize.
* FileWriteMinifiedCode that will contain all the functions that write code to files.
* All the basic information about the new files in the controller at the file src/controller/README.md.
* Added more information about the folder 'Screenshots' at the file Screenshots/README.md.
* Pull request template.

### Removed

* All console logs while running the extension.
* The extension will not output the time spend.

### Fixed

* Removed multiple global variables from the main.js file.
* Fixed some paths from the tests.
* Code readability in the file main.js.
* Multiple minor mistakes in the file main.js.
* Unnecessary regex escape character in the commentRemover.js file.
* Missing semicolon in the getConfiguration.js file.
* Multiple more minor mistakes in the controller folder.

### Changed

* Some dependencies were updated.

## [**1.9.0**] - 2019-12-14

### Added

* Setting openMinifiedDocument: If you want MinifyAll to open the new minified document after you minify. (False for not opening it every time you create a minified file).

### Changed

* When the new setting openMinifiedDocument is disabled it will not show the message that it is minified, as it may break workflow.
* All the settings are located into a single variable.
* Utilities folder is now called controller as it should have been.

### Fixed

* Some global variables that weren't necessary at all.

## [**1.8.0**] - 2019-12-11

### Added

* Created new setting PrefixOfNewMinifiedFiles, that indicates the prefix of the new file created. (-min or .min) etc.

### Changed

* The extension now enables JavaScript by default.

## [**1.7.2**] - 2019-11-25

### Fixed

* Welcome to the new version, we just made it easy for you, by hiding the commands in the right-click menu and only enabling them when you are in the right file types!
* Command MinifyAllSelectedText, will only show in the enabled types + PHP, as featured in early versions.

## [**1.7.1**] - 2019-11-11

### Added

* More tests. Up to 18 total tests.
* src/readmeS.md files in the .vscodeignore file to make the user download fewer files.

## [**1.7.0**] - 2019-11-11

### Added

* Three new tests for the new file src/utilities/globalMinifiers.js, there is now a total of 9 tests.
* Support for minifying HTML in a PHP file.

### Changed

* Improved main.js readability by creating the file src/utilities/globalMinifiers.js which contains the main methods to minify.
* Example in the readme.md file of how the extension minifies HTML, because now it works even better.

### Fixed

* Mistake that made html not minify '" ' into a simple '"'.

## [**1.6.5**] - 2019-11-11

### Changed

* Improved main.js readability by a lot. (we still have a lot of work to do to improve this subject)

### Fixed

* Bug with minifying to other doc using jsonc.

## [**1.6.4**] - 2019-11-08

### Fixed

* Fixed useless import of 'document' in the main.js file.
* Fixed rule 'no-param-reassign' from function 'replaceSelectedCodeAndGetTime' in the main.js file.
* Multiple rules from ESLint in many files.

### Changed

* Multiple rules from ESLint were changed.
* VScode now ignores the test folder. (.vscodeignore).
* Git will only not upload the node_modules folder (.gitignore).

## [**1.6.3**] - 2019-11-07

### Added

* Multiple tests.

### Fixed

* Problem with HTML, that allowed double closing tag (>>).

## [**1.6.2**] - 2019-11-06

### Fixed

* Fix bug with minify to another document, that chooses the same path. (MinifyAll2OtherDoc) in JS.

## [**1.6.1**] - 2019-11-06

### Removed

* File jsMinifier, because it is useless now that we use Terser.

### Fixed

* Terser bugs controller, if there is a mistake Minifying it will display a message and not commit the minify.

## [**1.6.0**] - 2019-11-06

### Added

* **Terser** to Minify JavaScript.

### Changed

* Some dependencies were updated.
* Command minify selected text now responds to key shortcut: Ctrl+alt+. Ctrl+alt+M

## [**1.5.0**] - 2019-10-19

### Added

* Minify **selected text**.

### Changed

* Some dependencies were updated.

## [**1.4.3**] - 2019-10-14

### Fixed

* Fixed last changelog version.
* Some readme.md mistakes and alignments

## [**1.4.2**] - 2019-10-14

### Added

* Contributor to readme.md

### Fixed

* Mistake parsing css from pull request #2

## [**1.4.1**] - 2019-10-13

### Added

* Pull request from @pattishih
* A .gitignore file.

### Fixed

* Some eslint problems.

### Changed

* Some dependencies were updated.

## [**1.4.0**] - 2019-09-21

### Fixed

* Finally fixed a bug that made the extension fail when trying to minify (with the default command) multiple files, because the extension was registering a command that already was registered.

## [**1.3.10**] - 2019-09-21

### Changed

* From 'var' to 'let' in some functions.

### Changed

* Some dependencies were updated.

## [**1.3.9**] - 2019-09-13

### Added

* Documentation link for posting issues or enhancements.

### Changed

* Some regex alignments.

## [**1.3.8**] - 2019-09-12

### Changed

* The user will now download two more 'README.md' files from the folders '/src/langDefaultMinifiers/' and 'src/utilities' so he could have a better understanding of what these folders are meant (936+652KBs).

## [**1.3.7**] - 2019-09-12

### Added

* '.vscodeignore' added comments to improve readability.

### Changed

* Some dependencies were updated.

### Fixed

* Some grammar mistakes from the package.json file, changelog.md and the readme.md file was fixed to improve overall readability.

### Removed

* Useless '.vscodeignore' entry.

## [**1.3.6**] - 2019-09-07

### Changed

* Some dependencies were updated.
* VSCode engine updated to the last version.

## [**1.3.5**] - 2019-09-03

### Added

* Multiple files that are not important for running the extension to ".vscodeignore", that will make the extension run a bit more smoother.

### Removed

* .gitignore useless file.

### Changed

* Location of the file "CODE_OF_CONDUCT.md" from the main folder to ".github"-
* package.json file is now formatted.

## [**1.3.4**] - 2019-08-31

### Security

* Updated package.json and package-lock.json dependencies to fix some security issues.

## [**1.3.3**] - 2019-08-10

### Fixed

* A bug that didn't let right click on the document (not at the menu) at HTML documents
* A bug that didn't count the milliseconds and showed undefined.
* Improved readability in the main.js file.

## [**1.3.2**] - 2019-08-10

### Added

* Reorganized and improved the main.js readability.

### Fixed

* Controlled bug when you called the menu command through the command palette.

## [**1.3.1**] - 2019-08-09

### Added

* Documentation of the new Command which lets you minify a file without opening it on the menu.

### Changed

* Name of the 'disposable' variables.

### Removed

* Deprecated function of commentRemover.js.

## [**1.3.0**] - 2019-08-09

### Added

* Right-click on a menu file will not display MinifyAll2OtherDocSelected which will get the text from the selected file and create a new one with the minified text!
* Gif of the usage of this new command in the README.md file.

### Fixed

* Couple spelling mistakes.

## [**1.2.1**] - 2019-08-08

### Added

* In the README.md file configuration setting for disabling Typescript.

### Changed

* Default values in the README.md file of the configuration of JavaScript and JavaScriptReact which were on false and the default value is true for both.
* Author from a String to object in the package.json file.

### Fixed

* MinifyAll2OtherDoc was not showing the time to Minify.

## [**1.2.0**] - 2019-08-08

### Added

* Right-click on the open file will show you both commands only if you are on a supported language. This is now possible due to the new VSCode update (July 2019 (version 1.37).
* Typescript support. It will be enabled by default not as JavaScript or JavaScript react but it will show a testing tag in the readme and package.json as it is not fully ready yet.
* Typescript language in the README.md file and in the package.json file.

### Changed

* Warning message when the minified language is disabled.

## [**1.1.4**] - 2019-08-08

### Added

* Some minor optimizations to the main.js file!

### Changed

* Console log when the extension starts.

## [**1.1.3**] - 2019-08-07

### Changed

* Some documentation.

### Added

* Some Documentation.
* Multiple optimizations in main.js.
* Missing ';' in main.js.

## [**1.1.2**] - 2019-08-07

### Fixed

* File '.vscodeignore' will now ignore Screenshots folder but icon.png.

## [**1.1.1**] - 2019-08-07

### Added

* Documentation 'Description' for getters in langDefaultMinifiers/.
* File 'vscodeignore' will now ignore Screenshots folder.

### Changed

* Documentation comments of constructor in langDefaultMinifiers/.
* Updated npm dependencies to the latest version.

### Fixed

* Some spelling and punctuation mistakes in the CHANGELOG.md file.
* Some spelling mistakes in the main README.md file.

### Removed

* Some unnecessary code from the constructors of langDefaultMinifiers/.

## [**1.1.0**] - 2019-08-07

### Fixed

* CSS now supports 'px' and 'keyframes' as a class or id name!.

## [**1.0.3**] - 2019-08-07

### Changed

* Badges link updated to the current header.

## [**1.0.2**] - 2019-08-06

### Changed

* In the README.md file changed one checkbox of upcoming features.

### Added

* In the README.md file added one to-do checkbox.

## [**1.0.1**] - 2019-08-05

### Added

* Beta tag of JavaScriptReact in the README.md file.
* Tag of JavaScriptReact in package.JSON.

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

* Links to my other extensions in the README.md file.
* Added a little warning message in the README.md file.

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

* README inside /src/ explaining what that folder has.
* README inside /src/utilities/ explaining what that folder has.
* README inside /src/langDefaultMinifiers/ explaining what that folder has.
* @access tag in all functions (documentation)
* Description tag in all functions (documentation)
* Summary tag in all functions (documentation)

### Changed

* Name of class 'lineRemover.js' to 'commentRemover.js'
* location of README.md in the description src/ classes

## [**0.10.3**] - 2019-07-30

### Added

* Method to display a message, so instead of having it in every case it will simply call the method for better readability!
* Some comments added
* CSS LESS SASS SCSS removes space before '!'
* CSS LESS SASS SCSS removes space before and after a','
* CSS LESS SASS SCSS from '0px' to '0'

### Changed

* README.md CSS example adding the new from 0px to 0 feature

## [**0.10.2**] - 2019-07-30

### Added

* README examples changed things that now the minifier is capable of doing

### Changed

* Package.JSON changed group name of editor/context from 'myGroup' to 'MinifyAll'
* jsMinifier.js changed from a single space to \s

### Fixed

* JavaScript fixed a bug that didn't remove a comment if in the line was found a String

## [**0.10.1**] - 2019-07-30

### Added

* CSS LESS SASS SCSS removes space before a hexadecimal colour.
* CSS LESS SASS SCSS removes two single spaces at once into one.
* CSS LESS SASS SCSS removes space before '}'
* CSS LESS SASS SCSS removes space before ';'
* CSS LESS SASS SCSS removes space after ':'
* CSS LESS SASS SCSS removes space before and after ')'
* CSS LESS SASS SCSS removes space before and after '('

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

* Javascript example in README.md

## [**0.9.12**] - 2019-07-29

### Added

* Added know bugs in README.md

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

* Before removing multiline comments globally, it will remove multiline comments from a single-line. Reduced bugs
* Testing javascript in README.md as it already has some bugs with hard codes. (now testing minifying jquery)

## [**0.9.10**] - 2019-07-29

### Added

* Improved overall readability
* Improved some comments
* "Remove multiline comments" in line removed added because the new method does not remove multiline comments.
* Improved README.md examples
* Know bugs in README.md: "Multiline comments inside of a String will be removed. Single-line comments inside of a string *are allowed* but *multiline* are **not**."
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

* Bug at removing single-lines
* A bug that let a single '/' when removing multiple line comments

### Changed

* Now single-line comments are removed before the multiple ones due to some bugs

## [**0.9.6**] - 2019-07-28

### Added

* Comments to the configuration in README.md

### Changed

* README.md little things...
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
* README icon to the new one
* README list of languages available added boldly
* Examples fixed some mistakes of order and headings

## [**0.9.1**] - 2019-07-28

### Added

* Configuration setting for disabling javascript and added in README.md
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
* Upcoming features in the README.md file
* Improved README
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

* Mistake in README.md

## [**0.8.0**] - 2019-07-18

### Changed

* Module sizeTransform only had one function and was stupid to have one module for just one function. So sizeTransform is now directly in main.js again.
* Reorganized the code in main.js
* Renamed the icon from icon-min.png to icon.png as all the pictures are minified there is no need to add this suffix.
* README.md examples are now underneath the configuration.

### Fixed

* When you triggered the command from now on every time you saved the document you would get a new status bar item. This is now fixed. It will only appear once and after you run MinifyAll and save.
* Output now displays all inline in the same tab.

### Added

* Configuration for setting the priority of the status bar
* Configuration for setting the alignment of the status bar (right, left)
* Time of execution of the program in the output of the status bar will also display in seconds.
* README new configuration settings explanation

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
* Changed picture of the documentation of the output in the README.md and /Screenshots

## [**0.6.0**] - 2019-07-17

### Added

* Configuration setting to set hexadecimal shortener to true or false.

## [**0.5.9**] - 2019-07-17

### Changed

* When the file is not CSS, SCSS, JSON, JSONc or HTML it will now display a warning instead of an error.

### Added

* More examples in README.md
* 1 More Known bugs in README.md

## [**0.5.8**] - 2019-07-17

### Added

* Keybindings to README.md

### Fixed

* A mistake in package.JSON that made the keybindings don't work.

## [**0.5.7**] - 2019-07-17

### Added

* Keybindings and more info to package.JSON

---

## [**RELEASED**] - 2019-07-17

## [**0.5.6**] - 2019-07-16

### Added

* README added much more documentation

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

* Fixed some fails with uppercasing JSON attributes

## [**0.5.3**] - 2019-07-15

### Changed

* Now the screenshots are minified

### Fixed

* Bug super annoying that didn't let minify two different files in main.js. Not optimized at all yet, just fixed.

## [**0.5.2**] - 2019-07-15

### Fixed

* Bugs that let multiple spaces exist.
* A bug that didn't let 6 digit hexadecimal be formatted
* A bug that didn't uppercase the hexadecimal values

### Added

* README.md section with known bugs.
* Improved status bar

## [**0.5.1**] - 2019-07-15

### Fixed

* A bug from the single-line remover that removed a false line from an HTTP: // link. It looked for the double '/' and removed it all to the next line.

## [**0.5.0**] - 2019-07-15

### Added

* When saving a file without wanting to get the new modified text in another document (default MinifyAll command). After you save the new minified text it will display in the status bar the original value --> the new value
* When you click on the status bar item it will display a table with information about the path, and the new and original size
* The status bar will disappear when you change document or when you click to see the output!

## [**0.4.2**] - 2019-07-14

### Added

* Support for RGBA colours. RGBA colours will be formatted to hex but RGBA with alpha(transparency) colour in percentages or RGBA with a 0 value in transparency.

### Changed

* Hex colours will always be formatted in uppercase.

## [**0.4.2**] - 2019-07-14

### Added

* When a file is formatted in other document preserving the original one; now this new document is automatically opened after saving it.

## [**0.4.1**] - 2019-07-14

### Added

* An icon to the project.
* Icon to the README.md file.

## [**0.4.0**] - 2019-07-14

### Added

* Added emojis to the titles of the commands
* Added other command that the minified content doesn't replace the original and creates another document with the new minified content.
* Removed debug comments that I forgot to remove.
* Donate button in README.md

## [**0.3.0**] - 2019-07-13

### Added

* Support for HTML
* Html minify removes the single-line and multiline comments and doesn't care if its set on the same line or not.

### Removed

* JSONMinifier.js removed lines minifier because it is already in lineRemover.js

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

* Several bugs with CSS minify, hex and spaces with selectors.
* Bug that removed a space when a tab was after

## [**0.2.0**] - 2019-07-13

### Added

* JSON minify support
* JSON single-line comment support
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

* Name of the get function of CSS: from endWork to getCSSMinified
* Name of extension.js to main.js

### Added

* Info in the package.JSON
* CSS minify now removes a space after a ':'
* CSS minify now removes a space after a '{'
* Comments in CSSMinifier.js
* Comment in main.js

## [**0.1.0**] - 2019-07-12

### Added

* Added all the initial files.
* Support for CSS
* CSS minify hexadecimal 6 digit colours will now be turned into 3 digit ones
* CSS minify can now be minified in one line.
* CSS minify will now be displayed without comments
* CSS minify removes all the spaces but the ones after the : (need to be fixed)
* Folder with all the languages that we will support (Minifiers)
