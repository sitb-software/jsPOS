/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/18
 */


import ISOBinaryFieldPackager from './ISOBinaryFieldPackager';
import AsciiHexInterpreter from '../AsciiHexInterpreter';
import NullPrefixer from '../NullPrefixer';

class IFA_BINARY extends ISOBinaryFieldPackager {

    constructor(len:Number, description:String) {
        super(len, description, AsciiHexInterpreter, NullPrefixer);
    }

}

export default IFA_BINARY;