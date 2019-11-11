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


const {
	commands,
	window,
} = require('vscode');
const FileSaver = require('fs');
const vscode = require('vscode');
const commentRemover = require('./utilities/commentRemover');
const globalMinify = require('./utilities/globalMinifiers');

let originalFilepath;
let originalSize;
let statusBarItem;
let timeSpend;
let startTime;
let statusReady;
let oc;


// Getting user configuration.
const userMinifyAllSettings = vscode.workspace.getConfiguration('MinifyAll');
const hexDisabled = userMinifyAllSettings.get('disableHexadecimalShortener');
const statusDisabled = userMinifyAllSettings.get('disableStatusbarInformation');
const priority = userMinifyAllSettings.get('statusbarPriority');
const alignment = userMinifyAllSettings.get('statusbarAlignment');
const disableHtml = userMinifyAllSettings.get('disableHtml');
const disableCss = userMinifyAllSettings.get('disableCss');
const disableScss = userMinifyAllSettings.get('disableScss');
const disableLess = userMinifyAllSettings.get('disableLess');
const disableSass = userMinifyAllSettings.get('disableSass');
const disableJson = userMinifyAllSettings.get('disableJson');
const disableJsonc = userMinifyAllSettings.get('disableJsonc');
const disableMessages = userMinifyAllSettings.get('disableMessages');
const minifyOnSave = userMinifyAllSettings.get('minifyOnSave');
const minifyOnSaveToNewFile = userMinifyAllSettings.get('minifyOnSaveToNewFIle');
const disableJavascript = userMinifyAllSettings.get('disableJavascript');
const disableJavascriptReact = userMinifyAllSettings.get('disableJavascriptReact');
const disableTypescript = userMinifyAllSettings.get('disableTypescript');


// If the user has selected to minify its code when saving.
if (minifyOnSave) {
	vscode.workspace.onDidSaveTextDocument(() => commands.executeCommand('extension.MinifyAll'));
}

if (minifyOnSaveToNewFile) {
	vscode.workspace.onDidSaveTextDocument(() => commands.executeCommand('extension.MinifyAll2OtherDoc'));
}

// If the user has hexadecimal shortener enabled it will import it.
const HexMinifier = !hexDisabled ? require('./utilities/hexMinifier.js') : null;

// If the user has the statusBar output enabled it will register the command.
if (!statusDisabled) {
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
		console.log("The extension 'MinifyAll' with the command: 'MinifyAll' (default command) is currently working...");

		vscode.workspace.onDidSaveTextDocument(() => getNewSize());

		startTime = new Date().getTime();
		originalFilepath = vscode.window.activeTextEditor.document.fileName;
		originalSize = FileSaver.statSync(originalFilepath).size;
		statusReady = true;
		const {
			document,
		} = window.activeTextEditor;

		switch (window.activeTextEditor.document.languageId) {
			case 'css':
			case 'scss':
			case 'less':
			case 'sass':

				if ((window.activeTextEditor.document.languageId === 'css' && !disableCss) ||
					(window.activeTextEditor.document.languageId === 'scss' && !disableScss) ||
					(window.activeTextEditor.document.languageId === 'less' && !disableLess) ||
					(window.activeTextEditor.document.languageId === 'sass' && !disableSass)) {
					const modifiedCssText = globalMinifiers.minifyCssScssLessSass(document.getText().split('\n'));

					timeSpend = replaceActualCodeAndGetTime(modifiedCssText);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'json':
			case 'jsonc':

				if ((window.activeTextEditor.document.languageId === 'json' && !disableJson) ||
					(window.activeTextEditor.document.languageId === 'jsonc' && !disableJsonc)) {
					const modifiedJsonText = globalMinifiers.minifyJsonJsonc(document.getText().split('\n'));

					timeSpend = replaceActualCodeAndGetTime(modifiedJsonText);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'html':
			case 'php':

				if ((window.activeTextEditor.document.languageId === 'html' && !disableHtml) ||
					(window.activeTextEditor.document.languageId === 'php')) {
					const modifiedHtmlText = globalMinifiers.minifyHtml(document.getText().split('\n'));

					timeSpend = replaceActualCodeAndGetTime(modifiedHtmlText);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'javascript':
			case 'javascriptreact':
			case 'typescript':

				if ((window.activeTextEditor.document.languageId === 'javascript' && !disableJavascript) ||
					(window.activeTextEditor.document.languageId === 'javascriptreact' && !disableJavascriptReact) ||
					(window.activeTextEditor.document.languageId === 'typescript' && !disableTypescript)) {
					const Terser = require('terser');

					const jsContent = document.getText();

					const minifierJs = Terser.minify(jsContent);

					if (minifierJs.error === undefined) {
						timeSpend = replaceActualCodeAndGetTime(minifierJs.code);
					} else if (!disableMessages) {
						showMessage(`Terser error: ${minifierJs.error}`, false);
					}
				} else if (!disableMessages) {
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
		console.log("The extension 'MinifyAll' with the command: 'MinifyAll2OtherDoc' (minify and get the code to another document) is currently working...");

		startTime = new Date().getTime();

		const path = require('path');
		const {
			document,
		} = window.activeTextEditor;

		const {
			fileName,
		} = document;

		switch (window.activeTextEditor.document.languageId) {
			case 'css':
			case 'scss':
			case 'less':
			case 'sass':

				if ((window.activeTextEditor.document.languageId === 'css' && !disableCss) ||
					(window.activeTextEditor.document.languageId === 'scss' && !disableScss) ||
					(window.activeTextEditor.document.languageId === 'less' && !disableLess) ||
					(window.activeTextEditor.document.languageId === 'sass' && !disableSass)) {
					const path2NewFile = getNewFilePath(path,
						fileName, window.activeTextEditor.document.languageId);

					const modifiedCssText = globalMinifiers.minifyCssScssLessSass(document.getText().split('\n'));

					minifiedTextToNewFile(path2NewFile, modifiedCssText);

					console.log(`Time spend minifying: ${(new Date().getTime()) - startTime} milisenconds.`);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'json':
			case 'jsonc':

				if ((window.activeTextEditor.document.languageId === 'json' && !disableJson) ||
					(window.activeTextEditor.document.languageId === 'jsonc' && !disableJsonc)) {
					const path2NewFile = getNewFilePath(path, fileName, 'json');

					const modifiedJsonText = globalMinifiers.minifyJsonJsonc(document.getText().split('\n'));

					minifiedTextToNewFile(path2NewFile, modifiedJsonText);

					console.log(`Time spend minifying: ${(new Date().getTime()) - startTime} milisenconds.`);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'html':
			case 'php':

				if ((window.activeTextEditor.document.languageId === 'html' && !disableHtml) ||
					(window.activeTextEditor.document.languageId === 'php')) {
					const path2NewFile = getNewFilePath(path,
						fileName, window.activeTextEditor.document.languageId);

					const modifiedHtmlText = globalMinifiers.minifyHtml(document.getText().split('\n'));

					minifiedTextToNewFile(path2NewFile, modifiedHtmlText);

					console.log(`Time spend minifying: ${(new Date().getTime()) - startTime} milisenconds.`);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'javascript':
			case 'javascriptreact':
			case 'typescript':

				if ((window.activeTextEditor.document.languageId === 'javascript' && !disableJavascript) ||
					(window.activeTextEditor.document.languageId === 'javascriptreact' && !disableJavascriptReact) ||
					(window.activeTextEditor.document.languageId === 'typescript' && !disableTypescript)) {
					const path2NewFile = getNewFilePath(path, fileName, 'js');
					const Terser = require('terser');
					const jsContent = document.getText();

					const minifierJs = Terser.minify(jsContent);

					if (minifierJs.error === undefined) {
						minifiedTextToNewFile(path2NewFile, minifierJs.code);
						console.log(`Time spend minifying: ${(new Date().getTime()) - startTime} milisenconds.`);
					} else if (!disableMessages) {
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
	const MinifyAll2OtherDocSelected = commands.registerCommand('extension.MinifyAll2OtherDocSelected', async (fileUri) => {
		if (fileUri !== undefined) {
			// We get the text from the selected file.
			FileSaver.readFile(fileUri.path, 'utf8', (err, data) => {
				if (err) {
					throw err;
				} else {
					console.log("The extension 'MinifyAll' with the command: 'MinifyAll2OtherDocSelected' (minify and get the code to another document) is currently working...");
					startTime = new Date().getTime();

					const path = require('path');

					const filePath = path.dirname(fileUri.path);

					switch (fileUri.path.split('.').pop()) {
						case 'css':
						case 'scss':
						case 'less':
						case 'sass':

							if ((fileUri.path.split('.').pop() === 'css' && !disableCss) ||
								(fileUri.path.split('.').pop() === 'scss' && !disableScss) ||
								(fileUri.path.split('.').pop() === 'less' && !disableLess) ||
								(fileUri.path.split('.').pop() === 'sass' && !disableSass)) {
								const newName = path.basename(fileUri.path).replace('.css', '-min.css');
								const path2NewFile = path.join(filePath, newName);
								const modifiedCssText = globalMinifiers.minifyCssScssLessSass(data.split('\n'));

								minifiedTextToNewFile(path2NewFile, modifiedCssText);

								console.log(`Time spend minifying: ${(new Date().getTime()) - startTime} milisenconds.`);
							} else {
								showMessage('We will not format this file type because it is disabled.', false);
							}
							break;

						case 'json':
						case 'jsonc':

							if ((fileUri.path.split('.').pop() === 'json' && !disableJson) ||
								(fileUri.path.split('.').pop() === 'jsonc' && !disableJsonc)) {
								const newNameJson = path.basename(fileUri.path).replace('.json', '-min.json');
								const path2NewFileJson = path.join(filePath, newNameJson);
								const modifiedJsonText = globalMinifiers.minifyJsonJsonc(data.split('\n'));

								minifiedTextToNewFile(path2NewFileJson, modifiedJsonText);

								console.log(`Time spend minifying: ${(new Date().getTime()) - startTime} milisenconds.`);
							} else {
								showMessage('We will not format this file type because it is disabled.', false);
							}
							break;

						case 'html':
						case 'php':

							if ((fileUri.path.split('.').pop() === 'html' && !disableHtml) ||
								(fileUri.path.split('.').pop() === 'php')) {
								const newNameHtml = path.basename(fileUri.path).replace('.html', '-min.html');
								const path2NewFileHtml = path.join(filePath, newNameHtml);

								const modifiedHtmlText = globalMinifiers.minifyHtml(data.split('\n'));

								minifiedTextToNewFile(path2NewFileHtml, modifiedHtmlText);

								console.log(`Time spend minifying: ${(new Date().getTime()) - startTime} milisenconds.`);
							} else {
								showMessage('We will not format this file type because it is disabled.', false);
							}
							break;

						case 'javascript':
						case 'javascriptreact':
						case 'typescript':

							if ((fileUri.path.split('.').pop() === 'javascript' && !disableJavascript) ||
								(fileUri.path.split('.').pop() === 'javascriptreact' && !disableJavascriptReact) ||
								(fileUri.path.split('.').pop() === 'typescript' && !disableTypescript)) {
								const Terser = require('terser');
								const newNameJs = path.basename(fileUri.path).replace('.js', '-min.js');
								const path2NewFileJs = path.join(filePath, newNameJs);
								const jsContent = data;

								const minifierJs = Terser.minify(jsContent);

								if (minifierJs.error === undefined) {
									minifiedTextToNewFile(path2NewFileJs, minifierJs.code);
									console.log(`Time spend minifying: ${(new Date().getTime()) - startTime} milisenconds.`);
								} else if (!disableMessages) {
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
	const MinifyAllSelectedText = commands.registerCommand('extension.MinifyAllSelectedText', () => {
		console.log("The extension 'MinifyAll' with the command: 'MinifyAllSelectedText' is currently working...");

		const editor = vscode.window.activeTextEditor;
		const {
			selection,
		} = editor;
		const selectedText = editor.document.getText(selection);
		startTime = new Date().getTime();
		statusReady = true;

		switch (window.activeTextEditor.document.languageId) {
			case 'css':
			case 'scss':
			case 'less':
			case 'sass':

				if ((window.activeTextEditor.document.languageId === 'css' && !disableCss) ||
					(window.activeTextEditor.document.languageId === 'scss' && !disableScss) ||
					(window.activeTextEditor.document.languageId === 'less' && !disableLess) ||
					(window.activeTextEditor.document.languageId === 'sass' && !disableSass)) {
					const modifiedCssText = globalMinifiers.minifyCssScssLessSass(selectedText.split('\n'));

					timeSpend = replaceSelectedCodeAndGetTime(editor, selection, modifiedCssText);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'json':
			case 'jsonc':

				if ((window.activeTextEditor.document.languageId === 'json' && !disableJson) ||
					(window.activeTextEditor.document.languageId === 'jsonc' && !disableJsonc)) {
					const modifiedJsonText = globalMinifiers.minifyJsonJsonc(selectedText.split('\n'));

					timeSpend = replaceSelectedCodeAndGetTime(editor, selection, modifiedJsonText);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'html':
			case 'php':

				if ((window.activeTextEditor.document.languageId === 'html' && !disableHtml) ||
					(window.activeTextEditor.document.languageId === 'php')) {
					const modifiedHtmlText = globalMinifiers.minifyHtml(selectedText.split('\n'));

					timeSpend = replaceSelectedCodeAndGetTime(editor, selection, modifiedHtmlText);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case 'javascript':
			case 'javascriptreact':
			case 'typescript':

				if ((window.activeTextEditor.document.languageId === 'javascript' && !disableJavascript) ||
					(window.activeTextEditor.document.languageId === 'javascriptreact' && !disableJavascriptReact) ||
					(window.activeTextEditor.document.languageId === 'typescript' && !disableTypescript)) {
					const Terser = require('terser');

					const jsContent = selectedText;

					const minifierJs = Terser.minify(jsContent);

					if (minifierJs.error === undefined) {
						timeSpend = replaceSelectedCodeAndGetTime(editor, selection, minifierJs.code);
					} else if (!disableMessages) {
						showMessage(`Terser error: ${minifierJs.error}`, false);
					}
				} else if (!disableMessages) {
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
		if (!statusDisabled) {
			createStatusBar(originalSize, newSize);
			vscode.workspace.onDidChangeConfiguration(() => statusBarItem.hide());
			vscode.workspace.onDidChangeWorkspaceFolders(() => statusBarItem.hide());
			vscode.workspace.onDidCloseTextDocument(() => statusBarItem.hide());
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
	if (alignment === 'Right') {
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, priority);
	} else {
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, priority);
	}
	statusBarItem.tooltip = 'New file size, click for more info!';
	statusBarItem.command = 'extension.MinifyAllStatus';
	statusBarItem.text = `${transformSize(originalSizeB)} --> ${transformSize(newSize)}`;
	statusBarItem.show();
	vscode.workspace.onDidChangeConfiguration(() => statusBarItem.hide());
	vscode.workspace.onDidChangeWorkspaceFolders(() => statusBarItem.hide());
	vscode.workspace.onDidCloseTextDocument(() => statusBarItem.hide());
	statusReady = false;
}

/**
 * Summary receives an int (number of bytes) and
 * transform its value to KB, OR MB.
 *
 * Description it receives a size in Bytes and it will return a String
 * with the number of Bytes, KiloBytes or MegaBytes + 'B' or 'KB' or 'MB'.
 *
 * @access private
 *
 * @param {number} size A number in bytes.
 *
 * @return {String} the new value in KB, MB or in Bytes
 */
function transformSize(size) {
	if (size >= 1048576) return `${Math.floor(size / 10485.76) / 100} Mb`;
	if (size >= 1024) return `${Math.floor(size / 10.24) / 100} Kb`;
	return `${size} b`;
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
	oc = window.createOutputChannel('Minify output');
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
	oc.appendLine(`Time spend: \t\t${timeSpend} milisenconds. (${timeSpend / 1000} seconds).`);
	oc.show();
}


/**
 * Summary gets the actual code and replaces it with the minified one.
 *
 * Description it receives the minified text and replaces it with the
 * received text and also it gets the total time spend minifying.
 *
 * @access private
 *
 * @param {String} modifiedText the text to replace the original code.
 * @return {Number} of the time spend.
 */
function replaceActualCodeAndGetTime(modifiedText) {
	const editor = vscode.window.activeTextEditor;
	const firstLineCss = editor.document.lineAt(0);
	const lastLineCss = editor.document.lineAt(editor.document.lineCount - 1);
	const textRange = new vscode.Range(0,
		firstLineCss.range.start.character,
		editor.document.lineCount - 1,
		lastLineCss.range.end.character);
	editor.edit((builder) => {
		builder.replace(textRange, modifiedText);
	});
	return ((new Date().getTime()) - startTime);
}

/**
 * Summary gets the selected code and replaces it with the minified one.
 *
 * Description it receives the minified text and replaces it with the
 * received text and also it gets the total time spend minifying.
 *
 * @access private
 * @param {object} editor openned editor
 * @param {object} selection selection provided.
 * @param {string} modifiedText the minified text
 *
 * @return {Number} of the time spend.
 */
function replaceSelectedCodeAndGetTime(editor, selection, modifiedText) {
	const receivedEditor = editor;
	receivedEditor.edit((builder) => {
			builder.replace(selection, modifiedText);
		})
		.then(() => {
			const postion = editor.selection.end;
			receivedEditor.selection = new vscode.Selection(postion, postion);
		});
	return ((new Date().getTime()) - startTime);
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
 */
function minifiedTextToNewFile(path2NewFile, modifiedText) {
	FileSaver.writeFile(path2NewFile, modifiedText, () => {
		if (!disableMessages) {
			showMessage(`The minified file has been saved in: ${path2NewFile}`, false);
		}
		vscode.workspace.openTextDocument(path2NewFile).then((doc) => {
			vscode.window.showTextDocument(doc);
		});
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
 */
function showMessage(text, warning) {
	if (warning) {
		if (!disableMessages) {
			window.showWarningMessage(text);
		}
	} else if (!disableMessages) {
		window.showInformationMessage(text);
	}
}


/**
 * Summary sets the path to the new file with minified code.
 *
 * Description receives the object path, the absolute path
 * and the name of the extension without a dot, then it creates
 * the new path to the new file with the minified text.
 *
 * @param {*} path the object path imported from vscode.
 * @param {*} fileName the Full path with the name and extension to the current
 * file (the non minified one).
 * @param {*} extensionWithOutDot the name of the extension (css, js, html).
 * @return {String} path2NewFile the path to the new file which will have
 * the minified code.
 */
function getNewFilePath(path, fileName, extensionWithOutDot) {
	const filePath = path.dirname(fileName);
	const newName = path.basename(fileName).replace(`.${extensionWithOutDot}`, `-min.${extensionWithOutDot}`);
	const path2NewFile = path.join(filePath, newName);
	return path2NewFile;
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
	statusBarItem.dispose();
	oc.dispose();
}
exports.activate = activate;
exports.deactivate = deactivate;
// Exports for tests.
exports.getNewFilePath = getNewFilePath;
exports.transformSize = transformSize;
