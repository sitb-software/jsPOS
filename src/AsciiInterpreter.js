/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import Interpreter from './Interpreter';
import ISOUtil from './ISOUtil';
import Arrays from 'jsdk/util/Arrays'

class AsciiInterpreter extends Interpreter {


    interpret(data:String, byte:Array, offset:Number) {
        let raw = ISOUtil.str2bytes(data);
        Arrays.arraycopy(raw, 0, byte, offset, raw.length);
    }

    uninterpret(rawData, offset, length):String {
        let ret = new Array(length);
        Arrays.arraycopy(rawData, offset, ret, 0, length);
        return ISOUtil.byte2str(ret, 0, ret.length);
    }

    getPackedLength(nDataUnits:Number):Number {
        return nDataUnits;
    }
}

export default new AsciiInterpreter();