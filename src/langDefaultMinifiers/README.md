# **langDefaultMinifiers**

A Folder that contains every necessary module for each specific language and performs unique tasks per language so the code can be successfully minified.

All modules contain a constructor that receives the code and a getter of the code in which the module will make all the tasks and transform the array of lines into a String.

---

## **cssMinifier.**

**[cssMinifier.js](cssMinifier.js)** module that perform unique tasks per minifying **CSS**, **SCSS**, **SASS** or **LESS** code.

## **htmlMinifier.js**

**[htmlMinifier.js](htmlMinifier.js)** module that perform unique tasks per minifying HTML code.

## **jsonMinifier.**

**[jsonMinifier.js](jsonMinifier.js)** module that perform unique tasks per minifying **JSON** or **JSONC** code.
