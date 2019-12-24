"use strict";
/* eslint-disable new-cap */
/**
 * @file Main file of the extension.
 *
 * Summary this file is called when the user executes any of the
 * 3 commands available on the extension (MinifyAll, MinifyAll2OtherDoc or
 * MinifyAll2OtherDocSelected).
 *
 * Description file that is called when any of the commands
 * available on the extension are executed (MinifyAll, MinifyAll2OtherDoc or
 * MinifyAll2OtherDocSelected),
 *
 * If the user executes 'MinifyAll' it checks what language are you using in
 * your document and if it is supported it will remove all your code and
 * replace it with a minified version of the code,
 *
 * Or if the user executes 'MinifyAll2OtherDoc' it will create a new file
 * with the minified code so you can preserve the original file,
 *
 * Or if the user executes 'MinifyAll2OtherDocSelected' which is the
 * command when you right-click at a file on the menu, it will do
 * the same job as 'MinifyAll2OtherDoc' (create a new file with the
 * minified code so you can preserve the original file)
 *
 * Or MinifyAllSelectedText which is the command to only minify
 * the selected text.
 *
 * It also creates the status bar and calls all the necessary methods
 * to make the extension and all three commands perform well.
 *
 * @author Jose Gracia Berenguer
 * @since 0.1.0
 * @see README.md
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { commands, window, } = require('vscode');
const FileSaver = require('fs');
const vscode = require('vscode');
const { replaceActualCode, replaceSelectedCode, minifiedTextToNewFile, } = require('./controller/writeMinifiedCode');
const { checkLanguageStyles, checkLanguageJson, checkLanguageHtmlPhp, checkLanguageJS, } = require('./controller/checkLanguage');
const { getNewFilePath, } = require('./controller/getNewFilePath');
const { transformSize, } = require('./controller/transformSize');
const commentRemover = require('./controller/commentRemover');
const globalMinify = require('./controller/globalMinifiers');
const getUserSettings = require('./controller/getConfiguration');
let originalSize;
let statusBar;
let statusReady;
const settings = getUserSettings.getUserSettings();
// If the user has selected to minify its code when saving.
if (settings.minifyOnSave) {
    vscode.workspace.onDidSaveTextDocument(() => commands.executeCommand('extension.MinifyAll'));
}
if (settings.minifyOnSaveToNewFile) {
    vscode.workspace.onDidSaveTextDocument(() => commands.executeCommand('extension.MinifyAll2OtherDoc'));
}
// If the user has hexadecimal shortener enabled it will import it.
const HexMinifier = !settings.hexDisabled ? require('./controller/hexMinifier') : null;
// If the user has the statusBar output enabled it will register the command.
if (!settings.statusDisabled) {
    vscode.commands.registerCommand('extension.MinifyAllStatus', statusBarInfo);
}
const globalMinifiers = new globalMinify(HexMinifier, commentRemover);
/**
 * Summary main method that is executed when the user calls
 * the commands 'MinifyAll', 'MinifyAll2OtherDoc'
 * or 'MinifyAll2OtherDocSelected', 'MinifyAllSelectedText'.
 *
 * Description activate the Main function called when the user
 * uses the command 'MinifyAll' or 'MinifyAll2OtherDoc',
 * or right-clicks on a file at the menu and calls 'MinifyAll2OtherDocSelected'
 * or right-clicks in the code and calls 'MinifyAll' or 'MinifyAll2OtherDoc'
 * it may be called from both commands and every command has a switch
 * with the languages available and its methods to minify the code
 * then if the command is 'MinifyAll' it will replace the actual code
 * with the new one, or if the command is 'MinifyAll2OtherDoc' it will create
 * a new file with the minified text, 'MinifyAll2OtherDocSelected' makes
 * the same process as 'MinifyAll2OtherDoc' but this command is called
 * from the menu. Also it is called when executing MinifyAllSelectedText.
 *
 * @access public
 *
 * @param {object} context information about VSCode. Ignore.
 */
function activate(context) {
    // Command MinifyAll. It executes if its called the command "extension.MinifyAll"
    const MinifyAll = commands.registerCommand('extension.MinifyAll', () => {
        vscode.workspace.onDidSaveTextDocument(() => getNewSize());
        const originalFilepath = vscode.window.activeTextEditor.document.fileName;
        originalSize = FileSaver.statSync(originalFilepath).size;
        statusReady = true;
        const { document, } = window.activeTextEditor;
        switch (window.activeTextEditor.document.languageId) {
            case 'css':
            case 'scss':
            case 'less':
            case 'sass':
                if (checkLanguageStyles(window.activeTextEditor.document.languageId, settings)) {
                    const modifiedCssText = globalMinifiers.minifyCssScssLessSass(document.getText().split('\n'));
                    replaceActualCode(modifiedCssText);
                }
                else {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            case 'json':
            case 'jsonc':
                if (checkLanguageJson(window.activeTextEditor.document.languageId, settings)) {
                    const modifiedJsonText = globalMinifiers.minifyJsonJsonc(document.getText().split('\n'));
                    replaceActualCode(modifiedJsonText);
                }
                else {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            case 'html':
            case 'php':
                if (checkLanguageHtmlPhp(window.activeTextEditor.document.languageId, settings)) {
                    const modifiedHtmlText = globalMinifiers.minifyHtml(document.getText().split('\n'));
                    replaceActualCode(modifiedHtmlText);
                }
                else {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            case 'javascript':
            case 'javascriptreact':
            case 'typescript':
                if (checkLanguageJS(window.activeTextEditor.document.languageId, settings)) {
                    const Terser = require('terser');
                    const jsContent = document.getText();
                    const minifierJs = Terser.minify(jsContent);
                    if (minifierJs.error === undefined) {
                        replaceActualCode(minifierJs.code);
                    }
                    else if (!settings.disableMessages) {
                        showMessage(`Terser error: ${minifierJs.error}`, false);
                    }
                }
                else if (!settings.disableMessages) {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            default:
                showMessage('⛔ We can not format this file type yet, use a valid one.', true);
                break;
        }
        context.subscriptions.push(MinifyAll);
    });
    //* ***************************************************************************************
    // Command MinifyAll2OtherDoc and writes the result in other file.
    // It executes if its called the command "extension.MinifyAll2OtherDoc"
    const MinifyAll2OtherDoc = commands.registerCommand('extension.MinifyAll2OtherDoc', () => {
        const path = require('path');
        const { document, } = window.activeTextEditor;
        const { fileName, } = document;
        switch (window.activeTextEditor.document.languageId) {
            case 'css':
            case 'scss':
            case 'less':
            case 'sass':
                if (checkLanguageStyles(window.activeTextEditor.document.languageId, settings)) {
                    const path2NewFile = getNewFilePath(path, fileName, window.activeTextEditor.document.languageId, settings.prefix);
                    const modifiedCssText = globalMinifiers.minifyCssScssLessSass(document.getText().split('\n'));
                    minifiedTextToNewFile(path2NewFile, modifiedCssText, settings);
                }
                else {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            case 'json':
            case 'jsonc':
                if (checkLanguageJson(window.activeTextEditor.document.languageId, settings)) {
                    const path2NewFile = getNewFilePath(path, fileName, 'json', settings.prefix);
                    const modifiedJsonText = globalMinifiers.minifyJsonJsonc(document.getText().split('\n'));
                    minifiedTextToNewFile(path2NewFile, modifiedJsonText, settings);
                }
                else {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            case 'html':
            case 'php':
                if (checkLanguageHtmlPhp(window.activeTextEditor.document.languageId, settings)) {
                    const path2NewFile = getNewFilePath(path, fileName, window.activeTextEditor.document.languageId, settings.prefix);
                    const modifiedHtmlText = globalMinifiers.minifyHtml(document.getText().split('\n'));
                    minifiedTextToNewFile(path2NewFile, modifiedHtmlText, settings);
                }
                else {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            case 'javascript':
            case 'javascriptreact':
            case 'typescript':
                if (checkLanguageJS(window.activeTextEditor.document.languageId, settings)) {
                    const path2NewFile = getNewFilePath(path, fileName, 'js', settings.prefix);
                    const Terser = require('terser');
                    const jsContent = document.getText();
                    const minifierJs = Terser.minify(jsContent);
                    if (minifierJs.error === undefined) {
                        minifiedTextToNewFile(path2NewFile, minifierJs.code, settings);
                    }
                    else if (!settings.disableMessages) {
                        showMessage(`Terser error: ${minifierJs.error}`, false);
                    }
                }
                else {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            default:
                showMessage('⛔ We can not format this file type yet, use a valid one.', true);
                break;
        }
        context.subscriptions.push(MinifyAll2OtherDoc);
    });
    //* ******************************************************************************************
    // Command MinifyAll2OtherDocSelected and writes the result in other file.
    // It executes if its called the command "extension.MinifyAll2OtherDocSelected"
    const MinifyAll2OtherDocSelected = commands.registerCommand('extension.MinifyAll2OtherDocSelected', (fileUri) => __awaiter(this, void 0, void 0, function* () {
        if (fileUri !== undefined) {
            // We get the text from the selected file.
            FileSaver.readFile(fileUri.path, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                else {
                    const path = require('path');
                    const filePath = path.dirname(fileUri.path);
                    switch (fileUri.path.split('.').pop()) {
                        case 'css':
                        case 'scss':
                        case 'less':
                        case 'sass':
                            if (checkLanguageStyles(fileUri.path.split('.').pop(), settings)) {
                                const newName = path.basename(fileUri.path).replace('.css', `${settings.prefix}.css`);
                                const path2NewFile = path.join(filePath, newName);
                                const modifiedCssText = globalMinifiers.minifyCssScssLessSass(data.split('\n'));
                                minifiedTextToNewFile(path2NewFile, modifiedCssText, settings);
                            }
                            else {
                                showMessage('We will not format this file type because it is disabled.', false);
                            }
                            break;
                        case 'json':
                        case 'jsonc':
                            if (checkLanguageJson(fileUri.path.split('.').pop(), settings)) {
                                const newNameJson = path.basename(fileUri.path).replace('.json', `${settings.prefix}.json`);
                                const path2NewFileJson = path.join(filePath, newNameJson);
                                const modifiedJsonText = globalMinifiers.minifyJsonJsonc(data.split('\n'));
                                minifiedTextToNewFile(path2NewFileJson, modifiedJsonText, settings);
                            }
                            else {
                                showMessage('We will not format this file type because it is disabled.', false);
                            }
                            break;
                        case 'html':
                        case 'php':
                            if (checkLanguageHtmlPhp(fileUri.path.split('.').pop(), settings)) {
                                const newNameHtml = path.basename(fileUri.path).replace('.html', `${settings.prefix}.html`);
                                const path2NewFileHtml = path.join(filePath, newNameHtml);
                                const modifiedHtmlText = globalMinifiers.minifyHtml(data.split('\n'));
                                minifiedTextToNewFile(path2NewFileHtml, modifiedHtmlText, settings);
                            }
                            else {
                                showMessage('We will not format this file type because it is disabled.', false);
                            }
                            break;
                        case 'javascript':
                        case 'javascriptreact':
                        case 'typescript':
                            if ((fileUri.path.split('.').pop() === 'javascript' && !settings.disableJavascript) ||
                                (fileUri.path.split('.').pop() === 'javascriptreact' && !settings.disableJavascriptReact) ||
                                (fileUri.path.split('.').pop() === 'typescript' && !settings.disableTypescript)) {
                                const Terser = require('terser');
                                const newNameJs = path.basename(fileUri.path).replace('.js', `${settings.prefix}.js`);
                                const path2NewFileJs = path.join(filePath, newNameJs);
                                const jsContent = data;
                                const minifierJs = Terser.minify(jsContent);
                                if (minifierJs.error === undefined) {
                                    minifiedTextToNewFile(path2NewFileJs, minifierJs.code, settings);
                                }
                                else if (!settings.disableMessages) {
                                    showMessage(`Terser error: ${minifierJs.error}`, false);
                                }
                            }
                            else {
                                showMessage('We will not format this file type because it is disabled.', false);
                            }
                            break;
                        default:
                            showMessage('⛔ We can not format this file type yet, use a valid one.', true);
                            break;
                    }
                }
            });
        }
        else {
            showMessage("This command must be called from the menu, use instead 'Minify this document ⚡' or 'Minify this document and preserve the original ⛏' but don't call this command through the command palette", true);
        }
        context.subscriptions.push(MinifyAll2OtherDocSelected);
    }));
    // Command MinifyAll. It executes if its called the command "extension.MinifyAll"
    const MinifyAllSelectedText = commands.registerCommand('extension.MinifyAllSelectedText', () => {
        const editor = vscode.window.activeTextEditor;
        const { selection, } = editor;
        const selectedText = editor.document.getText(selection);
        statusReady = true;
        switch (window.activeTextEditor.document.languageId) {
            case 'css':
            case 'scss':
            case 'less':
            case 'sass':
                if (checkLanguageStyles(window.activeTextEditor.document.languageId, settings)) {
                    const modifiedCssText = globalMinifiers.minifyCssScssLessSass(selectedText.split('\n'));
                    replaceSelectedCode(editor, selection, modifiedCssText);
                }
                else {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            case 'json':
            case 'jsonc':
                if (checkLanguageJson(window.activeTextEditor.document.languageId, settings)) {
                    const modifiedJsonText = globalMinifiers.minifyJsonJsonc(selectedText.split('\n'));
                    replaceSelectedCode(editor, selection, modifiedJsonText);
                }
                else {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            case 'html':
            case 'php':
                if (checkLanguageHtmlPhp(window.activeTextEditor.document.languageId, settings)) {
                    const modifiedHtmlText = globalMinifiers.minifyHtml(selectedText.split('\n'));
                    replaceSelectedCode(editor, selection, modifiedHtmlText);
                }
                else {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            case 'javascript':
            case 'javascriptreact':
            case 'typescript':
                if (checkLanguageJS(window.activeTextEditor.document.languageId, settings)) {
                    const Terser = require('terser');
                    const jsContent = selectedText;
                    const minifierJs = Terser.minify(jsContent);
                    if (minifierJs.error === undefined) {
                        replaceSelectedCode(editor, selection, minifierJs.code);
                    }
                    else if (!settings.disableMessages) {
                        showMessage(`Terser error: ${minifierJs.error}`, false);
                    }
                }
                else if (!settings.disableMessages) {
                    showMessage('We will not format this file type because it is disabled.', false);
                }
                break;
            default:
                showMessage('⛔ We can not format this file type yet, use a valid one.', true);
                break;
        }
        context.subscriptions.push(MinifyAllSelectedText);
    });
}
/**
 * Summary it gets the size of the actual document and creates triggers to hide
 * the status bar.
 *
 * Description gets the new size of the actual document and creates the
 * triggers then calls the method to create it createStatusBar().
 *
 * @access private
 */
function getNewSize() {
    if (statusReady) {
        const newFilepath = vscode.window.activeTextEditor.document.fileName;
        const newSize = FileSaver.statSync(newFilepath).size;
        if (!settings.statusDisabled) {
            createStatusBar(originalSize, newSize);
            vscode.workspace.onDidChangeConfiguration(() => statusBar.hide());
            vscode.workspace.onDidChangeWorkspaceFolders(() => statusBar.hide());
            vscode.workspace.onDidCloseTextDocument(() => statusBar.hide());
        }
    }
}
/**
 * Summary creates the status bar item.
 *
 * Description first of all it checks at the user settings
 * and creates the status bar item with the alignment chosen
 * then it receives the original size of the document in Bytes
 * and the new size in Bytes and it creates a status bar with
 * both values and an arrow so you can see the old and new size.
 *
 * @access private
 *
 * @param {number} originalSizeB the non minified size in Bytes.
 * @param {number} newSize the minified size in Bytes.
 */
function createStatusBar(originalSizeB, newSize) {
    if (settings.alignment === 'Right') {
        statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, settings.priority);
    }
    else {
        statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, settings.priority);
    }
    statusBar.tooltip = 'New file size, click for more info!';
    statusBar.command = 'extension.MinifyAllStatus';
    statusBar.text = `${transformSize(originalSizeB)} --> ${transformSize(newSize)}`;
    statusBar.show();
    vscode.workspace.onDidChangeConfiguration(() => statusBar.hide());
    vscode.workspace.onDidChangeWorkspaceFolders(() => statusBar.hide());
    vscode.workspace.onDidCloseTextDocument(() => statusBar.hide());
    statusReady = false;
}
/**
 * Summary creates an output channel with information about the minify.
 *
 * Description Creates an output channel with information about the file
 * that has been minified original size, new minified size filetype and path.
 *
 * @access private
 */
function statusBarInfo() {
    const oc = window.createOutputChannel('Minify output');
    oc.appendLine('╔══════════════════════════════╗');
    oc.appendLine('║      Extension MinifyAll     ║	');
    oc.appendLine('╠═══════════════════╦══════════╣');
    oc.appendLine(`║ Original size     ║ ${transformSize(originalSize)} ║`);
    oc.appendLine('╠═══════════════════╬══════════║');
    oc.appendLine(`║ New minified size ║ ${transformSize(FileSaver.statSync(vscode.window.activeTextEditor.document.fileName).size)} ║`);
    oc.appendLine('╚═══════════════════╩══════════╝');
    oc.appendLine(`File path:  \t\t${window.activeTextEditor.document.fileName}`);
    oc.appendLine(`File type:  \t\t${window.activeTextEditor.document.languageId}`);
    oc.appendLine(`% of shrink:\t\t${(100 - ((FileSaver.statSync(vscode.window.activeTextEditor.document.fileName).size * 100) / originalSize)).toFixed(3)}%`);
    oc.appendLine(`Bytes freed:\t\t${originalSize - (FileSaver.statSync(vscode.window.activeTextEditor.document.fileName).size)}B`);
    oc.show();
}
/**
 * Summary it shows a warning or information message.
 *
 * Description showMessage shows a message to the user, it might be a warning
 * or an informational one, the method receives a text with the message
 * and a boolean for saying if it is a warning (true)
 * or an informational(false).
 *
 * @access private
 *
 * @param {String} text The text to be displayed in the message
 * @param {boolean} warning If it is a warning or an informational message
 */
function showMessage(text, warning) {
    if (warning) {
        if (!settings.disableMessages) {
            window.showWarningMessage(text);
        }
    }
    else if (!settings.disableMessages) {
        window.showInformationMessage(text);
    }
}
/**
 * Summary a function that is called by vscode to deactivate the extension.
 *
 * Description function that is called when the extension is deactivated
 * or disabled, and it disposes all it can to stop using resources.
 *
 * @access public
 */
function deactivate() {
    statusBar.dispose();
}
exports.activate = activate;
exports.deactivate = deactivate;
// Exports for tests.
exports.getNewFilePath = getNewFilePath;
exports.transformSize = transformSize;
exports.showMessage = showMessage;
//# sourceMappingURL=main.js.map