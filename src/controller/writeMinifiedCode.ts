import { IUserSettings } from "./getConfiguration";

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

import * as fs from 'fs';
import * as vscode from 'vscode';
import { MessageTypes, showMessage } from './showMessage';


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
export function replaceActualCode(modifiedText: string): void {
    const editor: any = vscode.window.activeTextEditor;
    const firstLineCss: any = editor.document.lineAt(0);
    const lastLineCss: any = editor.document.lineAt(editor.document.lineCount - 1);
    const textRange: vscode.Range = new vscode.Range(0, firstLineCss.range.start.character,
        editor.document.lineCount - 1, lastLineCss.range.end.character);
    editor.edit((builder: any) => {
        builder.replace(textRange, modifiedText);
    });
}


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
export function replaceSelectedCode(editor: any, selection: object, modifiedText: string): void {
    editor.edit((builder: any) => {
        builder.replace(selection, modifiedText);
    }).then(() => {
        const postion: any = editor.selection.end;
        // eslint-disable-next-line no-param-reassign
        editor.selection = new vscode.Selection(postion, postion);
    });
}


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
// tslint:disable-next-line: max-line-length
export function minifiedTextToNewFile(path2NewFile: string, modifiedText: string, settings: IUserSettings): void {
    fs.writeFile(path2NewFile, modifiedText, () => {
        if (settings.openMinifiedDocument) {
            vscode.workspace.openTextDocument(path2NewFile).then((doc: any) => {
                vscode.window.showTextDocument(doc);
            });
            if (!settings.disableMessages) {
                showMessage(`The minified file has been saved in: ${path2NewFile}`, MessageTypes.Informational);
            }
        }
    });
}
