/* eslint-disable no-undef */
const assert = require('assert');
const vscode = require('vscode');
const path = require('path');
const MinifyAll = require('../../src/main');
const GlobalMinify = require('./../../src/utilities/globalMinifiers');
const globalMinifiers = new GlobalMinify(require('./../../src/utilities/hexMinifier.js'), require('./../../src/utilities/commentRemover'));
const HexMinifier = require('../../src/utilities/hexMinifier.js');
const HtmlMinifier = require('../../src/langDefaultMinifiers/htmlMinifier');
const JsonMinifier = require('../../src/langDefaultMinifiers/jsonMinifier');


suite('MinifyAll Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('File Path', () => {
		const result = MinifyAll.getNewFilePath(path, '/myFile.css', 'css');
		assert.deepStrictEqual(result, '/myFile-min.css');
	});


	test('Comment Remover', () => {
		const result = globalMinifiers.removeComments(
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


	test('Hexadecimal Minify (utilities/hexMinifier.js)', () => {
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

	test('JSON main Minify (/utilities/globalMinifiers.js)', () => {
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

	test('CSS main Minify (/utilities/globalMinifiers.js)', () => {
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

	test('HTML main Minify (/utilities/globalMinifiers.js)', () => {
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
});
