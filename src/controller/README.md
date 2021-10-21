# **controller**

A Folder that contains some modules that are used by multiple languages, and it is better to have that functions in a module than in every module that needs it, so it improves readability by a lot.

---

## **commentRemover**

**[commentRemover.js](commentRemover.js)** module that removes every single line comments '//' and every multiline comments '/**/'

## **checkLanguage.js**

**[checkLanguage](checkLanguage.js)** contains all the functions needed to check if the language given is not disabled, and it will be executed. That saves us many lines of repeated code in the main.js file.

## **getConfiguration.js**

**[getConfiguration](getConfiguration.js)** gathers all the configuration given by the user and returns it into an object.

## **getNewFilePath.js**

**[getNewFilePath](getNewFilePath.js)** contains the function getNewFilePath.

## **showMessage.js**

**[showMessage](showMessage.js)** contains the functions to show messages from VS Code.

## **writeMinifiedCode.js**

**[writeMinifiedCode](writeMinifiedCode.js)** contains the functions that will replace the actual code with the minified one, replace the selected code with the minified one and a function to write the minified text to a new file.
