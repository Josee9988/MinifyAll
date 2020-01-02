/* eslint-disable class-methods-use-this */
/**
 * @file File that contains all the main methods which contain the main
 * calls to functions to minify each language. Example: We will always call
 * minifyCssScssLessSass() to minify Css, Scss, Less or Sass when we want to
 * minify these extensions, even thought we are using different commands;
 * It also contains neccessary methods for minifying hexadecimal values
 * or removing comments. With this file we gain readability in the
 * main.js file.
 *
 * @author Jose Gracia Berenguer
 * @since 1.7.0
 * @see ../README.md
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */
import CommentRemover from '../controller/commentRemover';
import HexMinifier from '../controller/hexMinifier';
import cssMinifier from '../langDefaultMinifiers/cssMinifier';
import htmlMinifier from '../langDefaultMinifiers/htmlMinifier';
import jsonMinifier from '../langDefaultMinifiers/jsonMinifier';

/**
 * GlobalMinifiers contain functions that are used by multiple languages to be minifized.
 */
export default class GlobalMinifiers {

    constructor(private willMinifyHex: boolean) { }

    /**
     * Summary Function that does all the steps to minify all the css code.
     * @param {Array} cssContent css array to be minified.
     * @return {string} string with all the code minified.
     */
    public minifyCssScssLessSass(cssContent: string[]): string {
        const removeComments: string[] = this.removeComments(cssContent);
        const hexMinifiedCss: string[] = this.HexMinify(removeComments);
        const minifierCss: cssMinifier = new cssMinifier(hexMinifiedCss);
        return minifierCss.getCssMinified();
    }

    /**
     * Summary Function that does all the steps to minify all the json code.
     * @param {Array} jsonContent css array to be minified.
     * @return {string} string with all the code minified.
     */
    public minifyJsonJsonc(jsonContent: string[]): string {
        const contentWithHexMinified: string[] = this.HexMinify(jsonContent);
        const removeComments: string[] = this.removeComments(contentWithHexMinified);
        const minifierJson: jsonMinifier = new jsonMinifier(removeComments);
        return minifierJson.getJSONMinified();
    }

    /**
     * Summary Function that does all the steps to minify all the html code.
     * @param {Array} htmlContent css array to be minified.
     * @return {string} string with all the code minified.
     */
    public minifyHtml(htmlContent: string[]): string {
        const minifierHtml: htmlMinifier = new htmlMinifier(htmlContent);
        minifierHtml.removeMultipleLineComments();
        return minifierHtml.getHtmlMinified();
    }

    /**
     * Summary minifies hexadecimal code if enabled.
     *
     * Description receives an array with all the content,
     * and minifies it's hexadecimal, rgb and rgba values;
     * then return the new array;
     * If it is enabled it will initialize the HexMinifier
     * class and it will make all the processes and return
     * the new array of values OR it will simply return the
     * received value and do nothing.
     *
     * @access private
     *
     * @param {Array} content Array with all the lines to be hexMinified.
     *
     * @return {Array} with the colors minified.
     */
    public HexMinify(content: string[]): string[] {
        let returnValue: string[];

        if (this.willMinifyHex) {
            const hexMinifier: HexMinifier = new HexMinifier(content);
            // Minifier methods
            hexMinifier.shortHexMain();
            hexMinifier.shortRGBMain();
            hexMinifier.shortRGBAMain();
            returnValue = hexMinifier.getHexMinified();
        } else {
            returnValue = content;
        }
        return returnValue;
    }


    /**
     * Summary it removes the comments from a class.
     *
     * Description removeComments receives an array with the content
     * and removes single line and multiple line comments (//)(/* * /)
     * by calling the class removeComments and calling the method
     * removeCommentsMain, Then gets the result with getLineRemoved.
     *
     * @access private
     *
     * @param {Array} content All the content to remove the comments
     *
     * @return {string[]}
     */
    public removeComments(content: string[]): string[] {
        const removeComments = new CommentRemover(content);
        removeComments.removeCommentsMain();
        return removeComments.getCommentsRemoved();
    }
}
