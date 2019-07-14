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
const {
	commands,
	window
} = require('vscode');
const {
	document
} = window.activeTextEditor;

const vscode = require('vscode');
const editor = vscode.window.activeTextEditor;

let HexMinifier = require('./Minifiers/hexMinifier');
let LineRemover = require('./Minifiers/lineRemover');


function activate(context) {
	//Command MinifyAll default one.
	const disposable = commands.registerCommand('extension.MinifyAll', () => {
		const firstLine = editor.document.lineAt(0);
		const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
		var textRange = new vscode.Range(0,
			firstLine.range.start.character,
			editor.document.lineCount - 1,
			lastLine.range.end.character);
		switch (window.activeTextEditor.document.languageId) {
			case "css":
			case "scss":
				let cssMinifier = require('./Minifiers/cssMinifier.js');
				let cssContent = document.getText().split('\n');
				let RemoverLine4Css = new LineRemover(cssContent);

				RemoverLine4Css.removeMultipleLineComments();
				RemoverLine4Css.removeSingleLineComments();
				let MinifierHex4Css = new HexMinifier(RemoverLine4Css.getLineRemoved());

				//Minifier processes
				MinifierHex4Css.shortHexMain();
				MinifierHex4Css.shortRGBMain();
				let minifiercss = new cssMinifier(MinifierHex4Css.getHexMinified());

				//Get the minified code and replace it
				let modifiedCssText = minifiercss.getCssMinified();
				editor.edit(builder => {
					builder.replace(textRange, modifiedCssText);
				});

				break;

			case "json":
			case "jsonc":
				let jsonMinifier = require('./Minifiers/jsonMinifier.js');
				let jsonContent = document.getText().split('\n');
				let MinifierHex4Json = new HexMinifier(jsonContent);

				//Minifier processes
				MinifierHex4Json.shortHexMain();
				MinifierHex4Json.shortRGBMain();

				let RemoverLine4Json = new LineRemover(MinifierHex4Json.getHexMinified());

				RemoverLine4Json.removeMultipleLineComments();
				RemoverLine4Json.removeSingleLineComments();

				let minifierjson = new jsonMinifier(RemoverLine4Json.getLineRemoved());

				//Get the minified code and replace it
				let modifiedJsonText = minifierjson.getJSONMinified();
				editor.edit(builder => {
					builder.replace(textRange, modifiedJsonText);
				});
				break;

			case "html":
				let htmlMinifier = require('./Minifiers/htmlMinifier.js');
				let htmlContent = document.getText().split('\n');
				let minifierhtml = new htmlMinifier(htmlContent);
				minifierhtml.removeMultipleLineComments();
				//Get the minified code and replace it
				let modifiedHtmlText = minifierhtml.gethtmlMinified();
				editor.edit(builder => {
					builder.replace(textRange, modifiedHtmlText);
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
		const FileSaver = require('fs');
		const {
			fileName
		} = document;
		const filePath = path.dirname(fileName);
		switch (window.activeTextEditor.document.languageId) {
			case "css":
			case "scss":
				const newName = path.basename(fileName).replace('.css', '-min.css');
				const path2NewFile = path.join(filePath, newName);
				let cssMinifier = require('./Minifiers/cssMinifier.js');
				let cssContent = document.getText().split('\n');
				let RemoverLine4Css = new LineRemover(cssContent);

				RemoverLine4Css.removeMultipleLineComments();
				RemoverLine4Css.removeSingleLineComments();
				let MinifierHex4Css = new HexMinifier(RemoverLine4Css.getLineRemoved());

				//Minifier processes
				MinifierHex4Css.shortHexMain();
				MinifierHex4Css.shortRGBMain();
				let minifiercss = new cssMinifier(MinifierHex4Css.getHexMinified());

				let modifiedCssText = minifiercss.getCssMinified();

				//Get the minified code and replace it in a new file
				FileSaver.writeFile(path2NewFile, modifiedCssText, () => {
					window.showInformationMessage(`The minified file has been saved in: ${path2NewFile}`);
				});

				break;

			case "json":
			case "jsonc":
				const newNamejson = path.basename(fileName).replace('.json', '-min.json');
				const path2NewFilejson = path.join(filePath, newNamejson);

				let jsonMinifier = require('./Minifiers/jsonMinifier.js');
				let jsonContent = document.getText().split('\n');
				let MinifierHex4Json = new HexMinifier(jsonContent);

				//Minifier processes
				MinifierHex4Json.shortHexMain();
				MinifierHex4Json.shortRGBMain();

				let RemoverLine4Json = new LineRemover(MinifierHex4Json.getHexMinified());

				RemoverLine4Json.removeMultipleLineComments();
				RemoverLine4Json.removeSingleLineComments();

				let minifierjson = new jsonMinifier(RemoverLine4Json.getLineRemoved());
				//Get the minified code and replace it in a new file
				let modifiedJsonText = minifierjson.getJSONMinified();
				FileSaver.writeFile(path2NewFilejson, modifiedJsonText, () => {
					window.showInformationMessage(`The minified file has been saved in: ${path2NewFilejson}`);
				});

				break;

			case "html":
				const newNamehtml = path.basename(fileName).replace('.html', '-min.html');
				const path2NewFilehtml = path.join(filePath, newNamehtml);
				let htmlMinifier = require('./Minifiers/htmlMinifier.js');
				let htmlContent = document.getText().split('\n');
				let minifierhtml = new htmlMinifier(htmlContent);
				minifierhtml.removeMultipleLineComments();

				let modifiedHtmlText = minifierhtml.gethtmlMinified();

				//Get the minified code and replace it in a new file
				FileSaver.writeFile(path2NewFilehtml, modifiedHtmlText, () => {
					window.showInformationMessage(`The minified file has been saved in: ${path2NewFilehtml}`);
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