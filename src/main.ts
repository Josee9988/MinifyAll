// tslint:disable: variable-name
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
 * @author Jose Gracia Berenguer
 * @since 0.1.0
 * @see README.md
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */

import FileSaver = require('fs');
import * as vscode from 'vscode';
import { checkLanguageHtmlPhp, checkLanguageJS, checkLanguageJson, checkLanguageStyles } from './controller/checkLanguage';
import { getUserSettings, IUserSettings } from './controller/getConfiguration';
import getNewFilePath from './controller/getNewFilePath';
import globalMinify from './controller/globalMinifiers';
import { MessageTypes, showMessage } from './controller/showMessage';
import { minifiedTextToNewFile, replaceActualCode, replaceSelectedCode } from './controller/writeMinifiedCode';

export const settings: IUserSettings = getUserSettings();

// If the user has selected to minify its code when saving.
if (settings.minifyOnSave) {
	vscode.workspace.onDidSaveTextDocument(() => vscode.commands.executeCommand('extension.MinifyAll'));
}

// If the user has selected to minify to a new file when saving.
if (settings.minifyOnSaveToNewFile) {
	vscode.workspace.onDidSaveTextDocument(() => vscode.commands.executeCommand('extension.MinifyAll2OtherDoc'));
}

// If the user has hexadecimal shortener enabled it will import it.
const minifyHex: boolean = !settings.hexDisabled ? true : false;

const globalMinifiers: globalMinify = new globalMinify(minifyHex);


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
export default function activate(context: vscode.ExtensionContext): void {
	// Command MinifyAll. It executes if its called the command "extension.MinifyAll"
	const MinifyAll: any = vscode.commands.registerCommand('extension.MinifyAll', () => {
		const documentText: string[] = vscode.window.activeTextEditor.document.getText().split('\n');
		switch (vscode.window.activeTextEditor.document.languageId) {
			case 'css': case 'scss': case 'less': case 'sass': // CSS SCSS LESS SASS
				if (checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, settings)) {
					replaceActualCode(globalMinifiers.minifyCssScssLessSass(documentText));
				} else {
					showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
				}
				break;

			case 'json': case 'jsonc': // JSON JSONC
				if (checkLanguageJson(vscode.window.activeTextEditor.document.languageId, settings)) {
					replaceActualCode(globalMinifiers.minifyJsonJsonc(documentText));
				} else {
					showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
				}
				break;

			case 'html': case 'php': // HTML PHP
				if (checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, settings)) {
					replaceActualCode(globalMinifiers.minifyHtml(documentText));
				} else {
					showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
				}
				break;

			case 'javascript': case 'javascriptreact': // JavaScript
				if (checkLanguageJS(vscode.window.activeTextEditor.document.languageId, settings)) {
					const Terser: any = require('terser');
					const minifierJs: any = Terser.minify(vscode.window.activeTextEditor.document.getText());

					if (minifierJs.error === undefined) {
						replaceActualCode(minifierJs.code);
					} else {
						showMessage(`Terser error: ${minifierJs.error}`, MessageTypes.Error);
					}
				} else {
					showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
				}
				break;
			default:
				showMessage('⛔ We can not format this file type yet, use a valid one.', MessageTypes.Warning);
				break;
		}
		context.subscriptions.push(MinifyAll);
	});


	// Command MinifyAll2OtherDoc and writes the result in other file.
	// It executes if its called the command "extension.MinifyAll2OtherDoc"
	const MinifyAll2OtherDoc: any = vscode.commands.registerCommand('extension.MinifyAll2OtherDoc', () => {
		const path: any = require('path');
		const documentText: string[] = vscode.window.activeTextEditor.document.getText().split('\n');
		const SelectedFileName: string = vscode.window.activeTextEditor.document.fileName;

		switch (vscode.window.activeTextEditor.document.languageId) {
			case 'css': case 'scss': case 'less': case 'sass': // CSS SCSS LESS SASS
				if (checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile: string = getNewFilePath(path, SelectedFileName,
						vscode.window.activeTextEditor.document.languageId, settings.prefix);

					const modifiedCssText: string = globalMinifiers.minifyCssScssLessSass(documentText);
					minifiedTextToNewFile(path2NewFile, modifiedCssText, settings);
				} else {
					showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
				}
				break;

			case 'json': case 'jsonc': // Json JsonC
				if (checkLanguageJson(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile: string = getNewFilePath(path, SelectedFileName, 'json', settings.prefix);

					const modifiedJsonText: string = globalMinifiers.minifyJsonJsonc(documentText);
					minifiedTextToNewFile(path2NewFile, modifiedJsonText, settings);
				} else {
					showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
				}
				break;

			case 'html': case 'php': // HTML PHP
				if (checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile: string = getNewFilePath(path, SelectedFileName,
						vscode.window.activeTextEditor.document.languageId, settings.prefix);

					const modifiedHtmlText: string = globalMinifiers.minifyHtml(documentText);
					minifiedTextToNewFile(path2NewFile, modifiedHtmlText, settings);
				} else {
					showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
				}
				break;

			case 'javascript': case 'javascriptreact': // JavaScript
				if (checkLanguageJS(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile: string = getNewFilePath(path, SelectedFileName, 'js', settings.prefix);
					const Terser: any = require('terser');
					const minifierJs: any = Terser.minify(vscode.window.activeTextEditor.document.getText());

					if (minifierJs.error === undefined) {
						minifiedTextToNewFile(path2NewFile, minifierJs.code, settings);
					} else {
						showMessage(`Terser error: ${minifierJs.error}`, MessageTypes.Error);
					}
				} else {
					showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
				}
				break;
			default:
				showMessage('⛔ We can not format this file type yet, use a valid one.', MessageTypes.Warning);
				break;
		}
		context.subscriptions.push(MinifyAll2OtherDoc);
	});


	// Command MinifyAll2OtherDocSelected and writes the result in other file.
	// It executes if its called the command "extension.MinifyAll2OtherDocSelected"
	const MinifyAll2OtherDocSelected: any = vscode.commands.registerCommand('extension.MinifyAll2OtherDocSelected', async (fileUri) => {
		if (fileUri !== undefined) {
			// We get the text from the selected file.
			FileSaver.readFile(fileUri.path, 'utf8', (error: Error, data: string) => {
				if (!error) { // if there is not any error
					const path: any = require('path');
					const filePath: string = path.dirname(fileUri.path);

					switch (fileUri.path.split('.').pop()) {
						case 'css': case 'scss': case 'less': case 'sass': // CSS SCSS LESS SASS
							if (checkLanguageStyles(fileUri.path.split('.').pop(), settings)) {
								const newName: string = path.basename(fileUri.path).replace('.css', `${settings.prefix}.css`);
								const path2NewFile: string = path.join(filePath, newName);
								const modifiedCssText: string = globalMinifiers.minifyCssScssLessSass(data.split('\n'));
								minifiedTextToNewFile(path2NewFile, modifiedCssText, settings);
							} else {
								showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
							}
							break;

						case 'json': case 'jsonc': // Json Jsonc
							if (checkLanguageJson(fileUri.path.split('.').pop(), settings)) {
								const newNameJson: string = path.basename(fileUri.path).replace('.json', `${settings.prefix}.json`);
								const path2NewFileJson: string = path.join(filePath, newNameJson);
								const modifiedJsonText: string = globalMinifiers.minifyJsonJsonc(data.split('\n'));
								minifiedTextToNewFile(path2NewFileJson, modifiedJsonText, settings);
							} else {
								showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
							}
							break;

						case 'html': case 'php': // HTML PHP
							if (checkLanguageHtmlPhp(fileUri.path.split('.').pop(), settings)) {
								const newNameHtml: string = path.basename(fileUri.path).replace('.html', `${settings.prefix}.html`);
								const path2NewFileHtml: string = path.join(filePath, newNameHtml);
								const modifiedHtmlText: string = globalMinifiers.minifyHtml(data.split('\n'));
								minifiedTextToNewFile(path2NewFileHtml, modifiedHtmlText, settings);
							} else {
								showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
							}
							break;

						case 'javascript': case 'javascriptreact': // JavaScript
							if ((fileUri.path.split('.').pop() === 'javascript' && !settings.disableJavascript) ||
								(fileUri.path.split('.').pop() === 'javascriptreact' && !settings.disableJavascriptReact)) {
								const Terser: any = require('terser');
								const path2NewFileJs: string = path.join(filePath, path.basename(fileUri.path).replace('.js', `${settings.prefix}.js`));
								const minifierJs: any = Terser.minify(data);

								if (minifierJs.error === undefined) {
									minifiedTextToNewFile(path2NewFileJs, minifierJs.code, settings);
								} else {
									showMessage(`Terser error: ${minifierJs.error}`, MessageTypes.Error);
								}
							} else {
								showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
							}
							break;
						default:
							showMessage('⛔ We can not format this file type yet, use a valid one.', MessageTypes.Warning);
							break;
					}
				} else {
					showMessage(error.toString(), MessageTypes.Error);
				}
			});
		} else {
			showMessage("This command must be called from the menu, use instead 'Minify this document ⚡' or 'Minify this document and preserve the original ⛏' but don't call this command through the command palette", MessageTypes.Warning);
		}
		context.subscriptions.push(MinifyAll2OtherDocSelected);
	});


	// Command MinifyAll. It executes if its called the command "extension.MinifyAll"
	const MinifyAllSelectedText: any = vscode.commands.registerCommand(
		'extension.MinifyAllSelectedText', () => {
			const editor: any = vscode.window.activeTextEditor;
			const { selection } = editor;
			const selectedText: string = vscode.window.activeTextEditor.document.getText(selection);

			switch (vscode.window.activeTextEditor.document.languageId) {
				case 'css': case 'scss': case 'less': case 'sass': // CSS SCSS LESS SASS
					if (checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, settings)) {
						const modifiedCssText: string = globalMinifiers.minifyCssScssLessSass(selectedText.split('\n'));
						replaceSelectedCode(editor, selection, modifiedCssText);
					} else {
						showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
					}
					break;

				case 'json': case 'jsonc': // Json Jsonc
					if (checkLanguageJson(vscode.window.activeTextEditor.document.languageId, settings)) {
						const modifiedJsonText: string = globalMinifiers.minifyJsonJsonc(selectedText.split('\n'));
						replaceSelectedCode(editor, selection, modifiedJsonText);
					} else {
						showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
					}
					break;

				case 'html': case 'php': // HTML PHP
					if (checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, settings)) {
						const modifiedHtmlText: string = globalMinifiers.minifyHtml(selectedText.split('\n'));
						replaceSelectedCode(editor, selection, modifiedHtmlText);
					} else {
						showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
					}
					break;

				case 'javascript': case 'javascriptreact': // JavaScript
					if (checkLanguageJS(vscode.window.activeTextEditor.document.languageId, settings)) {
						const Terser: any = require('terser');
						const minifierJs: any = Terser.minify(selectedText);

						if (minifierJs.error === undefined) { // if there is no error
							replaceSelectedCode(editor, selection, minifierJs.code);
						} else if (!settings.disableMessages) { // if there is an error
							showMessage(`Terser error: ${minifierJs.error}`, MessageTypes.Error);
						}
					} else {
						showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
					}
					break;
				default:
					showMessage('⛔ We can not format this file type yet, use a valid one.', MessageTypes.Warning);
					break;
			}
			context.subscriptions.push(MinifyAllSelectedText);
		});
}


/**
 * Summary a function that is called by vscode to deactivate the extension.
 *
 * Description function that is called when the extension is deactivated
 * or disabled, and it disposes all it can to stop using resources.
 *
 * @access public
 */ // tslint:disable-next-line: no-empty
export function deactivate(): void { }
exports.activate = activate;
exports.deactivate = deactivate;
