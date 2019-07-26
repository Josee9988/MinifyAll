/**
 * @file That is executed when the command extension.MinifyAll is used.
 * it checks what language are you using in your document and if its
 * supported it will remove all your code and replace it with a 
 * minified version of the code. If you execute MinifyAll2OtherDoc
 * it will create a new file with the minified code.
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
const HexMinifier = require('./src/hexMinifier');
const LineRemover = require('./src/lineRemover');
let originalFilepath = vscode.window.activeTextEditor.document.fileName;
let originalSize = FileSaver.statSync(originalFilepath).size;

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


let statusBarItem, timeSpend, startTime, statusReady, oc;
vscode.commands.registerCommand('extension.MinifyAllStatus', statusBarInfo);
vscode.workspace.onDidSaveTextDocument(() => getNewSize());
if (alignment == "Right") {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, priority);
} else {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, priority);
}


/**
 * activate Main function called when the user
 * uses the command 'MinifyAll' or 'MinifyAll2OtherDoc'
 * @param {object} context 
 */
function activate(context) {
	//Command MinifyAll default one.
	const disposable = commands.registerCommand('extension.MinifyAll', () => {
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

				if ((window.activeTextEditor.document.languageId == "css" && disableCss == false) ||
					(window.activeTextEditor.document.languageId == "scss" && disableScss == false) ||
					(window.activeTextEditor.document.languageId == "less" && disableLess == false) ||
					(window.activeTextEditor.document.languageId == "sass" && disableSass == false)) {

					const editorCss = vscode.window.activeTextEditor;
					const firstLineCss = editorCss.document.lineAt(0);
					const lastLineCss = editorCss.document.lineAt(editorCss.document.lineCount - 1);
					const textRangeCss = new vscode.Range(0,
						firstLineCss.range.start.character,
						editorCss.document.lineCount - 1,
						lastLineCss.range.end.character);

					const cssMinifier = require('./src/cssMinifier.js');
					const cssContent = document.getText().split('\n');
					const RemoverLine4Css = new LineRemover(cssContent);
					RemoverLine4Css.removeMultipleLineComments();
					RemoverLine4Css.removeSingleLineComments();
					const MinifierHex4Css = new HexMinifier(RemoverLine4Css.getLineRemoved());

					if (hexDisabled == false) {
						//Minifier processes
						MinifierHex4Css.shortHexMain();
						MinifierHex4Css.shortRGBMain();
						MinifierHex4Css.shortRGBAMain();
					}

					const minifiercss = new cssMinifier(MinifierHex4Css.getHexMinified());

					//Get the minified code and replace it
					const modifiedCssText = minifiercss.getCssMinified();
					editorCss.edit(builder => {
						builder.replace(textRangeCss, modifiedCssText);
					});
					timeSpend = ((new Date().getTime()) - startTime);

				} else {
					if (!disableMessages) {
						window.showInformationMessage('We will not format this file type because you disabled it.');
					}
				}

				break;

			case "json":
			case "jsonc":

				if ((window.activeTextEditor.document.languageId == "json" && disableJson == false) ||
					(window.activeTextEditor.document.languageId == "jsonc" && disableJsonc == false)) {

					const editorJson = vscode.window.activeTextEditor;
					const firstLineJson = editorJson.document.lineAt(0);
					const lastLineJson = editorJson.document.lineAt(editorJson.document.lineCount - 1);
					const textRangeJson = new vscode.Range(0,
						firstLineJson.range.start.character,
						editorJson.document.lineCount - 1,
						lastLineJson.range.end.character);

					const jsonMinifier = require('./src/jsonMinifier.js');
					const jsonContent = document.getText().split('\n');
					const MinifierHex4Json = new HexMinifier(jsonContent);

					if (hexDisabled == false) {
						//Minifier processes
						MinifierHex4Json.shortHexMain();
						MinifierHex4Json.shortRGBMain();
						MinifierHex4Json.shortRGBAMain();
					}

					const RemoverLine4Json = new LineRemover(MinifierHex4Json.getHexMinified());

					RemoverLine4Json.removeMultipleLineComments();
					RemoverLine4Json.removeSingleLineComments();

					const minifierjson = new jsonMinifier(RemoverLine4Json.getLineRemoved());

					//Get the minified code and replace it
					const modifiedJsonText = minifierjson.getJSONMinified();

					editorJson.edit(builder => {
						builder.replace(textRangeJson, modifiedJsonText);
					});
					timeSpend = ((new Date().getTime()) - startTime);

				} else {
					if (!disableMessages) {
						window.showInformationMessage('We will not format this file type because you disabled it.');
					}
				}

				break;

			case "html":

				if ((window.activeTextEditor.document.languageId == "html" && disableHtml == false)) {

					const editorHtml = vscode.window.activeTextEditor;
					const firstLineHtml = editorHtml.document.lineAt(0);
					const lastLineHtml = editorHtml.document.lineAt(editorHtml.document.lineCount - 1);
					const textRangeHtml = new vscode.Range(0,
						firstLineHtml.range.start.character,
						editorHtml.document.lineCount - 1,
						lastLineHtml.range.end.character);

					const htmlMinifier = require('./src/htmlMinifier.js');
					const htmlContent = document.getText().split('\n');
					const minifierhtml = new htmlMinifier(htmlContent);
					minifierhtml.removeMultipleLineComments();
					//Get the minified code and replace it
					const modifiedHtmlText = minifierhtml.gethtmlMinified();

					editorHtml.edit(builder => {
						builder.replace(textRangeHtml, modifiedHtmlText);
					});
					timeSpend = ((new Date().getTime()) - startTime);

				} else {
					if (!disableMessages) {
						window.showInformationMessage('We will not format this file type because you disabled it.');
					}
				}

				break;

			default:
				if (!disableMessages) {
					window.showErrorMessage('⛔ We can not format this file type yet, use a valid one.');
				}
				break;
		}
		context.subscriptions.push(disposable);

	});

	//-----------------------------------------------------------------------------
	//Command MinifyAll and writes the result in other file.
	const disposable2 = commands.registerCommand('extension.MinifyAll2OtherDoc', () => {
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

				if ((window.activeTextEditor.document.languageId == "css" && disableCss == false) ||
					(window.activeTextEditor.document.languageId == "scss" && disableScss == false) ||
					(window.activeTextEditor.document.languageId == "less" && disableLess == false) ||
					(window.activeTextEditor.document.languageId == "sass" && disableSass == false)) {

					const newName = path.basename(fileName).replace('.css', '-min.css');
					const path2NewFile = path.join(filePath, newName);
					const cssMinifier = require('./src/cssMinifier.js');
					const cssContent = document.getText().split('\n');
					const RemoverLine4Css = new LineRemover(cssContent);

					RemoverLine4Css.removeMultipleLineComments();
					RemoverLine4Css.removeSingleLineComments();

					const MinifierHex4Css = new HexMinifier(RemoverLine4Css.getLineRemoved());

					if (hexDisabled == false) {
						//Minifier processes
						MinifierHex4Css.shortHexMain();
						MinifierHex4Css.shortRGBMain();
						MinifierHex4Css.shortRGBAMain();
					}

					const minifiercss = new cssMinifier(MinifierHex4Css.getHexMinified());

					const modifiedCssText = minifiercss.getCssMinified();

					//Get the minified code and replace it in a new file
					FileSaver.writeFile(path2NewFile, modifiedCssText, () => {
						if (!disableMessages) {
							window.showInformationMessage(`The minified file has been saved in: ${path2NewFile}`);
						}
						vscode.workspace.openTextDocument(path2NewFile).then(doc => {
							vscode.window.showTextDocument(doc);
						});
					});
					timeSpend = ((new Date().getTime()) - startTime);
					console.log("Time spend minifying: " + timeSpend + " milisenconds.");

				} else {
					if (!disableMessages) {
						window.showInformationMessage('We will not format this file type because you disabled it.');
					}
				}

				break;

			case "json":
			case "jsonc":

				if ((window.activeTextEditor.document.languageId == "json" && disableJson == false) ||
					(window.activeTextEditor.document.languageId == "jsonc" && disableJsonc == false)) {

					const newNamejson = path.basename(fileName).replace('.json', '-min.json');
					const path2NewFilejson = path.join(filePath, newNamejson);
					const jsonMinifier = require('./src/jsonMinifier.js');
					const jsonContent = document.getText().split('\n');
					const MinifierHex4Json = new HexMinifier(jsonContent);

					if (hexDisabled == false) {
						//Minifier processes
						MinifierHex4Json.shortHexMain();
						MinifierHex4Json.shortRGBMain();
						MinifierHex4Json.shortRGBAMain();
					}

					const RemoverLine4Json = new LineRemover(MinifierHex4Json.getHexMinified());

					RemoverLine4Json.removeMultipleLineComments();
					RemoverLine4Json.removeSingleLineComments();

					const minifierjson = new jsonMinifier(RemoverLine4Json.getLineRemoved());

					//Get the minified code and replace it
					const modifiedJsonText = minifierjson.getJSONMinified();

					//Get the minified code and replace it in a new file
					FileSaver.writeFile(path2NewFilejson, modifiedJsonText, () => {
						if (!disableMessages) {
							window.showInformationMessage(`The minified file has been saved in: ${path2NewFilejson}`);
						}
						vscode.workspace.openTextDocument(path2NewFilejson).then(doc => {
							vscode.window.showTextDocument(doc);
						});
					});
					timeSpend = ((new Date().getTime()) - startTime);
					console.log("Time spend minifying: " + timeSpend + " milisenconds.");

				} else {
					if (!disableMessages) {
						window.showInformationMessage('We will not format this file type because you disabled it.');
					}
				}

				break;

			case "html":

				if ((window.activeTextEditor.document.languageId == "html" && disableHtml == false)) {

					const newNamehtml = path.basename(fileName).replace('.html', '-min.html');
					const path2NewFilehtml = path.join(filePath, newNamehtml);
					const htmlMinifier = require('./src/htmlMinifier.js');
					const htmlContent = document.getText().split('\n');
					const minifierhtml = new htmlMinifier(htmlContent);
					minifierhtml.removeMultipleLineComments();

					const modifiedHtmlText = minifierhtml.gethtmlMinified();

					//Get the minified code and replace it in a new file
					FileSaver.writeFile(path2NewFilehtml, modifiedHtmlText, () => {
						if (!disableMessages) {
							window.showInformationMessage(`The minified file has been saved in: ${path2NewFilehtml}`);
						}
						vscode.workspace.openTextDocument(path2NewFilehtml).then(doc => {
							vscode.window.showTextDocument(doc);
						});
					});
					timeSpend = ((new Date().getTime()) - startTime);
					console.log("Time spend minifying: " + timeSpend + " milisenconds.");

				} else {
					if (!disableMessages) {
						window.showInformationMessage('We will not format this file type because you disabled it.');
					}
				}

				break;

			default:
				if (!disableMessages) {
					window.showWarningMessage('⛔ We can not format this file type yet, use a valid one.');
				}
				break;
		}

		context.subscriptions.push(disposable2);
	});

}


/**
 * getNewSize gets the new size of the
 * document and creates the triggers
 * then calls createStatusBar()
 */
function getNewSize() {
	if (statusReady) {
		const newFilepath = vscode.window.activeTextEditor.document.fileName;
		const newSize = FileSaver.statSync(newFilepath).size;
		if (statusDisabled == false) {
			createStatusBar(originalSize, newSize);
			vscode.workspace.onDidChangeConfiguration(() => statusBarItem.hide());
			vscode.workspace.onDidChangeWorkspaceFolders(() => statusBarItem.hide());
			vscode.workspace.onDidCloseTextDocument(() => statusBarItem.hide());
		}
	}
}

/**
 * createStatusBar creates the status bar item
 * @param {number} originalSize the unminified size
 * @param {number} newSize the minified size
 */
function createStatusBar(originalSize, newSize) {
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
 * transformSize receives an int and transform its value to KB, OR MB
 * @param {number} size 
 */
function transformSize(size) {
	if (size >= 1048576) return `${Math.floor(size / 10485.76) / 100} MB`;
	else if (size >= 1024) return `${Math.floor(size / 10.24) / 100} KB`;
	else return `${size} B`;
}

/**
 * statusBarInfo Creates an output
 * channel with information about
 * the file that has been minified
 * original size, new minified size
 * filetype and path.
 */
function statusBarInfo() {
	oc = window.createOutputChannel('Minify output');
	oc.appendLine("╔══════════════════════════════╗");
	oc.appendLine("║      Extension MinifyAll     ║	")
	oc.appendLine("╠═══════════════════╦══════════╣");
	oc.appendLine("║ Original size     ║ " + transformSize(originalSize) + " ║");
	oc.appendLine("╠═══════════════════╬══════════║");
	oc.appendLine("║ New minified size ║ " + transformSize(FileSaver.statSync(vscode.window.activeTextEditor.document.fileName).size) + " ║");
	oc.appendLine("╚═══════════════════╩══════════╝");
	oc.appendLine("File path:  \t\t" + window.activeTextEditor.document.fileName);
	oc.appendLine("File type:  \t\t" + window.activeTextEditor.document.languageId);
	oc.appendLine("% of shrink:\t\t" + (100 - ((FileSaver.statSync(vscode.window.activeTextEditor.document.fileName).size * 100) / originalSize)).toFixed(3) + "%");
	oc.appendLine("Bytes freed:\t\t" + (originalSize - (FileSaver.statSync(vscode.window.activeTextEditor.document.fileName).size)) + "B");
	oc.appendLine("Time spend: \t\t" + timeSpend + " miliseconds. (" + timeSpend / 1000 + " seconds).");
	oc.show();
}

exports.activate = activate;

/**
 * deactivate function that is
 * called when the extension
 * is deactivaded.
 */
function deactivate() {
	statusBarItem.dispose();
	oc.dispose();
}
exports.deactivate = deactivate;