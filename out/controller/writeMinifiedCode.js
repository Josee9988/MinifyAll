"use strict";
/**
 * @file file that contains the functions that will replace the actual code with the minified one,
 * replace the selected code with the minified one and a function to write the minified text to
 * a new file,
 *
 * @since 1.9.1
 * @author Jose Gracia Berenguer
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require('vscode');
const FileSaver = require('fs');
const { showMessage, } = require('./../main');
/**
 * Summary gets the actual code and replaces it with the minified one.
 *
 * Description it receives the minified text and replaces it with the
 * received text.
 *
 * @access private
 *
 * @param {String} modifiedText the text to replace the original code.
 * @return {void}
 */
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
/**
 * Summary gets the selected code and replaces it with the minified one.
 *
 * Description it receives the minified text and replaces it with the
 * received text.
 *
 * @access private
 * @param {object} editor openned editor
 * @param {object} selection selection provided.
 * @param {string} modifiedText the minified text
 *
 * @return {void}
 */
function replaceSelectedCode(editor, selection, modifiedText) {
    editor.edit((builder) => {
        builder.replace(selection, modifiedText);
    })
        .then(() => {
        const postion = editor.selection.end;
        // eslint-disable-next-line no-param-reassign
        editor.selection = new vscode.Selection(postion, postion);
    });
}
exports.replaceSelectedCode = replaceSelectedCode;
/**
 * Summary gets the minified code and writes it in a new file.
 *
 * Description it receives a path and the modified text, and
 * it writes the text receives to the new file and then opens the file.
 *
 * @access private
 *
 * @param {String} path2NewFile The path to the new file.
 * @param {String} modifiedText The text to place the text in the new file.
 * @param {Object} settings     Settings of the user.
 * @return {void}
 */
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