/**
 * @file file that contains the function that returns the new file path.
 *
 * @since 1.9.1
 * @author Jose Gracia Berenguer
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */


/**
 * Summary sets the path to the new file with minified code.
 *
 * Description receives the object path, the absolute path
 * and the name of the extension without a dot, then it creates
 * the new path to the new file with the minified text.
 *
 * @param {Object} path the object path imported from vscode/node.
 * @param {String} fileName the Full path with the name and extension to the current
 * file (the non minified one).
 * @param {String} extensionWithOutDot the name of the extension (css, js, html).
 * @return {String} path2NewFile the path to the new file which will have
 * the minified code.
 */

// tslint:disable-next-line: max-line-length
export default function getNewFilePath(path: any, fileName: string, extensionWithOutDot: string, prefixUsed: string = '-min'): string {
    const filePath = path.dirname(fileName);
    const newName = path.basename(fileName).replace(`.${extensionWithOutDot}`, `${prefixUsed}.${extensionWithOutDot}`);
    const path2NewFile = path.join(filePath, newName);
    return path2NewFile;
}
