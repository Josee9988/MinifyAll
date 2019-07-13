/**
 * @file That is called when the user minifies a json document
 * This file receives the json document and returns the minified one.
 * @author Jose Gracia Berenguer
 * @since 0.2.0
 * @see ../README.md
 * @link https://github.com/Josee9988/MinifyAll
 */

class Minifier {
    /**
     * Minifier constructor that maps and trims the code.
     * @param {Array} jsonContent all the code that will be minified 
     */
    constructor(jsonContent) {
        this.jsonContent = jsonContent.map(content => content.trim());
    }

    /**
     * getJSONMinified finds lasts spaces and trim it into just one line
     * @return {String} the line compressed
     */
    getJSONMinified() {
        return this.jsonContent.join('').replace(/;\}|\s+}/g, '}').replace(/\/\*.*?\*\//g, '').replace(/:\s/g, ':').replace(/ {/g, '{').replace(/[ \t]/g, '');
    }

    /**
     * removeSingleLineComments checks line by line 
     * and removes the single lines comments //
     */
    removeSingleLineComments() {
        for (let i = 0; i < this.jsonContent.length; i++) {
            let hexadecimal = this.jsonContent[i].replace(/[/]+.*/g, '');
            if (hexadecimal != null) {
                this.jsonContent[i].replace(/[/]+.*/g, '');
                this.jsonContent[i] = hexadecimal;
            }
        }
    }

    /**
     * removeMultipleLineComments checks line by line
     * and removes the multiple line comments
     * it only removes the content inside the comments
     * if the multiple line comment is placed in a line
     * with usefull code it will not be replaced.
     */
    removeMultipleLineComments() {
        console.log("Multi line comments;");
        for (let i = 0; i < this.jsonContent.length; i++) {
            let begin = this.jsonContent[i].match(/(\/\*)/ig); // first /* found
            if (begin != null) {
                for (let j = 0; j < this.jsonContent.length; j++) {
                    let end = this.jsonContent[j].match(/(\*\/)/g); //found */ end
                    if (end != null) {
                        for (let k = i; k < j + 1; k++) {
                            if (k == i) {
                                let FirstCharacterToRemove = this.jsonContent[k].indexOf("/*");
                                let firstLineToReplace = this.jsonContent[k].substring(0, FirstCharacterToRemove);
                                this.jsonContent[k] = firstLineToReplace;
                            } else if (k == j) {
                                let lastCharacterToRemove = this.jsonContent[k].indexOf("*/");
                                let lasttLineToReplace = this.jsonContent[k].substring(lastCharacterToRemove + 2, this.jsonContent[k].length);
                                this.jsonContent[k] = lasttLineToReplace;

                            } else {
                                this.jsonContent[k] = '';

                            }
                        }
                        break;
                    }

                }
            }
        }
    }

    /**
     * shortHex function that checks every line of the original content, 
     * and looks for hexadecimal 6 digits and calls getShortHexColorCode
     * for getting a 3 digit hexadecimal value. Then it replaces the
     * original line with the shortened one.
     */
    shortHexMain() {
        for (let i = 0; i < this.jsonContent.length; i++) {
            let hexadecimal = this.jsonContent[i].match(/#[a-f\d]{6}/ig);
            if (hexadecimal != null) {
                let hexadecimalString = hexadecimal.toString();
                let shortHex = this.getShortHexColorCode(hexadecimalString);
                let newShortString = this.jsonContent[i].replace(hexadecimalString, shortHex);
                this.jsonContent[i] = newShortString;
            }
        }
    }

    /**
     * shortRGBMain function that checks every line of the original content
     * and looks for rgb values and calls rgbToShortHex
     * for getting a 3 digit hexadecimal value.
     * Then it replaces the original line with the shortened one.
     */
    shortRGBMain() {
        for (let i = 0; i < this.jsonContent.length; i++) {
            let rgb = this.jsonContent[i].match(/((rgb)\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig);
            if (rgb != null) {
                let rgbString = rgb.toString();
                let result = this.rgbArrayToObject(rgbString);
                let shortHex = this.rgbToShortHex(result);
                let newShortString = this.jsonContent[i].replace(rgbString, shortHex);
                this.jsonContent[i] = newShortString;
            }
        }
    }

    /**
     * rgbArrayToObject receives a String with the rgb and turns it into
     * an object with r, g, and b value.
     * @param {String} rgbString a string with the rgb and its values
     * @return {Object} rgb
     */
    rgbArrayToObject(rgbString) {
        let matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
        let match = matchColors.exec(rgbString);
        return match ? {
            r: parseInt(match[1], 16),
            g: parseInt(match[2], 16),
            b: parseInt(match[3], 16)
        } : null;
    }

    /**
     * getShortHexColorCode receives the 6digit hex code
     * calls the needed functions and returns a 3digit hex
     * @param {String} code 
     * @return {String} this.rgbToShortHex(rgb)
     */
    getShortHexColorCode(code) {
        var rgb = this.hexToRgb(code);
        return this.rgbToShortHex(rgb);
    }

    /**
     * hexToRgb receives a String with an hexadecimal value
     * and returns red green and blue values
     * @param {String} hex 
     * @return {Object} r g b integers result with the red, yellow and
     */
    hexToRgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * rgbToShortHex receives an object with red green and blue values
     * then it shorts red green and blue into just one number
     * and it will finally get a 3 digit hex
     * @param {Object} rgb 
     * @return {String} with the 3 digit hex value
     */
    rgbToShortHex(rgb) {
        var hexR = Math.round(rgb.r / 17).toString(16);
        var hexG = Math.round(rgb.g / 17).toString(16);
        var hexB = Math.round(rgb.b / 17).toString(16);
        return "#" + hexR + "" + hexG + "" + hexB;
    }
}
module.exports = Minifier;