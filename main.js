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

const firstLine = editor.document.lineAt(0);
const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
var textRange = new vscode.Range(0,
	firstLine.range.start.character,
	editor.document.lineCount - 1,
	lastLine.range.end.character);
let HexMinifier = require('./Minifiers/hexMinifier');
let LineRemover = require('./Minifiers/lineRemover');



function activate(context) {
	const disposable = commands.registerCommand('extension.MinifyAll', () => {
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
				break;

			default:
				window.showErrorMessage('We can not format this file type yet, use a valid one.');
				break;
		}


	});

	context.subscriptions.push(disposable);
}


exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;