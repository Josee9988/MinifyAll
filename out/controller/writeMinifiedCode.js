"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require('vscode');
const FileSaver = require('fs');
const { showMessage, } = require('./../main');
function replaceActualCode(modifiedText) {
    const editor = vscode.window.activeTextEditor;
    const firstLineCss = editor.document.lineAt(0);
    const lastLineCss = editor.document.lineAt(editor.document.lineCount - 1);
    const textRange = new vscode.Range(0, firstLineCss.range.start.character, editor.document.lineCount - 1, lastLineCss.range.end.character);
    editor.edit((builder) => {
        builder.replace(textRange, modifiedText);
    });
}
exports.replaceActualCode = replaceActualCode;
function replaceSelectedCode(editor, selection, modifiedText) {
    editor.edit((builder) => {
        builder.replace(selection, modifiedText);
    })
        .then(() => {
        const postion = editor.selection.end;
        editor.selection = new vscode.Selection(postion, postion);
    });
}
exports.replaceSelectedCode = replaceSelectedCode;
function minifiedTextToNewFile(path2NewFile, modifiedText, settings) {
    FileSaver.writeFile(path2NewFile, modifiedText, () => {
        if (settings.openMinifiedDocument) {
            vscode.workspace.openTextDocument(path2NewFile).then((doc) => {
                vscode.window.showTextDocument(doc);
            });
            if (!settings.disableMessages) {
                showMessage(`The minified file has been saved in: ${path2NewFile}`, false);
            }
        }
    });
}
exports.minifiedTextToNewFile = minifiedTextToNewFile;
//# sourceMappingURL=writeMinifiedCode.js.map