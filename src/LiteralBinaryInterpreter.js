/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import BinaryInterpreter from './BinaryInterpreter';
import ISOUtil from './ISOUtil';
import Arrays from 'jsdk/util/Arrays';

class LiteralBinaryInterpreter extends BinaryInterpreter {


    interpret(data:Array, b:Array, offset:Number) {
        Arrays.arraycopy(data, 0, b, offset, data.length);
    }

    uninterpret(rawData:Array, offset:Number, length:Number):Array {
        let ret = new Array(length);
        Arrays.arraycopy(rawData, offset, ret, 0, length);
        return ret;
    }

    getPackedLength(nBytes:Number):Number {
        return nBytes;
    }
}
export default new LiteralBinaryInterpreter();
