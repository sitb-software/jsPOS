/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOBinaryFieldPackager from './ISOBinaryFieldPackager';
import LiteralBinaryInterpreter from '../LiteralBinaryInterpreter';
import BcdPrefixer from '../BcdPrefixer';
class IFB_LLBINARY extends ISOBinaryFieldPackager {

    constructor(len:Number, description:String) {
        super(len, description, LiteralBinaryInterpreter, BcdPrefixer.LL);
        this.checkLength(len, 99);
    }

    setLength(len:Number) {
        this.checkLength(len, 99);
        super.setLength(len);
    }

}

export default IFB_LLBINARY;