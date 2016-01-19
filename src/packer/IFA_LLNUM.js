/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/15
 */

import ISOStringFieldPackager from './ISOStringFieldPackager';
import NullPadder from '../NullPadder';
import AsciiPrefixer from '../AsciiPrefixer';
import AsciiInterpreter from '../AsciiInterpreter';

class IFA_LLNUM extends ISOStringFieldPackager {

    constructor(len:Number, description:String) {
        super(len, description, NullPadder, AsciiInterpreter, AsciiPrefixer.LL);
        this.checkLength(len, 99);
    }

    setLength(len:Number) {
        this.checkLength(len, 99);
        super.setLength(len);
    }
}

export default IFA_LLNUM;