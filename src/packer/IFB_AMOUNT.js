/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOFieldPackager from './ISOFieldPackager';
import BCDInterpreter from '../BCDInterpreter';
import ISOComponent from '../ISOComponent';
import ISOUtil from '../ISOUtil';

class IFB_AMOUNT extends ISOFieldPackager {

    constructor(len:Number, description:String, pad:Boolean) {
        super(len, description);
        this.pad = pad;
        this.interpreter = pad ? BCDInterpreter.LEFT_PADDED : BCDInterpreter.RIGHT_PADDED;
    }

    pack(field:ISOComponent):Array {
        let s = field.getValue();
        let amount = ISOUtil.zeropad(s.substring(1), this.getLength() - 1);
        let b = new Array(1 + (this.getLength() >> 1));
        b[0] = s.charCodeAt(0);
        this.interpreter.interpreter(amount, b, 1);
        return b;
    }

    unpack(field:ISOComponent, msg:Array, offset:Number):Number {
        let d = ISOUtil.byte2str(msg, offset, 1) + this.interpreter.uninterpret(msg, offset + 1, this.getLength() - 1);
        field.setValue(d);
        return 1 + (this.getLength() >> 1);
    }

    getMaxPackedLength():Number {
        return 1 + (this.getLength() >> 1);
    }
}

export default IFB_AMOUNT;