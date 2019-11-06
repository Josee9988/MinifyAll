/* eslint-disable no-undef */ /* eslint-disable no-tabs */ /* eslint-disable indent */
const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const MinifyAll = require('../../src/main');

suite('MinifyAll Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('File Path', () => {
		const path = require('path');
		const result = MinifyAll.getNewFilePath(path, '/myFile.css', 'css');
		assert.deepStrictEqual(result, '/myFile-min.css');
	});

	test('Comment Remover', () => {
		const result = MinifyAll.removeComments(
			['const assert; // simple comment.', '// full line', 'console.log(1+1); /* multiLine simple*/', 'let variable; /*comment', 'just a comment', 'stillcomment*/', 'console.log("all done");'],
		).join('');
		assert.deepStrictEqual(result, 'const assert; console.log(1+1); let variable; console.log("all done");');
	});

	test('Transform Size', () => {
		let result = MinifyAll.transformSize(1560);
		assert.deepStrictEqual(result, '1.52 Kb');
		result = MinifyAll.transformSize(1560814);
		assert.deepStrictEqual(result, '1.48 Mb');
	});

	test('Hexadecimal Minify', () => {
		const HexMinifier = require('../../src/utilities/hexMinifier.js');
		const MinifierHex = new HexMinifier(
			['background-color: rgba(12, 12, 12, 0.8);', 'background-color: rgb(12, 12, 12);', 'background-color: #FAFAFA;'],
		);
		// Minifier methods
		MinifierHex.shortHexMain();
		MinifierHex.shortRGBMain();
		MinifierHex.shortRGBAMain();
		const result = MinifierHex.getHexMinified().join('');
		assert.deepStrictEqual(result, 'background-color: #0C0C0CCC;background-color: #111;background-color: #FFF;');
	});

});
