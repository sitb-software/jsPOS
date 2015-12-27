/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */


import Interpreter from './Interpreter';
import ISOUtil from './ISOUtil';
import Arrays from 'jsdk/util/Arrays';

class LiteralInterpreter extends Interpreter {

    // 构造
    constructor() {
        super();
    }


    interpret(data:String, byte:Array, offset:Number) {
        let raw = ISOUtil.str2bytes(data);
        Arrays.arraycopy(raw, 0, byte, offset, raw.length);
    }

    uninterpret(rawData, offset, length):String {
        return ISOUtil.byte2str(rawData, offset, length);
    }

    getPackedLength(nDataUnits:Number):Number {
        return nDataUnits;
    }
}

export default new LiteralInterpreter();
