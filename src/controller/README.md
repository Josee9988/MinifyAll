# **controller**

A Folder that contains some modules that are used by multiple languages, and it is better to have that functions in a module than in every module that needs it, so it improves readability by a lot.

---

## **commentRemover**

**[commentRemover.js](commentRemover.js)** module that removes every single line comments '//' and every multiline comments '/**/'

## **hexMinifier**

**[hexMinifier](hexMinifier.js)** module that minifies the hexadecimal values. Turn 6 digits hexadecimal values into 3 digits. RGBA values to hexadecimal and RGB values into 3 digits hexadecimal.

This class is **not enabled by default** (check settings).

## **globalMinifiers.js**

**[globalMinifiers](globalMinifiers.js)** module contains that contains all the main methods which contain the main calls to functions to minify each language. Example: We will always call minifyCssScssLessSass() to minify Css, Scss, Less or Sass when we want to minify these extensions, even thought we are using different commands; It also contains neccessary methods for minifying hexadecimal values or removing comments. With this file we gain readability in the main.js file.

## **checkLanguage.js**

**[checkLanguage](checkLanguage.js)** contains all the functions needed to check if the language given is not disabled, and it will be executed. That saves us many lines of repeated code in the main.js file.

## **getConfiguration.js**

**[getConfiguration](getConfiguration.js)** gathers all the configuration given by the user and returns it into an object.

## **getNewFilePath.js**

**[getNewFilePath](getNewFilePath.js)** contains the function getNewFilePath.

## **transformSize.js**

**[transformSize](transformSize.js)** contains the function transformSize.

## **writeMinifiedCode.js**

**[writeMinifiedCode](writeMinifiedCode.js)** contains the functions that will replace the actual code with the minified one, replace the selected code with the minified one and a function to write the minified text to a new file.
