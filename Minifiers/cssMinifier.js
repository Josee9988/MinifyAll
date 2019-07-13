/**
 * @file That is called when the user minifies a css document
 * This file receives the css document and returns the minified one.
 * @author Jose Gracia Berenguer
 * @since 0.1.0
 * @see ../README.md
 * @link https://github.com/Josee9988/MinifyAll
 */
class Minifier {
    /**
     * Minifier constructor that maps and trims the code.
     * @param {Array} cssContent all the code that will be minified 
     */
    constructor(cssContent) {
        this.cssContent = cssContent.map(content => content.trim());
    }

    /**
     * getCssMinified finds lasts spaces and trim it into just one line
     * @return {String} the line compressed
     */
    getCssMinified() {
        return this.cssContent.join('').replace(/;\}|\s+}/g, '}').replace(/\/\*.*?\*\//g, '').replace(/:\s/g, ':').replace(/ {/g, '{');
    }

    /**
     * shortHex function that checks every line of the original content, 
     * and looks for hexadecimal 6 digits and calls getShortHexColorCode
     * for getting a 3 digit hexadecimal value. Then it replaces the
     * original line with the shortened one.
     */
    shortHexMain() {
        for (let i = 0; i < this.cssContent.length; i++) {
            let hexadecimal = this.cssContent[i].match(/#[a-f\d]{6}/ig);
            if (hexadecimal != null) {
                let hexadecimalString = hexadecimal.toString();
                const shortHex = this.getShortHexColorCode(hexadecimalString);
                let newShortString = this.cssContent[i].replace(hexadecimalString, shortHex);
                this.cssContent[i] = newShortString;
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
        for (let i = 0; i < this.cssContent.length; i++) {
            let rgb = this.cssContent[i].match(/((rgb)\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig);
            if (rgb != null) {
                let rgbString = rgb.toString();
                let result = this.rgbArrayToObject(rgbString);
                const shortHex = this.rgbToShortHex(result);
                let newShortString = this.cssContent[i].replace(rgbString, shortHex);
                this.cssContent[i] = newShortString;

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