/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */


import ISOBinaryFieldPackager from './ISOBinaryFieldPackager';
import LiteralBinaryInterpreter from '../LiteralBinaryInterpreter';
import NullPrefixer from '../NullPrefixer';

class IFB_BINARY extends ISOBinaryFieldPackager {

    constructor(len:Number, description:String) {
        super(len, description, LiteralBinaryInterpreter, NullPrefixer);
    }

}

export default IFB_BINARY;