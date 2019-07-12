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

function activate(context) {
	const disposable = commands.registerCommand('extension.MinifyAll', () => {
		switch (window.activeTextEditor.document.languageId) {
			case "css":
				const cssMinifier = require('./Minifiers/cssMinifier.js');
				const content = document.getText().split('\n');

				const minifier = new cssMinifier(content);
				minifier.shortHex();
				let modifiedText = minifier.endWork();
				editor.edit(builder => {
					builder.replace(textRange, modifiedText);
				});

				break;

			case "json":

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