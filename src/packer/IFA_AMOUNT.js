/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/18
 */

import ISOAmountFieldPackager from './ISOAmountFieldPackager';
import LeftPadder from '../LeftPadder';
import AsciiInterpreter from '../AsciiInterpreter';
import NullPrefixer from '../NullPrefixer';

class IFA_AMOUNT extends ISOAmountFieldPackager {

    constructor(len:Number, description:String) {
        super(len, description, LeftPadder.ZERO_PADDER, AsciiInterpreter, NullPrefixer)
    }
}

export default IFA_AMOUNT;