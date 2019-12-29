"use strict";
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
const checkLanguage_1 = require("./controller/checkLanguage");
const getConfiguration_1 = require("./controller/getConfiguration");
const getNewFilePath_1 = require("./controller/getNewFilePath");
const globalMinifiers_1 = require("./controller/globalMinifiers");
const showMessage_1 = require("./controller/showMessage");
const writeMinifiedCode_1 = require("./controller/writeMinifiedCode");
exports.settings = getConfiguration_1.getUserSettings();
if (exports.settings.minifyOnSave) {
    vscode.workspace.onDidSaveTextDocument(() => vscode.commands.executeCommand('extension.MinifyAll'));
}
if (exports.settings.minifyOnSaveToNewFile) {
    vscode.workspace.onDidSaveTextDocument(() => vscode.commands.executeCommand('extension.MinifyAll2OtherDoc'));
}
const minifyHex = !exports.settings.hexDisabled ? true : false;
const globalMinifiers = new globalMinifiers_1.default(minifyHex);
function activate(context) {
    const MinifyAll = vscode.commands.registerCommand('extension.MinifyAll', () => {
        const documentText = vscode.window.activeTextEditor.document.getText().split('\n');
        switch (vscode.window.activeTextEditor.document.languageId) {
            case 'css':
            case 'scss':
            case 'less':
            case 'sass':
                if (checkLanguage_1.checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    writeMinifiedCode_1.replaceActualCode(globalMinifiers.minifyCssScssLessSass(documentText));
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'json':
            case 'jsonc':
                if (checkLanguage_1.checkLanguageJson(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    writeMinifiedCode_1.replaceActualCode(globalMinifiers.minifyJsonJsonc(documentText));
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'html':
            case 'php':
                if (checkLanguage_1.checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    writeMinifiedCode_1.replaceActualCode(globalMinifiers.minifyHtml(documentText));
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'javascript':
            case 'javascriptreact':
                if (checkLanguage_1.checkLanguageJS(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const Terser = require('terser');
                    const minifierJs = Terser.minify(vscode.window.activeTextEditor.document.getText());
                    if (minifierJs.error === undefined) {
                        writeMinifiedCode_1.replaceActualCode(minifierJs.code);
                    }
                    else {
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
        context.subscriptions.push(MinifyAll);
    });
    const MinifyAll2OtherDoc = vscode.commands.registerCommand('extension.MinifyAll2OtherDoc', () => {
        const path = require('path');
        const documentText = vscode.window.activeTextEditor.document.getText().split('\n');
        const SelectedFileName = vscode.window.activeTextEditor.document.fileName;
        switch (vscode.window.activeTextEditor.document.languageId) {
            case 'css':
            case 'scss':
            case 'less':
            case 'sass':
                if (checkLanguage_1.checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const path2NewFile = getNewFilePath_1.default(path, SelectedFileName, vscode.window.activeTextEditor.document.languageId, exports.settings.prefix);
                    const modifiedCssText = globalMinifiers.minifyCssScssLessSass(documentText);
                    writeMinifiedCode_1.minifiedTextToNewFile(path2NewFile, modifiedCssText, exports.settings);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'json':
            case 'jsonc':
                if (checkLanguage_1.checkLanguageJson(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const path2NewFile = getNewFilePath_1.default(path, SelectedFileName, 'json', exports.settings.prefix);
                    const modifiedJsonText = globalMinifiers.minifyJsonJsonc(documentText);
                    writeMinifiedCode_1.minifiedTextToNewFile(path2NewFile, modifiedJsonText, exports.settings);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'html':
            case 'php':
                if (checkLanguage_1.checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const path2NewFile = getNewFilePath_1.default(path, SelectedFileName, vscode.window.activeTextEditor.document.languageId, exports.settings.prefix);
                    const modifiedHtmlText = globalMinifiers.minifyHtml(documentText);
                    writeMinifiedCode_1.minifiedTextToNewFile(path2NewFile, modifiedHtmlText, exports.settings);
                }
                else {
                    showMessage_1.showMessage('We will not format this file type because it is disabled.', showMessage_1.MessageTypes.Warning);
                }
                break;
            case 'javascript':
            case 'javascriptreact':
                if (checkLanguage_1.checkLanguageJS(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const path2NewFile = getNewFilePath_1.default(path, SelectedFileName, 'js', exports.settings.prefix);
                    const Terser = require('terser');
                    const minifierJs = Terser.minify(vscode.window.activeTextEditor.document.getText());
                    if (minifierJs.error === undefined) {
                        writeMinifiedCode_1.minifiedTextToNewFile(path2NewFile, minifierJs.code, exports.settings);
                    }
                    else {
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
    const MinifyAll2OtherDocSelected = vscode.commands.registerCommand('extension.MinifyAll2OtherDocSelected', (fileUri) => __awaiter(this, void 0, void 0, function* () {
        if (fileUri !== undefined) {
            FileSaver.readFile(fileUri.path, 'utf8', (error, data) => {
                if (!error) {
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
                            if ((fileUri.path.split('.').pop() === 'javascript' && !exports.settings.disableJavascript) ||
                                (fileUri.path.split('.').pop() === 'javascriptreact' && !exports.settings.disableJavascriptReact)) {
                                const Terser = require('terser');
                                const path2NewFileJs = path.join(filePath, path.basename(fileUri.path).replace('.js', `${exports.settings.prefix}.js`));
                                const minifierJs = Terser.minify(data);
                                if (minifierJs.error === undefined) {
                                    writeMinifiedCode_1.minifiedTextToNewFile(path2NewFileJs, minifierJs.code, exports.settings);
                                }
                                else {
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
                else {
                    showMessage_1.showMessage(error.toString(), showMessage_1.MessageTypes.Error);
                }
            });
        }
        else {
            showMessage_1.showMessage("This command must be called from the menu, use instead 'Minify this document ⚡' or 'Minify this document and preserve the original ⛏' but don't call this command through the command palette", showMessage_1.MessageTypes.Warning);
        }
        context.subscriptions.push(MinifyAll2OtherDocSelected);
    }));
    const MinifyAllSelectedText = vscode.commands.registerCommand('extension.MinifyAllSelectedText', () => {
        const editor = vscode.window.activeTextEditor;
        const { selection } = editor;
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
                if (checkLanguage_1.checkLanguageJS(vscode.window.activeTextEditor.document.languageId, exports.settings)) {
                    const Terser = require('terser');
                    const minifierJs = Terser.minify(selectedText);
                    if (minifierJs.error === undefined) {
                        writeMinifiedCode_1.replaceSelectedCode(editor, selection, minifierJs.code);
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
        context.subscriptions.push(MinifyAllSelectedText);
    });
}
exports.default = activate;
function deactivate() { }
exports.deactivate = deactivate;
exports.activate = activate;
exports.deactivate = deactivate;
//# sourceMappingURL=main.js.map