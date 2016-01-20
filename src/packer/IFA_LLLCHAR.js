/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/18
 */

import ISOStringFieldPackager from './ISOStringFieldPackager';
import NullPadder from '../NullPadder';
import AsciiInterpreter from '../AsciiInterpreter';
import AsciiPrefixer from '../AsciiPrefixer';

class IFA_LLLCHAR extends ISOStringFieldPackager {

    constructor(len:Number, description:String) {
        super(len, description, NullPadder, AsciiInterpreter, AsciiPrefixer.LLL);
        this.checkLength(len, 999);
    }

    setLength(len:Number) {
        this.checkLength(len, 999);
        super.setLength(len);
    }
}

export default IFA_LLLCHAR;