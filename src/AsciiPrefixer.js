/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/15
 */
import Prefixer from './Prefixer';

class AsciiPrefixer extends Prefixer {

    static LL = new AsciiPrefixer(2);
    static LLL = new AsciiPrefixer(3);

    nDigits;

    constructor(nDigits: Number) {
        super(nDigits);
        this.nDigits = nDigits;
    }

    encodeLength(length: Number, b: Array) {
        let n:Number = length;
        for (let i = this.nDigits - 1; i >= 0; i--) {
            b[i] = (n % 10).toString().charCodeAt(0);
            n /= 10;
        }
        if (parseInt(n, 10) != 0) {
            throw Error("invalid len " + length + ". Prefixing digits = " + this.nDigits);
        }
    }

    decodeLength(b, offset): Number {
        let len = '';
        for (let i = 0; i < this.nDigits; i++) {
            len += String.fromCharCode(b[offset + i]);
        }
        return parseInt(len);
    }

    getPackedLength(): Number {
        return this.nDigits;
    }
}

export default AsciiPrefixer;