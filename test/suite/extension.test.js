/* eslint-disable no-undef */ /* eslint-disable no-tabs */ /* eslint-disable indent */
const assert = require('assert');
const vscode = require('vscode');
const path = require('path');
const MinifyAll = require('../../src/main');
const HexMinifier = require('../../src/utilities/hexMinifier.js');
const htmlMinifier = require('../../src/langDefaultMinifiers/htmlMinifier');
const jsonMinifier = require('../../src/langDefaultMinifiers/jsonMinifier');


suite('MinifyAll Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('File Path', () => {
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

	test('HTML Minify', () => {
		const htmlMinify = new htmlMinifier(
			['<!DOCTYPE html>',
				'<html lang="es">',
				'',
				'<head>',
				'    <title></title>',
				'    <meta charset="utf-8">',
				'    <link rel="stylesheet" href="">',
				'    <script type="text/javascript" src=""></script>',
				'    <!-- test -->',
				'</head>',
				'',
				'<!-- ~~~~~✦✦✦✦✦ B O',
				' D Y ✦✦✦✦✦~~~~~ -->',
				'<body>',
				'',
				'</body>',
				'',
				'</html>',
			],
		);
		htmlMinify.removeMultipleLineComments();
		const result = htmlMinify.getHtmlMinified();
		assert.deepStrictEqual(result, '<!DOCTYPE html><html lang="es"><head><title></title><meta charset="utf-8"><link rel="stylesheet" href=""><script type="text/javascript" src=""></script></head><body></body></html>');
	});

	test('JSON Minify', () => {
		const jsonMinify = new jsonMinifier(
			['{',
				'"contributes": {',
				'"commands": [{',
				'"title": "Minify this document ⚡",',
				'},',
				'{',
				'"color": "#FAFAFA", ',
				'}/* multiline comment',
				'*/',
				']',
				'}',
				'}',
			],
		);
		const result = jsonMinify.getJSONMinified();
		assert.deepStrictEqual(result, '{"contributes":{"commands":[{"title":"Minify this document ⚡"},{"color":"#FAFAFA"}]}}');
	});
});
