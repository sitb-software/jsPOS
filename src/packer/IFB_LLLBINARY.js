/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOBinaryFieldPackager from './ISOBinaryFieldPackager';
import LiteralBinaryInterpreter from '../LiteralBinaryInterpreter';
import BcdPrefixer from '../BcdPrefixer';

class IFB_LLLBINARY extends ISOBinaryFieldPackager {

    // 构造
    constructor(len:Number, description:String) {
        super(len, description, LiteralBinaryInterpreter, BcdPrefixer.LLL);
    }


    setLength(len:Number) {
        this.checkLength(len, 999);
        super.setLength(len);
    }
}

export default IFB_LLLBINARY;