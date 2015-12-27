/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOStringFieldPackager from './ISOStringFieldPackager';
import RightTPadder from '../RightTPadder';
import LiteralInterpreter from '../LiteralInterpreter';
import NullPrefixer from '../NullPrefixer';

class IF_CHAR extends ISOStringFieldPackager {
    constructor(len:Number, description:String) {
        super(len, description, RightTPadder.SPACE_PADDER, LiteralInterpreter, NullPrefixer);
    }
}

export default IF_CHAR;