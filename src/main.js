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
 * OR if the user executes 'MinifyAll2OtherDocSelected' which is the 
 * command when you right-click at a file on the menu, it will do
 * the same job as 'MinifyAll2OtherDoc' (create a new file with the 
 * minified code so you can preserve the original file)
 * 
 * It also creates the status bar and calls all the necessary methods
 * to make the extension and all three commands perform well.
 * 
 * @author Jose Gracia Berenguer
 * @since 0.1.0
 * @see README.md
 * @link https://github.com/Josee9988/MinifyAll
 */

"use strict";

const {
	commands,
	window
} = require('vscode');
const FileSaver = require('fs');
const vscode = require('vscode');
const commentRemover = require('./utilities/commentRemover');
let originalFilepath, originalSize, statusBarItem, timeSpend, startTime, statusReady, oc, HexMinifier;

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
if (!hexDisabled) {
	HexMinifier = require('./utilities/hexMinifier.js');
}


/**
 * Summary main method that is executed when the user calls 
 * the commands 'MinifyAll', 'MinifyAll2OtherDoc' 
 * or 'MinifyAll2OtherDocSelected'.
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
 * from the menu.
 * 
 * @access public
 * 
 * @param {object} context information about VSCode. Ignore.
 */
function activate(context) {
	//Command MinifyAll. It executes if its called the command "extension.MinifyAll"
	const MinifyAll = commands.registerCommand('extension.MinifyAll', () => {
		console.log("The extension 'MinifyAll' with the command: 'MinifyAll' (default command) is currently working...");

		//It will trigger statusBarInfo when the user saves the document.
		vscode.commands.registerCommand('extension.MinifyAllStatus', statusBarInfo);
		vscode.workspace.onDidSaveTextDocument(() => getNewSize());

		let startTime = new Date().getTime();
		originalFilepath = vscode.window.activeTextEditor.document.fileName;
		originalSize = FileSaver.statSync(originalFilepath).size;
		statusReady = true;
		const {
			document
		} = window.activeTextEditor;

		switch (window.activeTextEditor.document.languageId) {
			case "css":
			case "scss":
			case "less":
			case "sass":

				if ((window.activeTextEditor.document.languageId == "css" && !disableCss) ||
					(window.activeTextEditor.document.languageId == "scss" && !disableScss) ||
					(window.activeTextEditor.document.languageId == "less" && !disableLess) ||
					(window.activeTextEditor.document.languageId == "sass" && !disableSass)) {

					const cssMinifier = require('./langDefaultMinifiers/cssMinifier.js');
					const cssContent = document.getText().split('\n');

					const RemoveComments = removeComments(cssContent);

					const hexMinifiedCss = HexMinify(RemoveComments);

					const minifierCss = new cssMinifier(hexMinifiedCss);

					const modifiedCssText = minifierCss.getCssMinified();

					replaceActualCode(modifiedCssText);
					timeSpend = ((new Date().getTime()) - startTime);

				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case "json":
			case "jsonc":

				if ((window.activeTextEditor.document.languageId == "json" && !disableJson) ||
					(window.activeTextEditor.document.languageId == "jsonc" && !disableJsonc)) {

					const jsonMinifier = require('./langDefaultMinifiers/jsonMinifier.js');
					const jsonContent = document.getText().split('\n');

					const contentWithHexMinified = HexMinify(jsonContent);

					const RemoveComments = removeComments(contentWithHexMinified);

					const minifierJson = new jsonMinifier(RemoveComments);

					const modifiedJsonText = minifierJson.getJSONMinified();

					replaceActualCode(modifiedJsonText);

					timeSpend = ((new Date().getTime()) - startTime);

				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case "html":

				if ((window.activeTextEditor.document.languageId == "html" && !disableHtml)) {

					const htmlMinifier = require('./langDefaultMinifiers/htmlMinifier.js');
					const htmlContent = document.getText().split('\n');

					const minifierHtml = new htmlMinifier(htmlContent);

					minifierHtml.removeMultipleLineComments();

					const modifiedHtmlText = minifierHtml.getHtmlMinified();

					replaceActualCode(modifiedHtmlText);

					timeSpend = ((new Date().getTime()) - startTime);
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case "javascript":
			case "javascriptreact":
			case "typescript":

				if ((window.activeTextEditor.document.languageId == "javascript" && !disableJavascript) ||
					(window.activeTextEditor.document.languageId == "javascriptreact" && !disableJavascriptReact) ||
					(window.activeTextEditor.document.languageId == "typescript" && !disableTypescript)) {

					const jsMinifier = require('./langDefaultMinifiers/jsMinifier.js');
					const jsContent = document.getText().split('\n');

					const RemoveComments = removeComments(jsContent);

					const minifierJs = new jsMinifier(RemoveComments);

					replaceActualCode(minifierJs.getJsMinified());

				} else {
					if (!disableMessages) {
						window.showInformationMessage('We will not format this file type because it is disabled.');
					}
				}
				break;
			default:
				showMessage('⛔ We can not format this file type yet, use a valid one.', true);
				break;
		}
		context.subscriptions.push(MinifyAll);
	});



	//**************************************************************************************************************
	//Command MinifyAll2OtherDoc and writes the result in other file.
	//It executes if its called the command "extension.MinifyAll2OtherDoc"
	const MinifyAll2OtherDoc = commands.registerCommand('extension.MinifyAll2OtherDoc', () => {
		console.log("The extension 'MinifyAll' with the command: 'MinifyAll2OtherDoc' (minify and get the code to another document) is currently working...");

		let startTime = new Date().getTime();

		const path = require('path');
		const {
			document
		} = window.activeTextEditor;

		const {
			fileName
		} = document;


		const filePath = path.dirname(fileName);

		switch (window.activeTextEditor.document.languageId) {

			case "css":
			case "scss":
			case "less":
			case "sass":

				if ((window.activeTextEditor.document.languageId == "css" && !disableCss) ||
					(window.activeTextEditor.document.languageId == "scss" && !disableScss) ||
					(window.activeTextEditor.document.languageId == "less" && !disableLess) ||
					(window.activeTextEditor.document.languageId == "sass" && !disableSass)) {

					const newName = path.basename(fileName).replace('.css', '-min.css');
					const path2NewFile = path.join(filePath, newName);
					const cssMinifier = require('./langDefaultMinifiers/cssMinifier.js');
					const cssContent = document.getText().split('\n');

					const RemoveComments = removeComments(cssContent);

					const hexMinifiedCss = HexMinify(RemoveComments);

					const minifierCss = new cssMinifier(hexMinifiedCss);

					const modifiedCssText = minifierCss.getCssMinified();

					minifiedTextToNewFile(path2NewFile, modifiedCssText);

					timeSpend = ((new Date().getTime()) - startTime);
					console.log("Time spend minifying: " + timeSpend + " milisenconds.");
				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case "json":
			case "jsonc":

				if ((window.activeTextEditor.document.languageId == "json" && !disableJson) ||
					(window.activeTextEditor.document.languageId == "jsonc" && !disableJsonc)) {

					const newNameJson = path.basename(fileName).replace('.json', '-min.json');
					const path2NewFileJson = path.join(filePath, newNameJson);
					const jsonMinifier = require('./langDefaultMinifiers/jsonMinifier.js');
					const jsonContent = document.getText().split('\n');

					const contentWithHexMinified = HexMinify(jsonContent);

					const RemoveComments = removeComments(contentWithHexMinified);

					const minifierJson = new jsonMinifier(RemoveComments);

					const modifiedJsonText = minifierJson.getJSONMinified();

					minifiedTextToNewFile(path2NewFileJson, modifiedJsonText);

					timeSpend = ((new Date().getTime()) - startTime);
					console.log("Time spend minifying: " + timeSpend + " milisenconds.");

				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case "html":

				if ((window.activeTextEditor.document.languageId == "html" && !disableHtml)) {

					const newNameHtml = path.basename(fileName).replace('.html', '-min.html');
					const path2NewFileHtml = path.join(filePath, newNameHtml);
					const htmlMinifier = require('./langDefaultMinifiers/htmlMinifier.js');
					const htmlContent = document.getText().split('\n');

					const minifierHtml = new htmlMinifier(htmlContent);

					minifierHtml.removeMultipleLineComments();

					const modifiedHtmlText = minifierHtml.getHtmlMinified();

					minifiedTextToNewFile(path2NewFileHtml, modifiedHtmlText);

					timeSpend = ((new Date().getTime()) - startTime);
					console.log("Time spend minifying: " + timeSpend + " milisenconds.");

				} else {
					showMessage('We will not format this file type because it is disabled.', false);
				}
				break;

			case "javascript":
			case "javascriptreact":
			case "typescript":

				if ((window.activeTextEditor.document.languageId == "javascript" && !disableJavascript) ||
					(window.activeTextEditor.document.languageId == "javascriptreact" && !disableJavascriptReact) ||
					(window.activeTextEditor.document.languageId == "typescript" && !disableTypescript)) {

					const newNameJs = path.basename(fileName).replace('.js', '-min.js');
					const path2NewFileJs = path.join(filePath, newNameJs);
					const jsMinifier = require('./langDefaultMinifiers/jsMinifier.js');
					const jsContent = document.getText().split('\n');

					const RemoveComments = removeComments(jsContent);

					const minifierJs = new jsMinifier(RemoveComments);

					minifiedTextToNewFile(path2NewFileJs, minifierJs.getJsMinified());

					timeSpend = ((new Date().getTime()) - startTime);
					console.log("Time spend minifying: " + timeSpend + " milisenconds.");

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


	//**************************************************************************************************************
	//Command MinifyAll2OtherDocSelected and writes the result in other file.
	//It executes if its called the command "extension.MinifyAll2OtherDocSelected"
	let MinifyAll2OtherDocSelected = commands.registerCommand('extension.MinifyAll2OtherDocSelected', async (fileUri) => {
		//We get the text from the selected file.
		FileSaver.readFile(fileUri.path, 'utf8', (err, data) => {
			if (err) {
				throw err;
			} else {
				console.log("The extension 'MinifyAll' with the command: 'MinifyAll2OtherDocSelected' (minify and get the code to another document) is currently working...");
				let startTime = new Date().getTime();

				const path = require('path');

				const filePath = path.dirname(fileUri.path);

				switch (fileUri.path.split('.').pop()) {

					case "css":
					case "scss":
					case "less":
					case "sass":

						if ((fileUri.path.split('.').pop() == "css" && !disableCss) ||
							(fileUri.path.split('.').pop() == "scss" && !disableScss) ||
							(fileUri.path.split('.').pop() == "less" && !disableLess) ||
							(fileUri.path.split('.').pop() == "sass" && !disableSass)) {

							const newName = path.basename(fileUri.path).replace('.css', '-min.css');
							const path2NewFile = path.join(filePath, newName);
							const cssMinifier = require('./langDefaultMinifiers/cssMinifier.js');
							const cssContent = data.split('\n');

							const RemoveComments = removeComments(cssContent);

							const hexMinifiedCss = HexMinify(RemoveComments);

							const minifierCss = new cssMinifier(hexMinifiedCss);

							const modifiedCssText = minifierCss.getCssMinified();

							minifiedTextToNewFile(path2NewFile, modifiedCssText);

							timeSpend = ((new Date().getTime()) - startTime);
							console.log("Time spend minifying: " + timeSpend + " milisenconds.");
						} else {
							showMessage('We will not format this file type because it is disabled.', false);
						}
						break;

					case "json":
					case "jsonc":

						if ((fileUri.path.split('.').pop() == "json" && !disableJson) ||
							(fileUri.path.split('.').pop() == "jsonc" && !disableJsonc)) {

							const newNameJson = path.basename(fileUri.path).replace('.json', '-min.json');
							const path2NewFileJson = path.join(filePath, newNameJson);
							const jsonMinifier = require('./langDefaultMinifiers/jsonMinifier.js');
							const jsonContent = data.split('\n');

							const contentWithHexMinified = HexMinify(jsonContent);

							const RemoveComments = removeComments(contentWithHexMinified);

							const minifierJson = new jsonMinifier(RemoveComments);

							const modifiedJsonText = minifierJson.getJSONMinified();

							minifiedTextToNewFile(path2NewFileJson, modifiedJsonText);

							timeSpend = ((new Date().getTime()) - startTime);
							console.log("Time spend minifying: " + timeSpend + " milisenconds.");

						} else {
							showMessage('We will not format this file type because it is disabled.', false);
						}
						break;

					case "html":

						if ((fileUri.path.split('.').pop() == "html" && !disableHtml)) {

							const newNameHtml = path.basename(fileUri.path).replace('.html', '-min.html');
							const path2NewFileHtml = path.join(filePath, newNameHtml);
							const htmlMinifier = require('./langDefaultMinifiers/htmlMinifier.js');
							const htmlContent = data.split('\n');

							const minifierHtml = new htmlMinifier(htmlContent);

							minifierHtml.removeMultipleLineComments();

							const modifiedHtmlText = minifierHtml.getHtmlMinified();

							minifiedTextToNewFile(path2NewFileHtml, modifiedHtmlText);

							timeSpend = ((new Date().getTime()) - startTime);
							console.log("Time spend minifying: " + timeSpend + " milisenconds.");

						} else {
							showMessage('We will not format this file type because it is disabled.', false);
						}
						break;

					case "javascript":
					case "javascriptreact":
					case "typescript":

						if ((fileUri.path.split('.').pop() == "javascript" && !disableJavascript) ||
							(fileUri.path.split('.').pop() == "javascriptreact" && !disableJavascriptReact) ||
							(fileUri.path.split('.').pop() == "typescript" && !disableTypescript)) {

							const newNameJs = path.basename(fileUri.path).replace('.js', '-min.js');
							const path2NewFileJs = path.join(filePath, newNameJs);
							const jsMinifier = require('./langDefaultMinifiers/jsMinifier.js');
							const jsContent = data.split('\n');

							const RemoveComments = removeComments(jsContent);

							const minifierJs = new jsMinifier(RemoveComments);

							minifiedTextToNewFile(path2NewFileJs, minifierJs.getJsMinified());

							timeSpend = ((new Date().getTime()) - startTime);
							console.log("Time spend minifying: " + timeSpend + " milisenconds.");

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
		context.subscriptions.push(MinifyAll2OtherDocSelected);
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
 * @param {number} originalSize the non minified size in Bytes.
 * @param {number} newSize the minified size in Bytes.
 */
function createStatusBar(originalSize, newSize) {
	if (alignment == "Right") {
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, priority);
	} else {
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, priority);
	}
	statusBarItem.tooltip = 'New file size, click for more info!';
	statusBarItem.command = 'extension.MinifyAllStatus';
	statusBarItem.text = transformSize(originalSize) + " --> " + transformSize(newSize);
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
 * @param {number} size A number with the bytes.
 * 
 * @return {String} the new value in KB, MB or in Bytes 
 */
function transformSize(size) {
	if (size >= 1048576) return `${Math.floor(size / 10485.76) / 100} MB`;
	else if (size >= 1024) return `${Math.floor(size / 10.24) / 100} KB`;
	else return `${size} B`;
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
	oc.appendLine("╔══════════════════════════════╗");
	oc.appendLine("║      Extension MinifyAll     ║	");
	oc.appendLine("╠═══════════════════╦══════════╣");
	oc.appendLine("║ Original size     ║ " + transformSize(originalSize) + " ║");
	oc.appendLine("╠═══════════════════╬══════════║");
	oc.appendLine("║ New minified size ║ " + transformSize(FileSaver.statSync(vscode.window.activeTextEditor.document.fileName).size) + " ║");
	oc.appendLine("╚═══════════════════╩══════════╝");
	oc.appendLine("File path:  \t\t" + window.activeTextEditor.document.fileName);
	oc.appendLine("File type:  \t\t" + window.activeTextEditor.document.languageId);
	oc.appendLine("% of shrink:\t\t" + (100 - ((FileSaver.statSync(vscode.window.activeTextEditor.document.fileName).size * 100) / originalSize)).toFixed(3) + "%");
	oc.appendLine("Bytes freed:\t\t" + (originalSize - (FileSaver.statSync(vscode.window.activeTextEditor.document.fileName).size)) + "B");
	oc.appendLine("Time spend: \t\t" + timeSpend + " milisenconds. (" + timeSpend / 1000 + " seconds).");
	oc.show();
}

/**
 * Summary minifies hexadecimal code if enabled.
 * 
 * Description receives an array with all the content, 
 * and minifies it's hexadecimal, rgb and rgba values;
 * then return the new array; 
 * If it is enabled it will initialize the HexMinifier
 * class and it will make all the processes and return
 * the new array of values OR it will simply return the
 * received value and do nothing.
 * 
 * @access private
 * 
 * @param {Array} Content Array with all the lines to be hexMinified.
 * 
 * @return {Array} with the colors minified.
 */
function HexMinify(Content) {
	let MinifierHex, returnValue;

	if (!hexDisabled) {
		MinifierHex = new HexMinifier(Content);
		//Minifier methods
		MinifierHex.shortHexMain();
		MinifierHex.shortRGBMain();
		MinifierHex.shortRGBAMain();
		returnValue = MinifierHex.getHexMinified();
	} else {
		returnValue = Content;
	}
	return returnValue;
}

/**
 * Summary gets the actual code and replaces it with the minified one.
 * 
 * Description it receives the minified text and replaces it with the
 * received text.
 * 
 * @access private
 * 
 * @param {String} modifiedText the text to replace the original code.
 */
function replaceActualCode(modifiedText) {
	const editor = vscode.window.activeTextEditor;
	const firstLineCss = editor.document.lineAt(0);
	const lastLineCss = editor.document.lineAt(editor.document.lineCount - 1);
	const textRange = new vscode.Range(0,
		firstLineCss.range.start.character,
		editor.document.lineCount - 1,
		lastLineCss.range.end.character);
	editor.edit(builder => {
		builder.replace(textRange, modifiedText);
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
 */
function minifiedTextToNewFile(path2NewFile, modifiedText) {
	FileSaver.writeFile(path2NewFile, modifiedText, () => {
		if (!disableMessages) {
			window.showInformationMessage(`The minified file has been saved in: ${path2NewFile}`);
		}
		vscode.workspace.openTextDocument(path2NewFile).then(doc => {
			vscode.window.showTextDocument(doc);
		});
	});
}

/**
 * Summary it removes the comments from a class.
 * 
 * Description removeComments receives an array with the content 
 * and removes single line and multiple line comments (//)(/* * /)
 * by calling the class removeComments and calling the method
 * removeCommentsMain, Then gets the result with getLineRemoved.
 * 
 * @access private
 * @param {Array} content All the content to remove the comments
 */
function removeComments(content) {
	let RemoveComments = new commentRemover(content);
	RemoveComments.removeCommentsMain();
	return RemoveComments.getCommentsRemoved();
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
	} else {
		if (!disableMessages) {
			window.showInformationMessage(text);
		}
	}
}


exports.activate = activate;

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
exports.deactivate = deactivate;