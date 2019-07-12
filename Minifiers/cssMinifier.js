/**
 * @file That is called when the user minifies a css document
 * This file receives the css document and returns the minified one.
 * @author Jose Gracia Berenguer
 * @since 0.1.0
 * @see ../README.md
 * @link https://github.com/Josee9988/MinifyAll
 */
class Minifier {
    constructor(cssContent) {
        this.cssContent = cssContent.map(content => content.trim());
        //this.hexadecimalList = {};

    }

    shortHex() {
        for (let i = 0; i < this.cssContent.length; i++) {
            let hexadecimal = this.cssContent[i].match(/#[a-f\d]{6}/ig);
            if (hexadecimal != null) {
                let hexadecimalString = hexadecimal.toString();
                if (hexadecimalString.length == 7) {
                    const shortHex = this.getShortHexColorCode(hexadecimalString);
                    let newShortString = this.cssContent[i].replace(hexadecimalString, shortHex);
                    this.cssContent[i] = newShortString;
                }
            }

        }
    }

    hexToRgb(hex) {

        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
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

    rgbToShortHex(rgb) {
        var hexR = Math.round(rgb.r / 17).toString(16);
        var hexG = Math.round(rgb.g / 17).toString(16);
        var hexB = Math.round(rgb.b / 17).toString(16);
        return "#" + hexR + "" + hexG + "" + hexB;
    }

    getShortHexColorCode(code) {
        var rgb = this.hexToRgb(code);
        return this.rgbToShortHex(rgb);
    }



    endWork() {
        return this.cssContent.join('').replace(/;\}|\s+}/g, '}').replace(/\/\*.*?\*\//g, '');
    }




}

module.exports = Minifier;