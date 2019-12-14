const vscode = require('vscode');
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
            editor.selection = new vscode.Selection(postion, postion);
        });
}
exports.replaceSelectedCode = replaceSelectedCode;
