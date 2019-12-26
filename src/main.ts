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

import FileSaver = require('fs');
import * as vscode from 'vscode';
import {
	replaceActualCode,
	replaceSelectedCode,
	minifiedTextToNewFile,
} from './controller/writeMinifiedCode';
import {
	checkLanguageStyles,
	checkLanguageJson,
	checkLanguageHtmlPhp,
	checkLanguageJS,
} from './controller/checkLanguage';
import getNewFilePath from './controller/getNewFilePath';
import commentRemover from './controller/commentRemover';
import globalMinify from './controller/globalMinifiers';
import { getUserSettings, UserSettings } from './controller/getConfiguration';

const settings: UserSettings = getUserSettings();

// If the user has selected to minify its code when saving.
if (settings.minifyOnSave) {
	vscode.workspace.onDidSaveTextDocument(() =>
		vscode.commands.executeCommand('extension.MinifyAll'));
}

if (settings.minifyOnSaveToNewFile) {
	vscode.workspace.onDidSaveTextDocument(() => vscode.commands.executeCommand('extension.MinifyAll2OtherDoc'));
}

// If the user has hexadecimal shortener enabled it will import it.
const HexMinifier = !settings.hexDisabled ? require('./controller/hexMinifier') : null;

const globalMinifiers = new globalMinify(HexMinifier, commentRemover);


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
	const MinifyAll = vscode.commands.registerCommand('extension.MinifyAll', () => {
		switch (vscode.window.activeTextEditor.document.languageId) {
			case 'css':
			case 'scss':
			case 'less':
			case 'sass':

				if (checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, settings)) {
					const modifiedCssText = globalMinifiers.minifyCssScssLessSass(
						vscode.window.activeTextEditor.document.getText().split('\n'));
					replaceActualCode(modifiedCssText);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'json':
			case 'jsonc':

				if (checkLanguageJson(vscode.window.activeTextEditor.document.languageId, settings)) {
					const modifiedJsonText = globalMinifiers.minifyJsonJsonc(
						vscode.window.activeTextEditor.document.getText().split('\n'));
					replaceActualCode(modifiedJsonText);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'html':
			case 'php':

				if (checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, settings)) {
					const modifiedHtmlText = globalMinifiers.minifyHtml(
						vscode.window.activeTextEditor.document.getText().split('\n'));
					replaceActualCode(modifiedHtmlText);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'javascript':
			case 'javascriptreact':
			case 'typescript':

				if (checkLanguageJS(vscode.window.activeTextEditor.document.languageId, settings)) {
					const Terser = require('terser');

					const jsContent = vscode.window.activeTextEditor.document.getText();

					const minifierJs = Terser.minify(jsContent);

					if (minifierJs.error === undefined) {
						replaceActualCode(minifierJs.code);
					} else if (!settings.disableMessages) {
						showMessage(`Terser error: ${minifierJs.error}`, false);
					}
				} else if (!settings.disableMessages) {
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
	const MinifyAll2OtherDoc = vscode.commands.registerCommand('extension.MinifyAll2OtherDoc', () => {
		const path = require('path');

		switch (vscode.window.activeTextEditor.document.languageId) {
			case 'css':
			case 'scss':
			case 'less':
			case 'sass':

				if (checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile = getNewFilePath(path,
						vscode.window.activeTextEditor.document.fileName,
						vscode.window.activeTextEditor.document.languageId, settings.prefix);

					const modifiedCssText = globalMinifiers.minifyCssScssLessSass(
						vscode.window.activeTextEditor.document.getText().split('\n'));

					minifiedTextToNewFile(path2NewFile, modifiedCssText, settings);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'json':
			case 'jsonc':

				if (checkLanguageJson(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile = getNewFilePath(path, vscode.window.activeTextEditor.document.fileName, 'json', settings.prefix);

					const modifiedJsonText = globalMinifiers.minifyJsonJsonc(
						vscode.window.activeTextEditor.document.getText().split('\n'));

					minifiedTextToNewFile(path2NewFile, modifiedJsonText, settings);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'html':
			case 'php':

				if (checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile = getNewFilePath(path,
						vscode.window.activeTextEditor.document.fileName,
						vscode.window.activeTextEditor.document.languageId, settings.prefix);

					const modifiedHtmlText = globalMinifiers.minifyHtml(
						vscode.window.activeTextEditor.document.getText().split('\n'));

					minifiedTextToNewFile(path2NewFile, modifiedHtmlText, settings);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'javascript':
			case 'javascriptreact':
			case 'typescript':

				if (checkLanguageJS(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile = getNewFilePath(path, vscode.window.activeTextEditor.document.fileName, 'js', settings.prefix);
					const Terser = require('terser');
					const jsContent = vscode.window.activeTextEditor.document.getText();

					const minifierJs = Terser.minify(jsContent);

					if (minifierJs.error === undefined) {
						minifiedTextToNewFile(path2NewFile, minifierJs.code, settings);
					} else if (!settings.disableMessages) {
						showMessage(`Terser error: ${minifierJs.error}`, false);
					}
				} else {
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
	const MinifyAll2OtherDocSelected = vscode.commands.registerCommand('extension.MinifyAll2OtherDocSelected', async (fileUri) => {
		if (fileUri !== undefined) {
			// We get the text from the selected file.
			FileSaver.readFile(fileUri.path, 'utf8', (err, data) => {
				if (err) {
					throw err;
				} else {
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
							} else {
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
							} else {
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
							} else {
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
								} else if (!settings.disableMessages) {
									showMessage(`Terser error: ${minifierJs.error}`, false);
								}
							} else {
								showMessage('We will not format this file type because it is disabled.', false);
							}
							break;
						default:
							showMessage('⛔ We can not format this file type yet, use a valid one.', true);
							break;
					}
				}
			});
		} else {
			showMessage("This command must be called from the menu, use instead 'Minify this document ⚡' or 'Minify this document and preserve the original ⛏' but don't call this command through the command palette", true);
		}
		context.subscriptions.push(MinifyAll2OtherDocSelected);
	});


	// Command MinifyAll. It executes if its called the command "extension.MinifyAll"
	const MinifyAllSelectedText = vscode.commands.registerCommand(
		'extension.MinifyAllSelectedText', () => {
			const editor = vscode.window.activeTextEditor;
			const {
				selection,
			} = editor;
			const selectedText = vscode.window.activeTextEditor.document.getText(selection);

			switch (vscode.window.activeTextEditor.document.languageId) {
				case 'css':
				case 'scss':
				case 'less':
				case 'sass':

					if (checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, settings)) {
						const modifiedCssText = globalMinifiers.minifyCssScssLessSass(selectedText.split('\n'));

						replaceSelectedCode(editor, selection, modifiedCssText);
					} else {
						showMessage('We will not format this file type because it is disabled.', false);
					}
					break;

				case 'json':
				case 'jsonc':

					if (checkLanguageJson(vscode.window.activeTextEditor.document.languageId, settings)) {
						const modifiedJsonText = globalMinifiers.minifyJsonJsonc(selectedText.split('\n'));

						replaceSelectedCode(editor, selection, modifiedJsonText);
					} else {
						showMessage('We will not format this file type because it is disabled.', false);
					}
					break;

				case 'html':
				case 'php':

					if (checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, settings)) {
						const modifiedHtmlText = globalMinifiers.minifyHtml(selectedText.split('\n'));

						replaceSelectedCode(editor, selection, modifiedHtmlText);
					} else {
						showMessage('We will not format this file type because it is disabled.', false);
					}
					break;

				case 'javascript':
				case 'javascriptreact':
				case 'typescript':

					if (checkLanguageJS(vscode.window.activeTextEditor.document.languageId, settings)) {
						const Terser = require('terser');

						const jsContent = selectedText;

						const minifierJs = Terser.minify(jsContent);

						if (minifierJs.error === undefined) {
							replaceSelectedCode(editor, selection, minifierJs.code);
						} else if (!settings.disableMessages) {
							showMessage(`Terser error: ${minifierJs.error}`, false);
						}
					} else if (!settings.disableMessages) {
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
 * @return {void}
 */
function showMessage(text: string, warning: boolean): void {
	if (warning) {
		if (!settings.disableMessages) {
			vscode.window.showWarningMessage(text);
		}
	} else if (!settings.disableMessages) {
		vscode.window.showInformationMessage(text);
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
export function deactivate() { }
exports.activate = activate;
exports.deactivate = deactivate;
// Exports for tests.
