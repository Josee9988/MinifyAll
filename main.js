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

let {
	commands,
	window
} = require('vscode');




let FileSaver = require('fs');
let vscode = require('vscode');

let HexMinifier = require('./Minifiers/hexMinifier');
let LineRemover = require('./Minifiers/lineRemover');

let originalFilepath = vscode.window.activeTextEditor.document.fileName
let originalSize = FileSaver.statSync(originalFilepath).size

vscode.commands.registerCommand('extension.MinifyAllStatus', statusBarInfo);

vscode.workspace.onDidSaveTextDocument(() => getNewSize());

function getNewSize() {
	let newFilepath = vscode.window.activeTextEditor.document.fileName
	let newSize = FileSaver.statSync(newFilepath).size
	createStatusBar(originalSize, newSize);
}


function createStatusBar(originalSize, newSize) {
	let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
	statusBarItem.tooltip = 'New file size, click for more info!';
	statusBarItem.command = 'extension.MinifyAllStatus';
	statusBarItem.text = transformSize(originalSize) + " --> " + transformSize(newSize);
	statusBarItem.show();
	vscode.workspace.onDidChangeConfiguration(() => statusBarItem.hide());
	vscode.workspace.onDidChangeWorkspaceFolders(() => statusBarItem.hide());
	vscode.workspace.onDidCloseTextDocument(() => statusBarItem.hide());
}


function statusBarInfo() {
	let oc = window.createOutputChannel('Minify output');
	oc.appendLine("╔══════════════════════════════╗");
	oc.appendLine("║      Extension MinifyAll     ║	")
	oc.appendLine("╠═══════════════════╦══════════╣");
	oc.appendLine("║ Original size     ║ " + transformSize(originalSize) + " ║");
	oc.appendLine("╠═══════════════════╬══════════║");
	oc.appendLine("║ New minified size ║ " + transformSize(FileSaver.statSync(vscode.window.activeTextEditor.document.fileName).size) + " ║");
	oc.appendLine("╚═══════════════════╩══════════╝");
	oc.appendLine("File path:\t" + window.activeTextEditor.document.fileName);
	oc.show();
}

function transformSize(size) {
	if (size >= 1048576) return `${Math.floor(size / 10485.76) / 100} MB`;
	else if (size >= 1024) return `${Math.floor(size / 10.24) / 100} KB`;
	else return `${size} B`;
}

function activate(context) {
	//Command MinifyAll default one.
	let disposable = commands.registerCommand('extension.MinifyAll', () => {
		let {
			document
		} = window.activeTextEditor;
		switch (window.activeTextEditor.document.languageId) {
			case "css":
			case "scss":

				let editorCss = vscode.window.activeTextEditor;
				let firstLineCss = editorCss.document.lineAt(0);
				let lastLineCss = editorCss.document.lineAt(editorCss.document.lineCount - 1);
				let textRangeCss = new vscode.Range(0,
					firstLineCss.range.start.character,
					editorCss.document.lineCount - 1,
					lastLineCss.range.end.character);

				let cssMinifier = require('./Minifiers/cssMinifier.js');
				let cssContent = document.getText().split('\n');
				let RemoverLine4Css = new LineRemover(cssContent);
				console.log(cssContent);
				RemoverLine4Css.removeMultipleLineComments();
				RemoverLine4Css.removeSingleLineComments();

				let MinifierHex4Css = new HexMinifier(RemoverLine4Css.getLineRemoved());

				//Minifier processes
				MinifierHex4Css.shortHexMain();
				MinifierHex4Css.shortRGBMain();
				MinifierHex4Css.shortRGBAMain();

				let minifiercss = new cssMinifier(MinifierHex4Css.getHexMinified());

				//Get the minified code and replace it
				let modifiedCssText = minifiercss.getCssMinified();
				editorCss.edit(builder => {
					builder.replace(textRangeCss, modifiedCssText);
				});

				break;

			case "json":
			case "jsonc":
				let editorJson = vscode.window.activeTextEditor;
				let firstLineJson = editorJson.document.lineAt(0);
				let lastLineJson = editorJson.document.lineAt(editorJson.document.lineCount - 1);
				let textRangeJson = new vscode.Range(0,
					firstLineJson.range.start.character,
					editorJson.document.lineCount - 1,
					lastLineJson.range.end.character);

				let jsonMinifier = require('./Minifiers/jsonMinifier.js');
				let jsonContent = document.getText().split('\n');
				let MinifierHex4Json = new HexMinifier(jsonContent);

				//Minifier processes
				MinifierHex4Json.shortHexMain();
				MinifierHex4Json.shortRGBMain();
				MinifierHex4Json.shortRGBAMain();

				let RemoverLine4Json = new LineRemover(MinifierHex4Json.getHexMinified());

				RemoverLine4Json.removeMultipleLineComments();
				RemoverLine4Json.removeSingleLineComments();

				let minifierjson = new jsonMinifier(RemoverLine4Json.getLineRemoved());

				//Get the minified code and replace it
				let modifiedJsonText = minifierjson.getJSONMinified();
				editorJson.edit(builder => {
					builder.replace(textRangeJson, modifiedJsonText);
				});
				break;

			case "html":
				let editorHtml = vscode.window.activeTextEditor;

				let firstLineHtml = editorHtml.document.lineAt(0);
				let lastLineHtml = editorHtml.document.lineAt(editorHtml.document.lineCount - 1);
				let textRangeHtml = new vscode.Range(0,
					firstLineHtml.range.start.character,
					editorHtml.document.lineCount - 1,
					lastLineHtml.range.end.character);

				let htmlMinifier = require('./Minifiers/htmlMinifier.js');
				let htmlContent = document.getText().split('\n');
				let minifierhtml = new htmlMinifier(htmlContent);
				minifierhtml.removeMultipleLineComments();
				//Get the minified code and replace it
				let modifiedHtmlText = minifierhtml.gethtmlMinified();

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
	let disposable2 = commands.registerCommand('extension.MinifyAll2OtherDoc', () => {
		let path = require('path');
		let {
			document
		} = window.activeTextEditor;
		let {
			fileName
		} = document;

		let filePath = path.dirname(fileName);
		switch (window.activeTextEditor.document.languageId) {

			case "css":
			case "scss":
				let newName = path.basename(fileName).replace('.css', '-min.css');
				let path2NewFile = path.join(filePath, newName);
				let cssMinifier = require('./Minifiers/cssMinifier.js');
				let cssContent = document.getText().split('\n');
				let RemoverLine4Css = new LineRemover(cssContent);

				RemoverLine4Css.removeMultipleLineComments();
				RemoverLine4Css.removeSingleLineComments();

				let MinifierHex4Css = new HexMinifier(RemoverLine4Css.getLineRemoved());

				//Minifier processes
				MinifierHex4Css.shortHexMain();
				MinifierHex4Css.shortRGBMain();
				MinifierHex4Css.shortRGBAMain();

				let minifiercss = new cssMinifier(MinifierHex4Css.getHexMinified());

				let modifiedCssText = minifiercss.getCssMinified();

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

				let newNamejson = path.basename(fileName).replace('.json', '-min.json');
				let path2NewFilejson = path.join(filePath, newNamejson);

				let jsonMinifier = require('./Minifiers/jsonMinifier.js');
				let jsonContent = document.getText().split('\n');
				let MinifierHex4Json = new HexMinifier(jsonContent);

				//Minifier processes
				MinifierHex4Json.shortHexMain();
				MinifierHex4Json.shortRGBMain();
				MinifierHex4Css.shortRGBAMain();

				let RemoverLine4Json = new LineRemover(MinifierHex4Json.getHexMinified());

				RemoverLine4Json.removeMultipleLineComments();
				RemoverLine4Json.removeSingleLineComments();

				let minifierjson = new jsonMinifier(RemoverLine4Json.getLineRemoved());

				let modifiedJsonText = minifierjson.getJSONMinified();

				//Get the minified code and replace it in a new file
				FileSaver.writeFile(path2NewFilejson, modifiedJsonText, () => {
					window.showInformationMessage(`The minified file has been saved in: ${path2NewFilejson}`);
					vscode.workspace.openTextDocument(path2NewFilejson).then(doc => {
						vscode.window.showTextDocument(doc);
					});
				});

				break;

			case "html":

				let newNamehtml = path.basename(fileName).replace('.html', '-min.html');
				let path2NewFilehtml = path.join(filePath, newNamehtml);
				let htmlMinifier = require('./Minifiers/htmlMinifier.js');
				let htmlContent = document.getText().split('\n');
				let minifierhtml = new htmlMinifier(htmlContent);
				minifierhtml.removeMultipleLineComments();

				let modifiedHtmlText = minifierhtml.gethtmlMinified();

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

function deactivate() {}
exports.deactivate = deactivate;