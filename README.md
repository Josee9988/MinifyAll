<!-- markdownlint-disable MD033-->
# **MinifyAll an extension for VSCode**

Simple VSCode **minifier** and **compressor** for most common filetypes ([See full list below](#languages-available-)). You will love its simplicity!

You can minify the file and replace all the content with the new minified text, **or** you can preserve the original document and get the minified text in another document! Also, you can simply minify your **selected text**, you can preserve your license comments with the tags *@preserve* and *@endpreserve*.

MinifyAll is also able to **compress** files and folders simply by right-clicking them on the menu.

Go to the extension *settings* and make it as you want, enable or disable: **minify on save**, **languages**, **hexadecimal shortener**, **messages**, and much more.

For more information check our: **[GitHub repository](https://github.com/Josee9988/MinifyAll)**, **[VisualStudio Marketplace](https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall)** or **[OpenVSX registry](https://open-vsx.org/extension/Josee9988/minifyall)**.

Also check the brand new **[MinifyAll online webpage](https://minifyall.jgracia.es/)** 😎 or the **[MinifyAll cli/package](https://github.com/Josee9988/MinifyAllCli)**.

Do you want to help us improve the extension or did you found a bug?
**[Let us know](https://github.com/Josee9988/MinifyAll/issues)**.

Check our **[changelog](CHANGELOG.md)**.

Currently looking for active contributors to maintain and keep the project alive.

> We support up to **14** languages/file extensions!

---

[![Version](https://vsmarketplacebadge.apphb.com/version-short/josee9988.minifyall.svg?style=for-the-badge&logo)](https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads/josee9988.minifyall.svg?style=for-the-badge&logo)](https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-star/josee9988.minifyall.svg?style=for-the-badge&logo)](https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/y/Josee9988/minifyall.svg?style=popout-square)](#minifyall-an-extension-for-vscode)
![Node.js CI](https://img.shields.io/github/workflow/status/Josee9988/MinifyAll/Node.js%20CI.svg)

---

## **Installation** 🔩⚙

- Open the **Command Palette** of VSCode with **Ctrl+P** or **⌘P**
- And type:➡️
**```ext install josee9988.minifyall```**

### **Commands** 📐🛡

- **```Minify this document ⚡``` Or ```CTRL+ALT+M```**
- **```Minify this document and preserve the original ⛏```  Or ```CTRL+ALT+N```**
- **```Minify the selected text 🎯```  Or ```CTRL+ALT+. CTRL+ALT+M```**

We recommend to use them with: "left click" on the document and then select the option you want, either the file in the menu or the opened file. ;)

---

## **How does it look with real code?** 📸 😁

- The two commands available. First directly minifies the actual document and replaces the original code with the modified one, the second keeps the original document and creates a file with the modified text:

<img src="https://github.com/Josee9988/MinifyAll/blob/master/Screenshots/command.png?raw=true" alt="command" title="command"/>

- Preserve your license comments with the tags *@preserve* (at the very top) and *@endpreserve*

<img src="https://github.com/Josee9988/MinifyAll/blob/master/Screenshots/Preserve.gif?raw=true" alt="preserve license" title="preserve license"/>

- The first and default command that replaces the actual code with the minified one:

<img src="https://github.com/Josee9988/MinifyAll/blob/master/Screenshots/Preview.gif?raw=true" alt="preview" title="preview"/>

- The second command that saves the minified text to other file and preserves the original text:

<img src="https://github.com/Josee9988/MinifyAll/blob/master/Screenshots/Preview2ndcommand.gif?raw=true" alt="preview2nd" title="preview2nd"/>

- Minify only your **selected text**!

<img src="https://github.com/Josee9988/MinifyAll/blob/master/Screenshots/SelectedText.gif?raw=true" alt="selectedText" title="selectedText"/>

- Also, minify when right-clicking on the code!

<img src="https://github.com/Josee9988/MinifyAll/blob/master/Screenshots/RightClick.png?raw=true" alt="rightclickMenu" title="rightclickMenu"/>

- Minify when right-clicking on a file of the menu without opening it!

<img src="https://github.com/Josee9988/MinifyAll/blob/master/Screenshots/RightClickMenu.gif?raw=true" alt="rightclickInAction" title="rightclickInAction"/>

- Compress when right-clicking on a file or folder of the menu.

<img src="https://github.com/Josee9988/MinifyAll/blob/master/Screenshots/compress.gif?raw=true" alt="compressfiles" title="compressfiles"/>

---

## **Languages available** 🧪🔥

- **CSS**
- **HTML**
- **XML**
- **TWIG**
- **VUE**
- **VUE-HTML**
- **HTML** in a *PHP file*
- **JSON**
- **JavaScript** With: [Terser](https://github.com/terser/terser)
- **JavaScriptReact** With: [Terser](https://github.com/terser/terser)
- **JSONC**
- **LESS**
- **SASS**
- **SCSS**

---

## **Configuration settings** ⚙️⛓

<!-- markdownlint-disable no-inline-html-->

<details>
<summary>Click to see more info about the configuration settings</summary>

(Remember to restart VSCode after modifying any configuration)

- If you want MinifyAll to **stop shortening colours**, such as RGB to 3 digit hex, or RGBA to hex, or 6 digit hex to 3 digit hex. If you enable it you might see some loss in colour accuracy

``` json
"MinifyAll.disableHexadecimalShortener": true|false //default 'true' (by default it is disabled)
```

- Disables warning and information messages

``` json
"MinifyAll.disableMessages": true|false //default 'false' (by default it is allowed)
```

- Disables context menu when right-clicking in your code.

``` json
"MinifyAll.disableCodeContextMenu": true|false //default 'false' (by default it is shown)
```

- Disables context menu when right-clicking in the file explorer.

``` json
"MinifyAll.disableFileExplorerContextMenu": true|false //default 'false' (by default it is shown)
```

- Minify on save (Default command, which will minify your actual code)

``` json
"MinifyAll.minifyOnSave": true|false //default 'false' (by default it is disabled)
```

- Minify on save (Second command, which will minify your actual code into a new file)

``` json
"MinifyAll.minifyOnSaveToNewFile": true|false //default 'false' (by default it is disabled)
```

- Prefix of the new minified file from the command that minifies to other doc.

``` json
"MinifyAll.PrefixOfNewMinifiedFiles": '-min'|'.min'|'-minified'|'.minified' //default '-min'
```

- If you want MinifyAll to open the new minified document after you minify. (False for not opening it every time you create a minified file).

``` json
"MinifyAll.openMinifiedDocument": true|false //default 'true'
```

- Terser minify options, this setting will allow you to fully customice your Terser behaviour. For more info please check [terser's minify options](https://github.com/terser/terser#minify-options).

``` json
"MinifyAll.terserMinifyOptions": { "mangle": true, "compress": { "drop_console": true, "dead_code": false, "keep_fnames": false, "keep_classnames": false } } // for more information please visit https://github.com/terser/terser#minify-options
```

### **Disabling languages configuration**

- Disables **html** minimization

``` json
"MinifyAll.disableHtml": true|false //default 'false' (by default it is enabled)
```

- Disables **twig** minimization

``` json
"MinifyAll.disableTwig": true|false //default 'false' (by default it is enabled)
```

- Disables **php** minimization

``` json
"MinifyAll.disablePhp": true|false //default 'false' (by default it is enabled)
```

- Disables **css** minimization

``` json
"MinifyAll.disableCss": true|false //default 'false' (by default it is enabled)
```

- Disables **scss** minimization

``` json
"MinifyAll.disableScss": true|false //default 'false' (by default it is enabled)
```

- Disables **less** minimization

``` json
"MinifyAll.disableLess": true|false //default 'false' (by default it is enabled)
```

- Disables **sass** minimization

``` json
"MinifyAll.disableSass": true|false //default 'false' (by default it is enabled)
```

- Disables **json** minimization

``` json
"MinifyAll.disableJson": true|false //default 'false' (by default it is enabled)
```

- Disables **jsonc** minimization

``` json
"MinifyAll.disableJsonc": true|false //default 'false' (by default it is enabled)
```

- Disables **JavaScript** minimization //default 'true' (by default it is disabled because it is not on a stable version yet)

``` json
"MinifyAll.disableJavascript": true|false //default 'false' (by default it is enabled)
```

- Disables **JavaScriptReact** minimization //default 'true' (by default it is disabled because it is not on a stable version yet)

``` json
"MinifyAll.disableJavascriptReact": true|false //default 'true' (by default it is enabled)
```

- Disables **XML** minimization //default 'false'

``` json
"MinifyAll.disableXml": true|false //default 'false'
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
    background-color: #FAFAFA;
    /*other comment*/
    content: url("https://github.com/Josee9988/MinifyAll");
    margin-right: 0px;
}/* my comment
    */
```

*To:*

```css
.myClass{background-color:#0C0C0CCC;background-color:#111;background-color:#FFF;content:url("https://github.com/Josee9988/MinifyAll");margin-right:0}
```

- RGBA is formatted to hexadecimal.
- RGB is formatted to 3 digit value hexadecimal.
- 6 digit hexadecimal values are formatted to 3 digit value hexadecimal.
- There are no spaces.
- There is only one line.
- Multiline comments removed.
- Url '//' is not detected as a comment and can be perfectly placed.
- From 0px to 0

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
{"contributes":{"commands":[{"title":"Minify this document ⚡"},{"color":"#FFF"}]}}
```

- Only one line.
- No unnecessary spaces.
- 6 Digit hex to 3 digit hex.
- No single-line comments.
- No multiline comments.
- Removed trailing comma before '}'.

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
const StringWithComments = "// not a comment /*" //this is my comment
if ((window.activeTextEditor.document.languageId == "css" && disableCss == false) || //myComment
    (window.activeTextEditor.document.languageId == "scss" && disableScss == false)) {
    const {
        document
    } = window.activeTextEditor;
    switch (window.activeTextEditor.document.languageId) {
        case "css":
            /*
            multi-line comments
            */
            console.log("Love this minifier !!!")
            break;
        default:
            break;
    }
}
```

*To:*

```javascript
"use strict";const{commands,window}=require('vscode');const FileSaver=require('fs')
const StringWithComments="// not a comment /*"
if((window.activeTextEditor.document.languageId=="css"&&disableCss==false)||(window.activeTextEditor.document.languageId=="scss"&&disableScss==false)){const{document}=window.activeTextEditor;switch(window.activeTextEditor.document.languageId){case"css":console.log("Love this minifier !!!")
break;default:break;}}let myString="hello//";myString.replace(/\/\//g,'');
```

- Only changes line if, at the end of a declaration or an import, that line does not end in ';' (So adding more ';' at the end of every line will help you minimize more your code).
- All irrelevant spaces removed.
- Spaces left are only within quotes (Strings) and variable declarations.
- If 'OR' and 'AND' are without spaces, the same as if condition or switch cases.
- All single line and multiline comments removed.
- Single line comments inside of a String will not be removed. (hello//) (// not a comment).
- Multi-line comments inside of a String will not be removed. (// not a comment **/\***).
- Regex expression with single-line comments will not be removed.
- No tabs.

---

</details>

### **Html**

<details>
<summary>Click to see an example of how the extension minifies HTML</summary>

*From:*

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <title></title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="">
    <script type="text/javascript' src=""></script>
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
<!DOCTYPE html><html lang="es"><head><title></title><meta charset="utf-8"><link rel="stylesheet"href=""><script type="text/javascript"src=""></script></head><body></body></html>
```

- Only one line.
- Only the necessary spaces.
- No tabs.
- No single-line comments.
- No multiline comments.

---

</details>

---

## **Known bugs:** 🛑🗑

- ⚠️ If the file you are trying to minify is **not saved** or is an Untitled default VSCode file *might* cause errors.
- ⚠️ If you are doing a regex without scaping the '//' it might be deleted as it must be escaped (\/\/).

---

## 🥰 Donators

Support the project and be the first donator ❤️

---

## 🎉 Did you enjoyed the minifier? Help us raise these numbers up

[![Github followers](https://img.shields.io/github/followers/Josee9988.svg?style=social)](#did-you-enjoyed-the-minifier-help-us-raise-these-numbers-up--)
[![Github stars](https://img.shields.io/github/stars/Josee9988/MinifyAll.svg?style=social)](#did-you-enjoyed-the-minifier-help-us-raise-these-numbers-up--)
[![Github watchers](https://img.shields.io/github/watchers/Josee9988/MinifyAll.svg?style=social)](#did-you-enjoyed-the-minifier-help-us-raise-these-numbers-up--)
[![Github forks](https://img.shields.io/github/forks/Josee9988/MinifyAll.svg?style=social)](#did-you-enjoyed-the-minifier-help-us-raise-these-numbers-up--)
[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=github-sponsors&color=red&style=social)](https://github.com/sponsors/Josee9988)

[Check my VSCode theme](https://marketplace.visualstudio.com/items?itemName=josee9988.black-garnet-theme) 🧲

[Check my VSCode Markdown and Changelog snippets](https://marketplace.visualstudio.com/items?itemName=josee9988.changelog-and-markdown-snippets) 🌟

[Check my MinifyAll online webpage](https://minifyall.jgracia.es/) 😎

[Check my MinifyAll cli/package](https://github.com/Josee9988/MinifyAllCli)

---

## 📚 **Posts where MinifyAll is mentioned**

- [Minify Code Automatically](https://dev.to/aryaziai/minifying-code-shortcut-4d6c)
- [How I made my website 10x faster](https://dev.to/asaoluelijah/how-i-made-my-personal-website-10x-faster-3p6k)
- [11 plugins indispensables para VSCode](https://www.gitmedio.com/11-plugins-indispensables-para-visual-studio-code-insiders/)
- [6 VSCode extensions you need to install now](https://it-it.facebook.com/AskHorizons/photos/a.128334975253236/386218132798251/?type=3&eid=ARDn_eorUZWvdCAV4C9taXZ5FFXu7Ib4e80xgui_LS-2y_m6VegoeCrc1JfFt6Bbyy7rXjEnPPSHCqTt)
- [8 VSCode common extensions (chinnese)](https://www.leunghoyin.hk/vscode-common-extensions)

---

> ⚠️Remember that this extension does not guarantee 100% effectiveness and may have some issue at some point. Use it at your own risk and always do backups of your code.⚠️

_Made with a lot of ❤️❤️ by **[@Josee9988](https://github.com/Josee9988)**_
