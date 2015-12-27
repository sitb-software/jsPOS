/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOStringFieldPackager from './ISOStringFieldPackager';
import NullPadder from '../NullPrefixer';
import BCDInterpreter from '../BCDInterpreter';
import BcdPrefixer from '../BcdPrefixer';

class IFB_LLNUM extends ISOStringFieldPackager {

    constructor(len:Number, description:String, isLeftPadded:Boolean) {
        super(len, description, NullPadder,
            isLeftPadded ? BCDInterpreter.LEFT_PADDED : BCDInterpreter.RIGHT_PADDED,
            BcdPrefixer.LL);
    }


    setPad(pad:Boolean) {
        this.setInterpreter(pad ? BCDInterpreter.LEFT_PADDED : BCDInterpreter.RIGHT_PADDED);
        this.pad = pad;
    }

    setLength(len:Number) {
        this.checkLength(len, 99);
        super.setLength(len);
    }
}

export default IFB_LLNUM;