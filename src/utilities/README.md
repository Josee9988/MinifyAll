# **utilities**

A Folder that contains some modules that are used by multiple languages, and it is better to have that functions in a module than in every module that needs it, so it improves readability by a lot.

---

## **commentRemover**

**[commentRemover.js](commentRemover.js)** module that removes every single line comments '//' and every multiline comments '/**/'

## **hexMinifier**

**[hexMinifier](hexMinifier.js)** module that minifies the hexadecimal values. Turn 6 digits hexadecimal values into 3 digits. RGBA values to hexadecimal and RGB values into 3 digits hexadecimal.

This class is **not enabled by default** (check settings).

## **globalMinifiers.js**

**[globalMinifiers](globalMinifiers.js)** module contains that contains all the main methods which contain the main calls to functions to minify each language. Example: We will always call minifyCssScssLessSass() to minify Css, Scss, Less or Sass when we want to minify these extensions, even thought we are using different commands; It also contains neccessary methods for minifying hexadecimal values or removing comments. With this file we gain readability in the main.js file.
