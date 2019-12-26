/* eslint-disable no-undef */
/**
 * @file extension.test.js file that contains all the tests that must pass before releasing
 * any new version of the extension. The extensions run in the suite 'MinifyAll Test Suite',
 * which contains all the tests, ordered by relevancy
 * (top = most relevant test, bottom = not as relevant).
 *
 * @since 1.6.2
 * @author Jose Gracia Berenguer
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */


import * as assert from 'assert';
import * as vscode from 'vscode';
const path = require('path');
const MinifyAll = require('../../main');
import GlobalMinifiers from '../../controller/globalMinifiers';
const globalMinifiers = new GlobalMinifiers(true);
import HexMinifier from '../../controller/hexMinifier';
import getNewFilePath from '../../controller/getNewFilePath';
const CssMinifier = require('../../langDefaultMinifiers/cssMinifier');
const HtmlMinifier = require('../../langDefaultMinifiers/htmlMinifier');
const JsonMinifier = require('../../langDefaultMinifiers/jsonMinifier');


suite('MinifyAll Test Suite', () => {
	vscode.window.showInformationMessage('Starting tests.');


	test('Extension is installed', () => {
		assert.ok(vscode.extensions.getExtension('josee9988.minifyall'));
	});


	test('Extension can be activated', () =>
		vscode.extensions.getExtension('josee9988.minifyall').activate().then(() => {
			assert.ok(true);
		}));


	test('Extension is active', () => {
		assert.ok(vscode.extensions.getExtension('josee9988.minifyall').isActive);
	});


	test('Extension has a path', () => {
		assert(vscode.extensions.getExtension('josee9988.minifyall').extensionPath, null);
		assert(vscode.extensions.getExtension('josee9988.minifyall').extensionPath, undefined);
	});


	test('Extension has a package.json', () => {
		assert(vscode.extensions.getExtension('josee9988.minifyall').packageJSON, null);
		assert(vscode.extensions.getExtension('josee9988.minifyall').packageJSON, undefined);
	});


	test('Extension has the expected ID', () => {
		assert.deepStrictEqual(vscode.extensions.getExtension('josee9988.minifyall').id, 'josee9988.minifyall');
	});


	test('Extension is an \'UI Extension\' (runs on the user\'s local machine)', () => {
		assert.deepStrictEqual(vscode.extensions.getExtension('josee9988.minifyall').extensionKind, 1);
	});


	test('VSCode registers all MinifyAll commands', () =>
		vscode.commands.getCommands(true).then((commands) => {
			const COMMANDS = [
				'extension.MinifyAll',
				'extension.MinifyAll2OtherDoc',
				'extension.MinifyAll2OtherDocSelected',
				'extension.MinifyAllSelectedText',
			];
			const foundLiveServerCommands = commands.filter((value) =>
				COMMANDS.indexOf(value) >= 0 || value.startsWith('extension.minifyall.'));
			assert.equal(foundLiveServerCommands.length, COMMANDS.length);
		}));


	test('CSS main Minify (/controller/globalMinifiers.js)', () => {
		const result = globalMinifiers.minifyCssScssLessSass(
			[
				'@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans");',
				'',
				'@media(max-width:850px) {',
				'    #tableRoot {',
				'        font-size: 120x;',
				'    }',
				'    #headRootPanel {',
				'        font-size: 12px;',
				'    }',
				'    .actionbuttons {',
				'        margin: 2px;',
				'    }',
				'}',
				'#login-block {',
				'    -webkit-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);',
				'    -moz-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);',
				'    box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);',
				'    z-index: 2;',
				'}',
				'/*---------------------------------------------*/',
				'h1,',
				'h2{',
				'  margin: 0px;',
				'}',
			],
		);
		assert.deepStrictEqual(result, '@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans");@media(max-width:850px){#tableRoot{font-size:120x}#headRootPanel{font-size:12px}.actionbuttons{margin:2px}}#login-block{-webkit-box-shadow:0 0 45px 0 #00000066;-moz-box-shadow:0 0 45px 0 #00000066;box-shadow:0 0 45px 0 #00000066;z-index:2;}h1,h2{margin:0;}');
	});


	test('HTML main Minify (/controller/globalMinifiers.js)', () => {
		const result = globalMinifiers.minifyHtml(
			[
				'<div class="parallax">',
				'    <div class="container d-flex justify-content-center align-items-center parallax-content" style="height:100vh;">',
				'        <div class="col-12 col-md-10 col-lg-8 d-flex justify-content-center flex-column">',
				'            <h1>321 32 </h1>',
				'        </div>',
				'    </div><video class="parallax-background" autoplay="" loop="" muted="">',
				'        <source src="http://thenewcode.com/assets/videos/polina.mp4" type="video/mp4"',
				'            wp-acf="[{\'type\':\'url\',\'name\':\'video\',\'label\':\'Video\',\'wrapper\':{\'width\':25}},{\'type\':\'text\',\'name\':\'video_css\',\'label\':\'Video CSS (eg. filters)\',\'wrapper\':{\'width\':25}}]"',
				'            wp-attr="[{\'target\':\'src\',\'replace\':\'%1\'},{\'target\':\'parent_style\',\'replace\':\'%2\'}]"></video>',

			],
		);
		assert.deepStrictEqual(result, '<div class="parallax"><div class="container d-flex justify-content-center align-items-center parallax-content"style="height:100vh;"><div class="col-12 col-md-10 col-lg-8 d-flex justify-content-center flex-column"><h1>321 32 </h1></div></div><video class="parallax-background"autoplay=""loop=""muted=""><source src="http://thenewcode.com/assets/videos/polina.mp4"type="video/mp4"wp-acf="[{\'type\':\'url\',\'name\':\'video\',\'label\':\'Video\',\'wrapper\':{\'width\':25}},{\'type\':\'text\',\'name\':\'video_css\',\'label\':\'Video CSS (eg. filters)\',\'wrapper\':{\'width\':25}}]"wp-attr="[{\'target\':\'src\',\'replace\':\'%1\'},{\'target\':\'parent_style\',\'replace\':\'%2\'}]"></video>');
	});


	test('JSON main Minify (/controller/globalMinifiers.js)', () => {
		const result = globalMinifiers.minifyJsonJsonc(
			[
				'"tokenColors": [',
				'        {',
				'            "name": "Comment",',
				'            "scope": [',
				'                "background",',
				'                "comment",',
				'                "punctuation.definition.comment"',
				'            ],',
				'            "settings": {',
				'                "fontStyle": "italic",',
				'                "foreground": "#72a15d"',
				'            }',
				'        },',
			],
		);
		assert.deepStrictEqual(result, '"tokenColors":[{"name":"Comment","scope":["background","comment","punctuation.definition.comment"],"settings":{"fontStyle":"italic","foreground":"#795"}},');
	});


	test('Hexadecimal Minify (controller/hexMinifier.js)', () => {
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


	test('CSS Minify (langDefaultMinifiers/cssMinifier.js)', () => {
		const cssMinify = new CssMinifier(
			[
				'@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans");',
				'',
				'@media(max-width:850px) {',
				'    #tableRoot {',
				'        font-size: 120x;',
				'    }',
				'    #headRootPanel {',
				'        font-size: 12px;',
				'    }',
				'    .actionbuttons {',
				'        margin: 2px;',
				'    }',
				'}',
				'#login-block {',
				'    -webkit-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);',
				'    -moz-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);',
				'    box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);',
				'    z-index: 2;',
				'}',
				'/*---------------------------------------------*/',
				'h1,',
				'h2{',
				'  margin: 0px;',
				'}',
			],
		);
		const result = cssMinify.getCssMinified();
		assert.deepStrictEqual(result, '@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans");@media(max-width:850px){#tableRoot{font-size:120x}#headRootPanel{font-size:12px}.actionbuttons{margin:2px}}#login-block{-webkit-box-shadow:0 0 45px 0 rgba(0,0,0,.4);-moz-box-shadow:0 0 45px 0 rgba(0,0,0,.4);box-shadow:0 0 45px 0 rgba(0,0,0,.4);z-index:2;}h1,h2{margin:0;}');
	});


	test('HTML Minify (langDefaultMinifiers/htmlMinifier.js)', () => {
		const htmlMinify = new HtmlMinifier(
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
		assert.deepStrictEqual(result, '<!DOCTYPE html><html lang="es"><head><title></title><meta charset="utf-8"><link rel="stylesheet"href=""><script type="text/javascript"src=""></script></head><body></body></html>');
	});


	test('JSON Minify (langDefaultMinifiers/jsonMinifier.js)', () => {
		const jsonMinify = new JsonMinifier(
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


	test('Function \'getNewFilePath\' works', () => {
		const result = getNewFilePath(path, '/myFile.css', 'css');
		assert.deepStrictEqual(result, '/myFile-min.css');
	});


	test('Function \'removeComments\' works', () => {
		const result = globalMinifiers.removeComments(
			['const assert; // simple comment.', '// full line', 'console.log(1+1); /* multiLine simple*/', 'let variable; /*comment', 'just a comment', 'stillcomment*/', 'console.log("all done");'],
		).join('');
		assert.deepStrictEqual(result, 'const assert; console.log(1+1); let variable; console.log("all done");');
	});
});
