/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOStringFieldPackager from './ISOStringFieldPackager';
import NullPadder from '../NullPadder';
import BcdPrefixer from '../BcdPrefixer';
import BCDInterpreter from '../BCDInterpreter';

class IFB_LLLNUM extends ISOStringFieldPackager {

    constructor(len:Number, description:String, isLeftPadded) {
        super(len, description, NullPadder,
            isLeftPadded ? BCDInterpreter.LEFT_PADDED : BCDInterpreter.RIGHT_PADDED,
            BcdPrefixer.LLL);
        this.checkLength(len, 999);
    }


    setLength(len:Number) {
        this.checkLength(len, 999);
        super.setLength(len);
    }
}

export default IFB_LLLNUM;