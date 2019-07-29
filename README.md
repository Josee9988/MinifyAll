# **MinifyAll an extension for VSCode**

VSCode **minifier** for **JavaScript**, **JSON**, **CSS**, **HTML**, **LESS**, **SASS**, **SCSS**, and **JSONC**. you will love its simplicity!

You can minify the file and replace all the content with the new minified text, **or** you can preserve the original document and get the minified text in other document!

Go to the extension *settings* and make it as you want, enable or disable: **minify on save**, **languages**, **hexadecimal shortener**, **messages**, and much more.

For more information check our: **[GitHub repository](https://github.com/Josee9988/MinifyAll)** and **[VisualStudio Marketplace](https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall)**.

Do you want to help us improve the extension or did you found a bug?
**[Let us know](https://github.com/Josee9988/MinifyAll/issues)** or contact **[me](jgracia9988@gmail.com)**.

Check our **[changelog](CHANGELOG.md)**.

---

[![Version](https://vsmarketplacebadge.apphb.com/version-short/josee9988.minifyall.svg?style=for-the-badge&logo)](https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads/josee9988.minifyall.svg?style=for-the-badge&logo)](https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-star/josee9988.minifyall.svg?style=for-the-badge&logo)](https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/y/Josee9988/minifyall.svg?style=popout-square)](#minifyall-for-vscode)

---

## **Installation** 🔩⚙

- Open the command Palette of VSCode with *Ctrl+P* or *⌘P*
- And type:➡️
**```ext install josee9988.minifyall```**

### **Commands** 📐🛡

- **```Minify this document ⚡``` Or ```CTRL+ALT+M```**
- **```Minify this document and preserve the original ⛏```  Or ```CTRL+ALT+N```**

---

## **How does it looks with real code?** 📸 😁

- The two commands available. First directly minifies the actual document and replaces the original code with the modified one, the second keeps the original document and creates a file with the modified text:

<img src="https://i.imgur.com/mBABVUM.png" alt="command" title="command" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 500px; max-width:500px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:50%;"/>

- The output that you will find after you save your document:

<img src="https://i.imgur.com/oYztqCE.png" alt="output" title="output" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 500px; max-width:500px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:50%;"/>

- The first and default command that replaces the actual code with the minified one:

<img src="https://i.imgur.com/bbAhxJj.gif" alt="Preview" title="preview" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 750px; max-width:750px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:75%;"/>

- The second command that saves the minified text to other file and preserves the original text:

<img src="https://i.imgur.com/RTyX0PZ.gif" alt="Preview2nd" title="preview2nd" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 750px; max-width:750px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:75%;"/>

- Also minify when right clicking on the code!

<img src="https://i.imgur.com/fXMQTc0.png" alt="rightclick" title="rightclick" style="border-radius:15px; box-shadow: 6px 6px  #282829; max-height: 750px; max-width:750px;margin-left: auto; margin-right:auto;display: block;margin-left: auto;margin-right:auto;width:75%;"/>

---

## **Languages available** 🧪🔥

- **CSS**
- **HTML**
- **JSON**
- **JavaScript**
- **JSONC**
- **LESS**
- **SASS**
- **SCSS**

---

## **Configuration settings** ⚙️⛓

<!-- markdownlint-disable no-inline-html-->

<details>
<summary>Click to see more info about the configuration settings</summary>

- If you want MinifyAll to **stop shortening colors**, such as rgb to 3 digit hex, or rgba to hex, or 6 digit hex to 3 digit hex. If you enable it you might see some loss in color accuracy

``` json
"MinifyAll.disableHexadecimalShortener": true|false //default 'true' (by default is disabled)
```

- If you want MinifyAll to stop showing a **status bar** with information about the minimization after you minify a file. (True for disabling.)

``` json
"MinifyAll.disableStatusbarInformation": true|false //default 'false' (by default is enabled)
```

- Priority of the status bar. 0 Is the greatest.

``` json
"MinifyAll.statusbarPriority": integer //A number: default '0'
```

- Aligns the status bar indicator to the left or right.

``` json
"MinifyAll.statusbarAlignment": Left|Right //default 'left'
```

- Disables warning and information messages

``` json
"MinifyAll.disableMessages": true|false //default 'false' (by default is enabled)
```

- Minify on save (Default command, which will minify your actual code)

``` json
"MinifyAll.minifyOnSave": true|false //default 'false' (by default is enabled)
```

- Minify on save (Second command, which will minify your actual code into a new file)

``` json
"MinifyAll.minifyOnSaveToNewFIle": true|false //default 'false' (by default is enabled)
```

### **Disabling languages configuration**

- Disables **html** minimization

``` json
"MinifyAll.disableHtml": true|false //default 'false' (by default is enabled)
```

- Disables **css** minimization

``` json
"MinifyAll.disableCss": true|false //default 'false' (by default is enabled)
```

- Disables **scss** minimization

``` json
"MinifyAll.disableScss": true|false //default 'false' (by default is enabled)
```

- Disables **less** minimization

``` json
"MinifyAll.disableLess": true|false //default 'false' (by default is enabled)
```

- Disables **sass** minimization

``` json
"MinifyAll.disableSass": true|false //default 'false' (by default is enabled)
```

- Disables **json** minimization

``` json
"MinifyAll.disableJson": true|false //default 'false' (by default is enabled)
```

- Disables **jsonc** minimization

``` json
"MinifyAll.disableJsonc": true|false //default 'false' (by default is enabled)
```

- Disables **JavaScript** minimization //default 'false' (by default is enabled)

``` json
"MinifyAll.disableJavascript": true|false //default 'false' (by default is enabled)
```

</details>

---

## **Examples**

### **Css less sass scss**

<details>
<summary>Click to see an example of how the extension minifies CSS</summary>

*From:*

```css
.myClass {
    background-color: rgba(12, 12, 12, 0.8);
    background-color: rgb(12, 12, 12);
    /* my comment
    */
    background-color: #FAFAFA; //other comment
    content: url("http://placehold.it/350x150");
}
```

*To:*

```css
.myClass{background-color: rgba(12, 12, 12, 0.8);background-color: rgb(12, 12, 12);background-color:#FAFAFA;content: url("http://placehold.it/350x150")}
```

- rgba is formatted to hexadecimal.
- rgb is formatted to 3 digit value hexadecimal.
- 6 digit hexadecimals are formatted to 3 digit value hexadecimal
- There are no spaces
- There is only one line
- Single line comments removed
- Multiline comments removed
- Url '//' is not detected as a comment and can be perfectly placed.

---

</details>

### **Json jsonc**

<details>
<summary>Click to see an example of how the extension minifies JSON</summary>

*From:*

``` json
{
"contributes": {
"commands": [{
"title": "Minify this document ⚡",
},
{
"color": "#FAFAFA", // comments
}/* multiline comment
*/
]
}
}
```

*To:*

``` json
{"contributes":{"commands":[{"title":"Minify this document ⚡"},{"color":"#FFF",}]}}
```

- Only one line
- No unnecessary spaces
- 6 Digit hex to 3 digit hex
- No single line comments
- No multiline comments
- Removed trailing comma before '}'

---

</details>

### **JavaScript**

<details>
<summary>Click to see an example of how the extension minifies JavaScript</summary>

*From:*

```javascript
"use strict";
const {
    commands,
    window
} = require('vscode');
const FileSaver = require('fs')
const StringWithComments = "// not a comment" //this is my comment
if ((window.activeTextEditor.document.languageId == "css" && disableCss == false) || //myComment
    (window.activeTextEditor.document.languageId == "scss" && disableScss == false)) {
    const {
        document
    } = window.activeTextEditor;
    switch (window.activeTextEditor.document.languageId) {
        case "css":
            /*
            multi line comments
            */
            console.log("Love this minifier !!!")
            break;
        default:
            break;
    }
}
/* foo asd
foo
*/
```

*To:*

```javascript
"use strict";const{commands,window}=require('vscode');const FileSaver=require('fs')
const StringWithComments="// not a comment"
if((window.activeTextEditor.document.languageId=="css"&&disableCss==false)||(window.activeTextEditor.document.languageId=="scss"&&disableScss==false)){const{document}=window.activeTextEditor;switch(window.activeTextEditor.document.languageId){case"css":console.log("Love this minifier !!!")
break;default:break;}}
```

- Only changes line if at the end of a declaration or an import, that line does not end in ';' (So adding more ';' at the end of every line will help you minimize more your code)
- All irrelevant spaces removed
- Spaces left are only whithin quotes (Strings) and variable declarations.
- If 'OR' and 'AND' are without spaces, same as if condition or switch cases.
- All comments removed
- Single line comments inside of a string don't removed.

---

</details>

### **Html**

<details>
<summary>Click to see an example of how the extension minifies HTML</summary>

*From:*

```html
<!DOCTYPE html>
<html lang='es'>

<head>
    <title></title>
    <meta charset='utf-8'>
    <link rel='stylesheet' href=''>
    <script type='text/javascript' src=''></script>
    <!-- test -->
</head>

<!-- ~~~~~✦✦✦✦✦ B O
 D Y ✦✦✦✦✦~~~~~ -->
<body>

</body>

</html>
```

*To:*

```html
<!DOCTYPE html><html lang='es'><head><title></title><meta charset='utf-8'><link rel='stylesheet' href=''><script type='text/javascript' src=''></script></head><body></body></html>
```

- Only one line
- Only necessary spaces
- No tabs
- No single line comments
- No multiline comments

---

</details>

---

## **Known bugs:** 🛑🗑

- Css classes or ids don't support *px* or *keyframe* as a **name**.

**Don't** do this

``` css
.myPxClass{
    margin-left:0px;
}
#myPxId{
    margin-left:0px;
}
```

- If the file you are trying to minify is **not saved** or is an Untitled default vscode file might cause errors.
- Multiline comments inside of a String will be removed. Single line comments inside of a string *are allowed* but *multiline* are **not**.

---

## **Upcoming features?** ✅💡

- [ ] Right click in a file of the menu will minify to other document.
- [ ] Right click in a folder will minify all supported files.
- [ ] Path of the minify to other document (new file with minified text) customizable

## **Built with** 🛠️🔧

- [Virtual Studio Code](https://code.visualstudio.com/)
- [Yo code](https://code.visualstudio.com/api/get-started/your-first-extension)
- [vsce](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

---

### Did you enjoyed the minifier? Help us raise these numbers up 🥰 🎉

[![Donate](https://img.shields.io/badge/Donate-Patreon-green.svg)](https://www.patreon.com/bePatron?u=22162331)
[![Github followers](https://img.shields.io/github/followers/Josee9988.svg?style=social)](#languages-primarily-tested)
[![Github stars](https://img.shields.io/github/stars/Josee9988/MinifyAll.svg?style=social)](#languages-primarily-tested)
[![Github watchers](https://img.shields.io/github/watchers/Josee9988/MinifyAll.svg?style=social)](#languages-primarily-tested)
[![Github forks](https://img.shields.io/github/forks/Josee9988/MinifyAll.svg?style=social)](#languages-primarily-tested)

[Check my VSCode theme](https://marketplace.visualstudio.com/items?itemName=josee9988.black-garnet-theme) 🧲

---

*Made with a lot of ❤️❤️ by **[@Josee9988](https://github.com/Josee9988)***
