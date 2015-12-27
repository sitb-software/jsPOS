/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/24
 */
import Interpreter from './Interpreter';
import ISOUtil from './ISOUtil';

class BCDInterpreter extends Interpreter {
    static LEFT_PADDED = new BCDInterpreter(true, false);
    static RIGHT_PADDED = new BCDInterpreter(false, false);

    constructor(leftPadded, fPadded) {
        super(leftPadded, fPadded);
        this.leftPadded = leftPadded;
        this.fPadded = fPadded;
    }


    interpret(data, byte, offset) {
        ISOUtil.str2bcd(data, this.leftPadded, byte, offset);
        let paddedSize = data.length >> 1;
        if (this.fPadded && data.length % 2 === 1) {
            if (this.leftPadded) {
                byte[offset] |= 0xF0;
            } else {
                byte[offset + paddedSize] |= 0x0F;
            }
        }
    }

    uninterpret(rawData, offset, length) {
        return ISOUtil.bcd2str(rawData, offset, length, this.leftPadded);
    }

    getPackedLength(nDataUnits:Number):Number {
        return Math.floor((nDataUnits + 1) / 2);
    }
}

export default BCDInterpreter;