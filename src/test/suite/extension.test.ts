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
import * as path from 'path';
import * as vscode from 'vscode';

import getNewFilePath from '../../controller/getNewFilePath';

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
			const COMMANDS: string[] = [
				'extension.MinifyAll',
				'extension.MinifyAll2OtherDoc',
				'extension.MinifyAll2OtherDocSelected',
				'extension.MinifyAllSelectedText',
			];
			const foundLiveServerCommands: any = commands.filter((value) =>
				COMMANDS.indexOf(value) >= 0 || value.startsWith('extension.minifyall.'));
			assert.equal(foundLiveServerCommands.length, COMMANDS.length);
		}));


	test('Function \'getNewFilePath\' works', () => {
		const result: string = getNewFilePath(path, 'myFile.css', 'css');
		assert.deepStrictEqual(result, 'myFile-min.css');
	});
});
