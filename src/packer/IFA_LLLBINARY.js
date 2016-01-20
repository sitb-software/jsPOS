/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/18
 */

import ISOBinaryFieldPackager from './ISOBinaryFieldPackager';
import LiteralBinaryInterpreter from '../LiteralBinaryInterpreter';
import AsciiPrefixer from '../AsciiPrefixer';

class IFA_LLLBINARY extends ISOBinaryFieldPackager {

    // 构造
    constructor(len:Number, description:String) {
        super(len, description, LiteralBinaryInterpreter, AsciiPrefixer.LLL);
        this.checkLength(len, 999);
    }


    setLength(len:Number) {
        this.checkLength(len, 999);
        super.setLength(len);
    }
}

export default IFA_LLLBINARY;