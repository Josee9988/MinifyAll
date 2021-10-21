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

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as zl from 'zip-lib';

import { COMPRESSION_LEVEL, zip } from 'zip-a-folder';
import { IUserSettings, getUserSettings } from './controller/getConfiguration';
import { MessageTypes, showMessage } from './controller/showMessage';
import { minify } from "terser";
import { checkLanguageHtmlPhp, checkLanguageJS, checkLanguageJson, checkLanguageStyles } from './controller/checkLanguage';
import { minifiedTextToNewFile, replaceActualCode, replaceSelectedCode } from './controller/writeMinifiedCode';

import { MinifyAllClass } from '@josee9988/minifyall';
import getNewFilePath from './controller/getNewFilePath';

export var settings: IUserSettings = getUserSettings();
// callback handler for when settings are changed by the user:
vscode.workspace.onDidChangeConfiguration(event => {
	if (event.affectsConfiguration('MinifyAll')) {
		// These options are special and need a window reload. Promt the user for it:
		if (
			event.affectsConfiguration('MinifyAll.minifyOnSave') ||
			event.affectsConfiguration('MinifyAll.minifyOnSaveToNewFile') ||
			event.affectsConfiguration('MinifyAll.disableHexadecimalShortener')
		) {
			const reload = 'Reload';
			vscode.window.showInformationMessage(
				'Reload window in order for changes in extension configuration to take effect.',
				reload, 'Cancel'
			).then(selectedAction => {
				if (selectedAction === reload) {
					vscode.commands.executeCommand('workbench.action.reloadWindow');
					//probably never reached:
					return
				}
			});
		} else {
			// Update the settings:
			settings = getUserSettings();
		}
	}
})

// If the user has selected to minify its code when saving.
if (settings.minifyOnSave) {
	vscode.workspace.onDidSaveTextDocument(() => vscode.commands.executeCommand('extension.MinifyAll'));
}

// If the user has selected to minify to a new file when saving.
if (settings.minifyOnSaveToNewFile) {
	vscode.workspace.onDidSaveTextDocument(() => vscode.commands.executeCommand('extension.MinifyAll2OtherDoc'));
}

// If the user has hexadecimal shortener enabled it will import it.
const globalMinifiers: MinifyAllClass = new MinifyAllClass(!settings.hexDisabled);

// List of supported filetypes, can be used in package.json Context
vscode.commands.executeCommand('setContext', 'extension.supportedFiletypes', [
	'html', 'xml', 'twig', 'css', 'scss', 'less', 'json', 'jsonc', 'javascript', 'javascriptreact',
]);

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
 * The command 'Compress' is called from the menu and compresses the selected file/folder.
 *
 * @access public
 *
 * @param {object} context information about VSCode. Ignore.
 *
 * @return {void}
 */
export default function activate(context: vscode.ExtensionContext): void {
	// Command MinifyAll. It executes if its called the command "extension.MinifyAll"
	const commandMinifyAll: any = vscode.commands.registerCommand('extension.MinifyAll', async () => {
		const documentText: string[] = vscode.window.activeTextEditor.document.getText().split('\n');
		switch (vscode.window.activeTextEditor.document.languageId) {
			case 'css': case 'scss': case 'less': case 'sass': // CSS SCSS LESS SASS
				if (checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, settings)) {
					replaceActualCode(globalMinifiers.minifyCssScssLessSass(documentText));
				} else {
					if (!settings.minifyOnSave) { showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning); }
				}
				break;

			case 'json': case 'jsonc': // JSON JSONC
				if (checkLanguageJson(vscode.window.activeTextEditor.document.languageId, settings)) {
					replaceActualCode(globalMinifiers.minifyJsonJsonc(documentText));
				} else {
					if (!settings.minifyOnSave) { showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning); }
				}
				break;

			case 'html': case 'xml': case 'php': case 'twig': case 'vue': case 'vue-html': // HTML PHP
				if (checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, settings)) {
					replaceActualCode(globalMinifiers.minifyHtml(documentText));
				} else {
					if (!settings.minifyOnSave) { showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning); }
				}
				break;

			case 'javascript': case 'javascriptreact': // JavaScript
				if (checkLanguageJS(vscode.window.activeTextEditor.document.languageId, settings)) {
					const minifierJs: any = await minify(vscode.window.activeTextEditor.document.getText(), settings.terserMinifyOptions);

					if (minifierJs.error === undefined) {
						replaceActualCode(minifierJs.code);
					} else {
						showMessage(`Terser error: ${minifierJs.error}`, MessageTypes.Error);
					}
				} else {
					if (!settings.minifyOnSave) { showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning); }
				}
				break;
			default:
				if (!settings.minifyOnSave) { showMessage('⛔ We can not format this file type yet (' + vscode.window.activeTextEditor.document.languageId + '), use a valid one.', MessageTypes.Warning); }
				break;
		}
		context.subscriptions.push(commandMinifyAll);
	});


	// Command MinifyAll2OtherDoc and writes the result in other file.
	// It executes if its called the command "extension.MinifyAll2OtherDoc"
	const commandMinifyAll2OtherDoc: any = vscode.commands.registerCommand('extension.MinifyAll2OtherDoc', async () => {

		const documentText: string[] = vscode.window.activeTextEditor.document.getText().split('\n');
		const selectedFileName: string = vscode.window.activeTextEditor.document.fileName;

		switch (vscode.window.activeTextEditor.document.languageId) {
			case 'css': case 'scss': case 'less': case 'sass': // CSS SCSS LESS SASS
				if (checkLanguageStyles(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile: string = getNewFilePath(path, selectedFileName,
						vscode.window.activeTextEditor.document.languageId, settings.PrefixOfNewMinifiedFiles);

					const modifiedCssText: string = globalMinifiers.minifyCssScssLessSass(documentText);
					minifiedTextToNewFile(path2NewFile, modifiedCssText, settings);
				} else {
					if (!settings.minifyOnSaveToNewFile) { showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning); }
				}
				break;

			case 'json': case 'jsonc': // Json JsonC
				if (checkLanguageJson(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile: string = getNewFilePath(path, selectedFileName, 'json', settings.PrefixOfNewMinifiedFiles);

					const modifiedJsonText: string = globalMinifiers.minifyJsonJsonc(documentText);
					minifiedTextToNewFile(path2NewFile, modifiedJsonText, settings);
				} else {
					if (!settings.minifyOnSaveToNewFile) { showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning); }
				}
				break;

			case 'html': case 'xml': case 'php': case 'twig': case 'vue': case 'vue-html': // HTML PHP
				if (checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile: string = getNewFilePath(path, selectedFileName,
						vscode.window.activeTextEditor.document.languageId, settings.PrefixOfNewMinifiedFiles);

					const modifiedHtmlText: string = globalMinifiers.minifyHtml(documentText);
					minifiedTextToNewFile(path2NewFile, modifiedHtmlText, settings);
				} else {
					if (!settings.minifyOnSaveToNewFile) { showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning); }
				}
				break;

			case 'javascript': case 'javascriptreact': // JavaScript
				if (checkLanguageJS(vscode.window.activeTextEditor.document.languageId, settings)) {
					const path2NewFile: string = getNewFilePath(path, selectedFileName, 'js', settings.PrefixOfNewMinifiedFiles);
					const minifierJs: any = await minify(vscode.window.activeTextEditor.document.getText(), settings.terserMinifyOptions);

					if (minifierJs.error === undefined) {
						minifiedTextToNewFile(path2NewFile, minifierJs.code, settings);
					} else {
						showMessage(`Terser error: ${minifierJs.error}`, MessageTypes.Error);
					}
				} else {
					if (!settings.minifyOnSaveToNewFile) { showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning); }
				}
				break;
			default:
				if (!settings.minifyOnSaveToNewFile) { showMessage('⛔ We can not format this file type yet (' + vscode.window.activeTextEditor.document.languageId + '), use a valid one.', MessageTypes.Warning); }
				break;
		}
		context.subscriptions.push(commandMinifyAll2OtherDoc);
	});


	// Command MinifyAll2OtherDocSelected and writes the result in other file.
	// It executes if its called the command "extension.MinifyAll2OtherDocSelected"
	const commandMinifyAll2OtherDocSelected: any = vscode.commands.registerCommand('extension.MinifyAll2OtherDocSelected', async (fileUri) => {
		if (fileUri !== undefined) {
			// We get the text from the selected file.
			fs.readFile(fileUri._fsPath, 'utf8', async (error: Error, data: string) => {
				if (!error) { // if there is not any error
					const filePath: string = path.dirname(fileUri._fsPath);

					switch (fileUri._fsPath.split('.').pop()) {
						case 'css': case 'scss': case 'less': case 'sass': // CSS SCSS LESS SASS
							if (checkLanguageStyles(fileUri._fsPath.split('.').pop(), settings)) {
								const newName: string = path.basename(fileUri._fsPath).replace(`.${fileUri._fsPath.split('.').pop()}`, `${settings.PrefixOfNewMinifiedFiles}.css`);
								const path2NewFile: string = path.join(filePath, newName);
								const modifiedCssText: string = globalMinifiers.minifyCssScssLessSass(data.split('\n'));
								minifiedTextToNewFile(path2NewFile, modifiedCssText, settings);
							} else {
								showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
							}
							break;

						case 'json': case 'jsonc': // Json Jsonc
							if (checkLanguageJson(fileUri._fsPath.split('.').pop(), settings)) {
								const newNameJson: string = path.basename(fileUri._fsPath).replace('.json', `${settings.PrefixOfNewMinifiedFiles}.json`);
								const path2NewFileJson: string = path.join(filePath, newNameJson);
								const modifiedJsonText: string = globalMinifiers.minifyJsonJsonc(data.split('\n'));
								minifiedTextToNewFile(path2NewFileJson, modifiedJsonText, settings);
							} else {
								showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
							}
							break;

						case 'html': case 'xml': case 'php': case 'twig': case 'vue': case 'vue-html': // HTML PHP
							if (checkLanguageHtmlPhp(fileUri._fsPath.split('.').pop(), settings)) {
								const newNameHtml: string = path.basename(fileUri._fsPath).replace(`.${fileUri._fsPath.split('.').pop()}`, `${settings.PrefixOfNewMinifiedFiles}.html`);
								const path2NewFileHtml: string = path.join(filePath, newNameHtml);
								const modifiedHtmlText: string = globalMinifiers.minifyHtml(data.split('\n'));
								minifiedTextToNewFile(path2NewFileHtml, modifiedHtmlText, settings);
							} else {
								showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
							}
							break;

						case 'js': // JavaScript
							if ((fileUri._fsPath.split('.').pop() === 'js' && !settings.disableJavascript) ||
								(fileUri._fsPath.split('.').pop() === 'jsx' && !settings.disableJavascriptReact)) {
								const path2NewFileJs: string = path.join(filePath, path.basename(fileUri._fsPath).replace('.js', `${settings.PrefixOfNewMinifiedFiles}.js`));
								const minifierJs: any = await minify(data, settings.terserMinifyOptions);

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
							showMessage('⛔ We can not format this file type yet (' + fileUri._fsPath.split('.').pop() + '), use a valid one.', MessageTypes.Warning);
							break;
					}
				} else {
					showMessage(error.toString(), MessageTypes.Error);
				}
			});
		} else {
			showMessage("This command must be called from the menu, use instead 'Minify this document ⚡' or 'Minify this document and preserve the original ⛏' but don't call this command through the command palette", MessageTypes.Warning);
		}
		context.subscriptions.push(commandMinifyAll2OtherDocSelected);
	});


	// Command MinifyAll. It executes if its called the command "extension.MinifyAll"
	const commandMinifyAllSelectedText: any = vscode.commands.registerCommand(
		'extension.MinifyAllSelectedText', async () => {
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

				case 'html': case 'xml': case 'php': case 'twig': case 'vue': case 'vue-html': // HTML PHP
					if (checkLanguageHtmlPhp(vscode.window.activeTextEditor.document.languageId, settings)) {
						const modifiedHtmlText: string = globalMinifiers.minifyHtml(selectedText.split('\n'));
						replaceSelectedCode(editor, selection, modifiedHtmlText);
					} else {
						showMessage('We will not format this file type because it is disabled.', MessageTypes.Warning);
					}
					break;

				case 'javascript': case 'javascriptreact': // JavaScript
					if (checkLanguageJS(vscode.window.activeTextEditor.document.languageId, settings)) {
						const minifierJs: any = await minify(selectedText, settings.terserMinifyOptions);

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
					showMessage('⛔ We can not format this file type yet (' + vscode.window.activeTextEditor.document.languageId + '), use a valid one.', MessageTypes.Warning);
					break;
			}
			context.subscriptions.push(commandMinifyAllSelectedText);
		});


	// Command Compress and writes the result in other file.
	// It executes if its called the command "extension.Compress"
	const commandCompress: any = vscode.commands.registerCommand('extension.Compress', async (fileUri) => {
		if (fileUri !== undefined) {
			if (fs.statSync(fileUri._fsPath).isDirectory()) { // DIRECTORY
				await zip(fileUri._fsPath, fileUri._fsPath + ".zip", { compression: COMPRESSION_LEVEL.high }).then(() => {
					console.log("File compressed at: " + fileUri._fsPath + ".zip");
				}, (err: any) => {
					showMessage('⛔ We could not compress your file/folder: ' + err, MessageTypes.Warning);
				});
			} else { // FILE
				zl.archiveFile(fileUri._fsPath, fileUri._fsPath + ".zip").then(() => {
					console.log("File compressed at: " + fileUri._fsPath + ".zip");
				}, (err: any) => {
					showMessage('⛔ We could not compress your file/folder: ' + err, MessageTypes.Warning);
				});
			}
		} else {
			showMessage('⛔ File/folder path unespecified!', MessageTypes.Warning);
		}
		context.subscriptions.push(commandCompress);
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
