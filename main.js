/**
 * @file That is executed when the command extension.MinifyAll is used.
 * it checks what language are you using in your document and if its
 * supported it will remove all your code and replace it with a 
 * minified version of the code.
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
let originalFilepath = vscode.window.activeTextEditor.document.fileName
let originalSize = FileSaver.statSync(originalFilepath).size
const ModuleSizeTransform = require('./src/sizeTransform');
const sizeTransform = new ModuleSizeTransform();

vscode.commands.registerCommand('extension.MinifyAllStatus', statusBarInfo);
vscode.workspace.onDidSaveTextDocument(() => getNewSize());
const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);

/**
 * getNewSize gets the new size of the
 * document and creates the triggers
 * then calls createStatusBar()
 */
function getNewSize() {
	const newFilepath = vscode.window.activeTextEditor.document.fileName
	const newSize = FileSaver.statSync(newFilepath).size
	createStatusBar(originalSize, newSize);
	vscode.workspace.onDidChangeConfiguration(() => statusBarItem.hide());
	vscode.workspace.onDidChangeWorkspaceFolders(() => statusBarItem.hide());
	vscode.workspace.onDidCloseTextDocument(() => statusBarItem.hide());
}

/**
 * createStatusBar creates the status bar item
 * @param {number} originalSize the unminified size
 * @param {number} newSize the minified size
 */
function createStatusBar(originalSize, newSize) {
	statusBarItem.tooltip = 'New file size, click for more info!';
	statusBarItem.command = 'extension.MinifyAllStatus';
	statusBarItem.text = sizeTransform.transformSize(originalSize) + " --> " + sizeTransform.transformSize(newSize);
	statusBarItem.show();
	vscode.workspace.onDidChangeConfiguration(() => statusBarItem.hide());
	vscode.workspace.onDidChangeWorkspaceFolders(() => statusBarItem.hide());
	vscode.workspace.onDidCloseTextDocument(() => statusBarItem.hide());
}

/**
 * statusBarInfo Creates an output
 * channel with information about
 * the file that has been minified
 * original size, new minified size
 * filetype and path.
 */
function statusBarInfo() {
	const oc = window.createOutputChannel('Minify output');
	oc.appendLine("╔══════════════════════════════╗");
	oc.appendLine("║      Extension MinifyAll     ║	")
	oc.appendLine("╠═══════════════════╦══════════╣");
	oc.appendLine("║ Original size     ║ " + sizeTransform.transformSize(originalSize) + "  ║");
	oc.appendLine("╠═══════════════════╬══════════║");
	oc.appendLine("║ New minified size ║ " + sizeTransform.transformSize(FileSaver.statSync(vscode.window.activeTextEditor.document.fileName).size) + "  ║");
	oc.appendLine("╚═══════════════════╩══════════╝");
	oc.appendLine("File path:\t" + window.activeTextEditor.document.fileName);
	oc.appendLine("File type:\t" + window.activeTextEditor.document.languageId);
	oc.show();
}

/**
 * activate Main function called when the user
 * uses the command 'MinifyAll' or 'MinifyAll2OtherDoc'
 * @param {object} context 
 */
function activate(context) {
	//Command MinifyAll default one.
	const disposable = commands.registerCommand('extension.MinifyAll', () => {
		originalFilepath = vscode.window.activeTextEditor.document.fileName
		originalSize = FileSaver.statSync(originalFilepath).size
		const {
			document
		} = window.activeTextEditor;
		switch (window.activeTextEditor.document.languageId) {
			case "css":
			case "scss":

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

				//Minifier processes
				MinifierHex4Css.shortHexMain();
				MinifierHex4Css.shortRGBMain();
				MinifierHex4Css.shortRGBAMain();

				const minifiercss = new cssMinifier(MinifierHex4Css.getHexMinified());

				//Get the minified code and replace it
				const modifiedCssText = minifiercss.getCssMinified();
				editorCss.edit(builder => {
					builder.replace(textRangeCss, modifiedCssText);
				});

				break;

			case "json":
			case "jsonc":

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

				//Minifier processes
				MinifierHex4Json.shortHexMain();
				MinifierHex4Json.shortRGBMain();
				MinifierHex4Json.shortRGBAMain();

				const RemoverLine4Json = new LineRemover(MinifierHex4Json.getHexMinified());

				RemoverLine4Json.removeMultipleLineComments();
				RemoverLine4Json.removeSingleLineComments();

				const minifierjson = new jsonMinifier(RemoverLine4Json.getLineRemoved());

				//Get the minified code and replace it
				const modifiedJsonText = minifierjson.getJSONMinified();

				editorJson.edit(builder => {
					builder.replace(textRangeJson, modifiedJsonText);
				});
				break;

			case "html":

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

				break;

			default:
				window.showErrorMessage('⛔ We can not format this file type yet, use a valid one.');
				break;
		}
		context.subscriptions.push(disposable);

	});

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
				const newName = path.basename(fileName).replace('.css', '-min.css');
				const path2NewFile = path.join(filePath, newName);
				const cssMinifier = require('./src/cssMinifier.js');
				const cssContent = document.getText().split('\n');
				const RemoverLine4Css = new LineRemover(cssContent);

				RemoverLine4Css.removeMultipleLineComments();
				RemoverLine4Css.removeSingleLineComments();

				const MinifierHex4Css = new HexMinifier(RemoverLine4Css.getLineRemoved());

				//Minifier processes
				MinifierHex4Css.shortHexMain();
				MinifierHex4Css.shortRGBMain();
				MinifierHex4Css.shortRGBAMain();

				const minifiercss = new cssMinifier(MinifierHex4Css.getHexMinified());

				const modifiedCssText = minifiercss.getCssMinified();

				//Get the minified code and replace it in a new file
				FileSaver.writeFile(path2NewFile, modifiedCssText, () => {
					window.showInformationMessage(`The minified file has been saved in: ${path2NewFile}`);
					vscode.workspace.openTextDocument(path2NewFile).then(doc => {
						vscode.window.showTextDocument(doc);
					});
				});

				break;

			case "json":
			case "jsonc":

				const newNamejson = path.basename(fileName).replace('.json', '-min.json');
				const path2NewFilejson = path.join(filePath, newNamejson);
				const jsonMinifier = require('./src/jsonMinifier.js');
				const jsonContent = document.getText().split('\n');
				const MinifierHex4Json = new HexMinifier(jsonContent);

				//Minifier processes
				MinifierHex4Json.shortHexMain();
				MinifierHex4Json.shortRGBMain();
				MinifierHex4Json.shortRGBAMain();

				const RemoverLine4Json = new LineRemover(MinifierHex4Json.getHexMinified());

				RemoverLine4Json.removeMultipleLineComments();
				RemoverLine4Json.removeSingleLineComments();

				const minifierjson = new jsonMinifier(RemoverLine4Json.getLineRemoved());

				//Get the minified code and replace it
				const modifiedJsonText = minifierjson.getJSONMinified();

				//Get the minified code and replace it in a new file
				FileSaver.writeFile(path2NewFilejson, modifiedJsonText, () => {
					window.showInformationMessage(`The minified file has been saved in: ${path2NewFilejson}`);
					vscode.workspace.openTextDocument(path2NewFilejson).then(doc => {
						vscode.window.showTextDocument(doc);
					});
				});

				break;

			case "html":

				const newNamehtml = path.basename(fileName).replace('.html', '-min.html');
				const path2NewFilehtml = path.join(filePath, newNamehtml);
				const htmlMinifier = require('./src/htmlMinifier.js');
				const htmlContent = document.getText().split('\n');
				const minifierhtml = new htmlMinifier(htmlContent);
				minifierhtml.removeMultipleLineComments();

				const modifiedHtmlText = minifierhtml.gethtmlMinified();

				//Get the minified code and replace it in a new file
				FileSaver.writeFile(path2NewFilehtml, modifiedHtmlText, () => {
					window.showInformationMessage(`The minified file has been saved in: ${path2NewFilehtml}`);
					vscode.workspace.openTextDocument(path2NewFilehtml).then(doc => {
						vscode.window.showTextDocument(doc);
					});
				});

				break;

			default:
				window.showErrorMessage('⛔ We can not format this file type yet, use a valid one.');
				break;
		}

		context.subscriptions.push(disposable2);
	});

}


exports.activate = activate;

/**
 * deactivate function that is
 * called when the extension
 * is deactivaded.
 */
function deactivate() {
	statusBarItem.dispose();
}
exports.deactivate = deactivate;