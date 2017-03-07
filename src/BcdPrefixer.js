/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */
import Prefixer from './Prefixer';

class BcdPrefixer extends Prefixer {

    static LL = new BcdPrefixer(2);
    static LLL = new BcdPrefixer(3);

    nDigits;

    constructor(nDigits: Number) {
        super(nDigits);
        this.nDigits = nDigits;
    }

    encodeLength(length: Number, b: Array) {
        for (let i = this.getPackedLength() - 1; i >= 0; i--) {
            let twoDigits = length % 100;
            length /= 100;
            b[i] = (twoDigits / 10 << 4) + twoDigits % 10;
        }
    }

    decodeLength(b, offset): Number {
        let len = 0;
        for (let i = 0; i < Math.floor((this.nDigits + 1) / 2); i++) {
            len = 100 * len + ((b[offset + i] & 0xF0) >> 4) * 10 + (b[offset + i] & 0x0F);
        }
        return len;
    }

    getPackedLength(): Number {
        return this.nDigits + 1 >> 1;
    }
}

export default BcdPrefixer;