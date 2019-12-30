"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HexMinifier {
    constructor(cssContent) {
        this.cssContent = cssContent;
    }
    shortHexMain() {
        for (let i = 0; i < this.cssContent.length; i++) {
            const hexadecimal = this.cssContent[i].match(/#[0-9a-fA-F]+/ig);
            if (hexadecimal !== null && hexadecimal.toString().length === 7) {
                const hexadecimalString = hexadecimal.toString();
                const shortHex = this.getShortHexColorCode(hexadecimalString);
                const newShortString = this.cssContent[i].replace(hexadecimalString, shortHex);
                this.cssContent[i] = newShortString;
            }
        }
    }
    shortRGBMain() {
        for (let i = 0; i < this.cssContent.length; i++) {
            const rgb = this.cssContent[i].match(/((rgb)\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig);
            if (rgb !== null) {
                const rgbString = rgb.toString();
                const result = this.rgbArrayToObject(rgbString);
                const shortHex = this.rgbToShortHex(result);
                const newShortString = this.cssContent[i].replace(rgbString, shortHex);
                this.cssContent[i] = newShortString;
            }
        }
    }
    shortRGBAMain() {
        for (let i = 0; i < this.cssContent.length; i++) {
            const rgb = this.cssContent[i].match(/((rgba)\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig);
            if (rgb !== null) {
                const rgbaString = rgb.toString();
                const percent = rgbaString.match(/[%]/g);
                if (percent === null) {
                    const result = this.rgba2hex(rgbaString);
                    const newShortString = this.cssContent[i].replace(rgbaString, result.toString().toUpperCase());
                    this.cssContent[i] = newShortString;
                }
            }
        }
    }
    rgba2hex(rgba) {
        let a;
        const rgb = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
        const alpha = (rgb && rgb[4] || '').trim();
        let hex = rgb ?
            (rgb[1] | 1 << 8).toString(16).slice(1) +
                (rgb[2] | 1 << 8).toString(16).slice(1) +
                (rgb[3] | 1 << 8).toString(16).slice(1) : rgba;
        if (alpha !== '') {
            a = alpha;
        }
        else {
            a = 0o1;
        }
        a = ((a * 255) | 1 << 8).toString(16).slice(1);
        hex += a;
        return `#${hex.toString().toUpperCase()}`;
    }
    rgbArrayToObject(rgbString) {
        const matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
        const match = matchColors.exec(rgbString);
        return match ? {
            r: parseInt(match[1], 16),
            g: parseInt(match[2], 16),
            b: parseInt(match[3], 16),
        } : null;
    }
    getShortHexColorCode(code) {
        const rgb = this.hexToRgb(code);
        return this.rgbToShortHex(rgb).toUpperCase();
    }
    hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : null;
    }
    rgbToShortHex(rgb) {
        const hexR = Math.round(rgb.r / 17).toString(16);
        const hexG = Math.round(rgb.g / 17).toString(16);
        const hexB = Math.round(rgb.b / 17).toString(16);
        return `#${hexR}${hexG}${hexB}`;
    }
    getHexMinified() {
        return this.cssContent;
    }
}
exports.default = HexMinifier;
//# sourceMappingURL=hexMinifier.js.map