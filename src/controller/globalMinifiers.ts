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
export default class GlobalMinifiers {
    constructor(HexMinifier, commentRemover) {
        this.HexMinifier = HexMinifier;
        this.CommentRemover = commentRemover;
    }

    /**
     * Summary Function that does all the steps to minify all the css code.
     * @param {Array} cssContent css array to be minified.
     * @return {string} string with all the code minified.
     */
    minifyCssScssLessSass(cssContent) {
        const CssMinifier = require('../langDefaultMinifiers/cssMinifier.js');
        const RemoveComments = this.removeComments(cssContent);
        const hexMinifiedCss = this.HexMinify(RemoveComments);
        const minifierCss = new CssMinifier(hexMinifiedCss);
        return minifierCss.getCssMinified();
    }

    /**
     * Summary Function that does all the steps to minify all the json code.
     * @param {Array} jsonContent css array to be minified.
     * @return {string} string with all the code minified.
     */
    minifyJsonJsonc(jsonContent) {
        const JsonMinifier = require('../langDefaultMinifiers/jsonMinifier.js');
        const contentWithHexMinified = this.HexMinify(jsonContent);
        const RemoveComments = this.removeComments(contentWithHexMinified);
        const minifierJson = new JsonMinifier(RemoveComments);
        return minifierJson.getJSONMinified();
    }

    /**
     * Summary Function that does all the steps to minify all the html code.
     * @param {Array} htmlContent css array to be minified.
     * @return {string} string with all the code minified.
     */
    minifyHtml(htmlContent) {
        const HtmlMinifier = require('../langDefaultMinifiers/htmlMinifier.js');
        const minifierHtml = new HtmlMinifier(htmlContent);
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
     * @param {Array} Content Array with all the lines to be hexMinified.
     *
     * @return {Array} with the colors minified.
     */
    HexMinify(Content) {
        let MinifierHex;
        let returnValue;

        if (this.HexMinifier !== null) {
            MinifierHex = new this.HexMinifier(Content);
            // Minifier methods
            MinifierHex.shortHexMain();
            MinifierHex.shortRGBMain();
            MinifierHex.shortRGBAMain();
            returnValue = MinifierHex.getHexMinified();
        } else {
            returnValue = Content;
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
     * @param {Array} content All the content to remove the comments
     */
    removeComments(content) {
        const RemoveComments = new this.CommentRemover(content);
        RemoveComments.removeCommentsMain();
        return RemoveComments.getCommentsRemoved();
    }
}
