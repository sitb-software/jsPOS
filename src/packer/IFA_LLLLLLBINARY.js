/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/18
 */

import ISOBinaryFieldPackager from './ISOBinaryFieldPackager';
import LiteralBinaryInterpreter from '../LiteralBinaryInterpreter';
import AsciiPrefixer from '../AsciiPrefixer';

class IFA_LLLLLLBINARY extends ISOBinaryFieldPackager {

    // 构造
    constructor(len:Number, description:String) {
        super(len, description, LiteralBinaryInterpreter, AsciiPrefixer.LLLLLL);
        this.checkLength(len, 999999);
    }


    setLength(len:Number) {
        this.checkLength(len, 999999);
        super.setLength(len);
    }
}

export default IFA_LLLLLLBINARY;