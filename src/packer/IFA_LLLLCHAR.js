/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/18
 */

import ISOStringFieldPackager from './ISOStringFieldPackager';
import NullPadder from '../NullPadder';
import AsciiInterpreter from '../AsciiInterpreter';
import AsciiPrefixer from '../AsciiPrefixer';

class IFA_LLLLCHAR extends ISOStringFieldPackager {

    constructor(len:Number, description:String) {
        super(len, description, NullPadder, AsciiInterpreter, AsciiPrefixer.LLLL);
        this.checkLength(len, 9999);
    }

    setLength(len:Number) {
        this.checkLength(len, 9999);
        super.setLength(len);
    }
}

export default IFA_LLLLCHAR;