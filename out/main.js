"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const FileSaver = require("fs");
const vscode = require("vscode");
const writeMinifiedCode_1 = require("./controller/writeMinifiedCode");
const checkLanguage_1 = require("./controller/checkLanguage");
const getNewFilePath_1 = require("./controller/getNewFilePath");
const globalMinifiers_1 = require("./controller/globalMinifiers");
const getConfiguration_1 = require("./controller/getConfiguration");
const showMessage_1 = require("./controller/showMessage");
exports.settings = getConfiguration_1.getUserSettings();
// If the user has selected to minify its code when saving.
if (exports.settings.minifyOnSave) {
    vscode.workspace.onDidSaveTextDocument(() => vscode.commands.executeCommand('extension.MinifyAll'));
}
if (exports.settings.minifyOnSaveToNewFile) {
    vscode.workspace.onDidSaveTextDocument(() => vscode.commands.executeCommand('extension.MinifyAll2OtherDoc'));
}
// If the user has hexadecimal shortener enabled it will import it.
const minifyHex = !exports.settings.hexDisabled ? true : false;
const globalMinifiers = new globalMinifiers_1.default(minifyHex);
/**
 * Summary main method that is executed when the extension is activated,
 * the extension is activated the very first time the command is executed,
 * it contains the commandsthe commands 'MinifyAll', 'MinifyAll2OtherDoc'
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
    const MinifyAll = vscode.commands.registerCommand('extension.MinifyAll', () => {
        switch (vscode.window.activeTextEditor.document.languageId) {
            case 'css':
            case 'scss':
            case 'less':
            case 'sass':
                if (checkLanguage_1.checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const modifiedCssText = globalMinifiers.minifyCssScssLessSass(vscode.window.activeTextEditor.document.getText().split('\n'));
                    writeMinifiedCode_1.replaceActualCode(modifiedCssText);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'json':
            case 'jsonc':
                if (checkLanguage_1.checkLanguageJson(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const modifiedJsonText = globalMinifiers.minifyJsonJsonc(vscode.window.activeTextEditor.document.getText().split('\n'));
                    writeMinifiedCode_1.replaceActualCode(modifiedJsonText);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'html':
            case 'php':
                if (checkLanguage_1.checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const modifiedHtmlText = globalMinifiers.minifyHtml(vscode.window.activeTextEditor.document.getText().split('\n'));
                    writeMinifiedCode_1.replaceActualCode(modifiedHtmlText);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'javascript':
            case 'javascriptreact':
            case 'typescript':
                if (checkLanguage_1.checkLanguageJS(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const Terser = require('terser');
                    const jsContent = vscode.window.activeTextEditor.document.getText();
                    const minifierJs = Terser.minify(jsContent);
                    if (minifierJs.error === undefined) {
                        writeMinifiedCode_1.replaceActualCode(minifierJs.code);
                    }
                    else if (!exports.settings.disableMessages) {
                        showMessage_1.showMessage(`Terser error: ${minifierJs.error}`, showMessage_1.MessageTypes.Error);
                    }
                }
                else if (!exports.settings.disableMessages) {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            default:
                showMessage_1.showMessage('⛔ We can not format this file type yet, use a valid one.', showMessage_1.MessageTypes.Warning);
                break;
        }
        context.subscriptions.push(MinifyAll);
    });
    //* ***************************************************************************************
    // Command MinifyAll2OtherDoc and writes the result in other file.
    // It executes if its called the command "extension.MinifyAll2OtherDoc"
    const MinifyAll2OtherDoc = vscode.commands.registerCommand('extension.MinifyAll2OtherDoc', () => {
        const path = require('path');
        switch (vscode.window.activeTextEditor.document.languageId) {
            case 'css':
            case 'scss':
            case 'less':
            case 'sass':
                if (checkLanguage_1.checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const path2NewFile = getNewFilePath_1.default(path, vscode.window.activeTextEditor.document.fileName, vscode.window.activeTextEditor.document.languageId, exports.settings.prefix);
                    const modifiedCssText = globalMinifiers.minifyCssScssLessSass(vscode.window.activeTextEditor.document.getText().split('\n'));
                    writeMinifiedCode_1.minifiedTextToNewFile(path2NewFile, modifiedCssText, exports.settings);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'json':
            case 'jsonc':
                if (checkLanguage_1.checkLanguageJson(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const path2NewFile = getNewFilePath_1.default(path, vscode.window.activeTextEditor.document.fileName, 'json', exports.settings.prefix);
                    const modifiedJsonText = globalMinifiers.minifyJsonJsonc(vscode.window.activeTextEditor.document.getText().split('\n'));
                    writeMinifiedCode_1.minifiedTextToNewFile(path2NewFile, modifiedJsonText, exports.settings);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'html':
            case 'php':
                if (checkLanguage_1.checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const path2NewFile = getNewFilePath_1.default(path, vscode.window.activeTextEditor.document.fileName, vscode.window.activeTextEditor.document.languageId, exports.settings.prefix);
                    const modifiedHtmlText = globalMinifiers.minifyHtml(vscode.window.activeTextEditor.document.getText().split('\n'));
                    writeMinifiedCode_1.minifiedTextToNewFile(path2NewFile, modifiedHtmlText, exports.settings);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'javascript':
            case 'javascriptreact':
            case 'typescript':
                if (checkLanguage_1.checkLanguageJS(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const path2NewFile = getNewFilePath_1.default(path, vscode.window.activeTextEditor.document.fileName, 'js', exports.settings.prefix);
                    const Terser = require('terser');
                    const jsContent = vscode.window.activeTextEditor.document.getText();
                    const minifierJs = Terser.minify(jsContent);
                    if (minifierJs.error === undefined) {
                        writeMinifiedCode_1.minifiedTextToNewFile(path2NewFile, minifierJs.code, exports.settings);
                    }
                    else if (!exports.settings.disableMessages) {
                        showMessage_1.showMessage(`Terser error: ${minifierJs.error}`, showMessage_1.MessageTypes.Error);
                    }
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            default:
                showMessage_1.showMessage('⛔ We can not format this file type yet, use a valid one.', showMessage_1.MessageTypes.Warning);
                break;
        }
        context.subscriptions.push(MinifyAll2OtherDoc);
    });
    //* ******************************************************************************************
    // Command MinifyAll2OtherDocSelected and writes the result in other file.
    // It executes if its called the command "extension.MinifyAll2OtherDocSelected"
    const MinifyAll2OtherDocSelected = vscode.commands.registerCommand('extension.MinifyAll2OtherDocSelected', (fileUri) => __awaiter(this, void 0, void 0, function* () {
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
                            if (checkLanguage_1.checkLanguageStyles(fileUri.path.split('.').pop(), exports.settings)) {
                                const newName = path.basename(fileUri.path).replace('.css', `${exports.settings.prefix}.css`);
                                const path2NewFile = path.join(filePath, newName);
                                const modifiedCssText = globalMinifiers.minifyCssScssLessSass(data.split('\n'));
                                writeMinifiedCode_1.minifiedTextToNewFile(path2NewFile, modifiedCssText, exports.settings);
                            }
                            else {
                                showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                            }
                            break;
                        case 'json':
                        case 'jsonc':
                            if (checkLanguage_1.checkLanguageJson(fileUri.path.split('.').pop(), exports.settings)) {
                                const newNameJson = path.basename(fileUri.path).replace('.json', `${exports.settings.prefix}.json`);
                                const path2NewFileJson = path.join(filePath, newNameJson);
                                const modifiedJsonText = globalMinifiers.minifyJsonJsonc(data.split('\n'));
                                writeMinifiedCode_1.minifiedTextToNewFile(path2NewFileJson, modifiedJsonText, exports.settings);
                            }
                            else {
                                showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                            }
                            break;
                        case 'html':
                        case 'php':
                            if (checkLanguage_1.checkLanguageHtmlPhp(fileUri.path.split('.').pop(), exports.settings)) {
                                const newNameHtml = path.basename(fileUri.path).replace('.html', `${exports.settings.prefix}.html`);
                                const path2NewFileHtml = path.join(filePath, newNameHtml);
                                const modifiedHtmlText = globalMinifiers.minifyHtml(data.split('\n'));
                                writeMinifiedCode_1.minifiedTextToNewFile(path2NewFileHtml, modifiedHtmlText, exports.settings);
                            }
                            else {
                                showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                            }
                            break;
                        case 'javascript':
                        case 'javascriptreact':
                        case 'typescript':
                            if ((fileUri.path.split('.').pop() === 'javascript' && !exports.settings.disableJavascript) ||
                                (fileUri.path.split('.').pop() === 'javascriptreact' && !exports.settings.disableJavascriptReact) ||
                                (fileUri.path.split('.').pop() === 'typescript' && !exports.settings.disableTypescript)) {
                                const Terser = require('terser');
                                const newNameJs = path.basename(fileUri.path).replace('.js', `${exports.settings.prefix}.js`);
                                const path2NewFileJs = path.join(filePath, newNameJs);
                                const jsContent = data;
                                const minifierJs = Terser.minify(jsContent);
                                if (minifierJs.error === undefined) {
                                    writeMinifiedCode_1.minifiedTextToNewFile(path2NewFileJs, minifierJs.code, exports.settings);
                                }
                                else if (!exports.settings.disableMessages) {
                                    showMessage_1.showMessage(`Terser error: ${minifierJs.error}`, showMessage_1.MessageTypes.Error);
                                }
                            }
                            else {
                                showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                            }
                            break;
                        default:
                            showMessage_1.showMessage('⛔ We can not format this file type yet, use a valid one.', showMessage_1.MessageTypes.Warning);
                            break;
                    }
                }
            });
        }
        else {
            showMessage_1.showMessage("This command must be called from the menu, use instead 'Minify this document ⚡' or 'Minify this document and preserve the original ⛏' but don't call this command through the command palette", showMessage_1.MessageTypes.Warning);
        }
        context.subscriptions.push(MinifyAll2OtherDocSelected);
    }));
    // Command MinifyAll. It executes if its called the command "extension.MinifyAll"
    const MinifyAllSelectedText = vscode.commands.registerCommand('extension.MinifyAllSelectedText', () => {
        const editor = vscode.window.activeTextEditor;
        const { selection, } = editor;
        const selectedText = vscode.window.activeTextEditor.document.getText(selection);
        switch (vscode.window.activeTextEditor.document.languageId) {
            case 'css':
            case 'scss':
            case 'less':
            case 'sass':
                if (checkLanguage_1.checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const modifiedCssText = globalMinifiers.minifyCssScssLessSass(selectedText.split('\n'));
                    writeMinifiedCode_1.replaceSelectedCode(editor, selection, modifiedCssText);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'json':
            case 'jsonc':
                if (checkLanguage_1.checkLanguageJson(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const modifiedJsonText = globalMinifiers.minifyJsonJsonc(selectedText.split('\n'));
                    writeMinifiedCode_1.replaceSelectedCode(editor, selection, modifiedJsonText);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'html':
            case 'php':
                if (checkLanguage_1.checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const modifiedHtmlText = globalMinifiers.minifyHtml(selectedText.split('\n'));
                    writeMinifiedCode_1.replaceSelectedCode(editor, selection, modifiedHtmlText);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'javascript':
            case 'javascriptreact':
            case 'typescript':
                if (checkLanguage_1.checkLanguageJS(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const Terser = require('terser');
                    const jsContent = selectedText;
                    const minifierJs = Terser.minify(jsContent);
                    if (minifierJs.error === undefined) {
                        writeMinifiedCode_1.replaceSelectedCode(editor, selection, minifierJs.code);
                    }
                    else if (!exports.settings.disableMessages) {
                        showMessage_1.showMessage(`Terser error: ${minifierJs.error}`, showMessage_1.MessageTypes.Error);
                    }
                }
                else if (!exports.settings.disableMessages) {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            default:
                showMessage_1.showMessage('⛔ We can not format this file type yet, use a valid one.', showMessage_1.MessageTypes.Warning);
                break;
        }
        context.subscriptions.push(MinifyAllSelectedText);
    });
}
exports.default = activate;
/**
 * Summary a function that is called by vscode to deactivate the extension.
 *
 * Description function that is called when the extension is deactivated
 * or disabled, and it disposes all it can to stop using resources.
 *
 * @access public
 */
function deactivate() { }
exports.deactivate = deactivate;
exports.activate = activate;
exports.deactivate = deactivate;
// Exports for tests.
//# sourceMappingURL=main.js.map