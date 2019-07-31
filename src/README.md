# **src**

Folder that contains all the source code which make the extension work properly

Here you can find some folders with modules and a **[main.js](main.js)** class.

---

## **main.js**

**[main.js](main.js)** is the main file of the extension which is called when the user executes the minifying commands..

It is the main controller file that perform all the calls to the necessary modules and methods to make the extension work.

## **utilities**

**[utilities](/utilities/)** folder that contains every code that more than one language of minifying uses. For example removing comments or minifying hexadecimal values (both modules are used by multiple modules and commands.)

Check: **[utilities readme](/utilities/README.md)**

## **langDefaultMinifiers**

**[langDefaultMinifiers](/langDefaultMinifiers/)** folder that contains a personal minifier per each language. Every module does all the last job of removing specific spaces and more things for each language. Then returns the code as a String.

Check: **[langDefaultMinifiers readme](/langDefaultMinifiers/README.md)**
