<!-- markdownlint-disable MD024-->
# **Change Log** 📜📝

All notable changes to the "**MinifyAll**" VSCode extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [**2.7.0**] - 2021-07-15

### Added

* Support for vue files to be treated as HTML files.

## [**2.6.1**] - 2021-07-01

### Changed

* MinifyAllCli (core) changed by updating the package to its newest version (1.2.2).

## [**2.6.0**] - 2021-05-26

### Added

* Compress command. It will be called from the menu and it is able to minify files or folders.

### Changed

* Ordered TS imports.
* Updated npm packages.

## [**2.5.21**] - 2021-04-13

### Changed

* MinifyAllCli (core) changed by updating the package to its newest version (1.1.16).

## [**2.5.19**] - 2021-04-13

### Added

* List of posts in which the extension has been mentioned or reviewed.
* 'tsc' as a default VSCode build task.

### Changed

* Extension icon

### Removed

* VSCode default watch task.

### Removed

* Readme known bugs 'The command "Minify the selected document and preserve the original will not work on Windows'.

## [**2.5.18**] - 2021-04-11

### Fixed

* Launch scripts and 'webpack' rules.
* MinifyAll2OtherDoc 'scss' prefix of file fixed.

## [**2.5.16**] - 2021-04-11

### Changed

* MinifyAllCli (core) changed by updating the package to its newest version (1.1.15).

## [**2.5.14**] - 2021-04-11

### Added

* Recommended project build with webpack from vscode docs.

## [**2.5.13**] - 2021-04-11

### Added

* Uglifyjs command to minimize using terser all the output files having multiple of them to improve performance.

### Removed

* Webpack, as it was giving some errors and performance ways it was minimizing all into a single file, making the extension slower when loading it.

## [**2.5.12**] - 2021-04-11

### Added

* If the output error 'We can not format this file type yet' occurs, it will tell the file type so it will be easier to understand.

## [**2.5.11**] - 2021-04-06

### Changed

* MinifyAllCli (core) changed by updating the package to its newest version (1.1.14).

## [**2.5.10**] - 2021-04-06

### Changed

* MinifyAllCli (core) changed by updating the package to its newest version (1.1.13).

## [**2.5.9**] - 2021-04-01

### Fixed

* Removed disabled file types if the user has selected the option to minify on save to fix issue #86

## [**2.5.8**] - 2021-03-15

### Changed

* MinifyAllCli (core) changed by updating the package to its newest version (1.1.12).

## [**2.5.7**] - 2021-03-12

### Changed

* MinifyAllCli (core) changed by updating the package to its newest version (1.1.11).

## [**2.5.6**] - 2021-03-11

### Added

* Improved extension performance and removed tslib from dev dependencies.
* Bundle size is now ~ 4 MB.

## [**2.5.3**] - 2021-03-11

### Added

* Reduced bundle size

## [**2.5.2**] - 2021-03-10

### Changed

* Updated minifyall core version to 1.1.10.

### Removed

* All CHANGELOGS from version 0.x to 1.x to not make this file that huge.
* .map files to make the bundle size of the extension smaller.

## [**2.5.1**] - 2021-02-23

### Changed

* Updated minifyall dependencies.

## [**2.5.0**] - 2021-02-02

### Added

* Package json scripts to publish the extension to VSX and vscode marketplace.
* Setting "terserMinifyOptions" will allow the users to fully customize their Terser options.
* Updated the readme to announce the new setting.

### Removed

* Setting "removeJavascriptConsolelogs".

## [**2.4.14**] - 2021-02-02

### Changed

* Updated dependencies.

## [**2.4.13**] - 2020-12-08

### Removed

* Bin folder from the vscode extension files.

## [**2.4.12**] - 2020-12-08

### Fixed

* Version 2.4.11 was not uploading .map files.

### Removed

* Errors showing in the VSCode extension profiler due to the missing .maps.

## [**2.4.11**] - 2020-12-08

### Added

* Added the .map files again to the vscode repository (removed "**/*.map" from the .vscodeignore file).

## [**2.4.10**] - 2020-12-03

### Added

* Specific activation events to improve the VSCode startup time (MinifyAll will only be initialized when the user opens any of the supported file types). Close issue #72
* Line in the README.md file asking for contributors.

## [**2.4.9**] - 2020-09-22

### Fixed

* Terser is now working (using its latest API instructions).

## [**2.4.8**] - 2020-09-21

### Added

* Github issue templates from [josee's project-template](https://github.com/Josee9988/project-template).

## [**2.4.7**] - 2020-09-21

### Changed

* Updated "terser" to its latest version to close #65.

## [**2.4.6**] - 2020-09-03

### Changed

* MinifyAllCli (core) changed by updating the package to its newest version (1.1.8).

## [**2.4.5**] - 2020-09-02

### Fixed

* MinifyAllCli fix by updating the package to its newest version (1.1.8).

## [**2.4.4**] - 2020-09-01

### Fixed

* MinifyAllCli fix by updating the package to its newest version (1.1.7).

## [**2.4.3**] - 2020-08-31

### Fixed

* MinifyAllCli fix by updating the package to its newest version (1.1.6).

## [**2.4.2**] - 2020-08-17

### Fixed

* Fixed issue #52. Command MinifyAll2OtherDoc seems to be working in windows and linux.

## [**2.4.1**] - 2020-08-11

### Added

* Issue label bot.

### Fixed

* Setting **PrefixOfNewMinifiedFiles** option 'minified-' to -minified'.

### Changed

* Renamed some variables of the setting **PrefixOfNewMinifiedFiles**.

### Removed

* Upcoming features.

## [**2.4.0**] - 2020-08-05

### Added

* Terser now removes by default the console logs statements.
* Setting **removeJavascriptConsolelogs** to choose if removing console.logs or not.

### Removed

* All contributors badge and table.

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
