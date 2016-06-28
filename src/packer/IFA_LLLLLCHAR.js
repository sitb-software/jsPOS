/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/18
 */

import ISOStringFieldPackager from './ISOStringFieldPackager';
import NullPadder from '../NullPadder';
import AsciiInterpreter from '../AsciiInterpreter';
import AsciiPrefixer from '../AsciiPrefixer';

class IFA_LLLLLCHAR extends ISOStringFieldPackager {

    constructor(len:Number, description:String) {
        super(len, description, NullPadder, AsciiInterpreter, AsciiPrefixer.LLLLL);
        this.checkLength(len, 99999);
    }

    setLength(len:Number) {
        this.checkLength(len, 99999);
        super.setLength(len);
    }
}

export default IFA_LLLLLCHAR;