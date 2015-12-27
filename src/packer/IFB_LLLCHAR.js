/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOStringFieldPackager from './ISOStringFieldPackager';
import NullPadder from '../NullPadder';
import AsciiInterpreter from '../AsciiInterpreter';
import BcdPrefixer from '../BcdPrefixer';

class IFB_LLLCHAR extends ISOStringFieldPackager {

    constructor(len:Number, description:String) {
        super(len, description, NullPadder, AsciiInterpreter, BcdPrefixer.LLL);
        this.checkLength(len, 999);
    }


    setLength(len:Number) {
        this.checkLength(len, 999);
        super.setLength(len);
    }
}

export default IFB_LLLCHAR;