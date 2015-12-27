/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/24
 */

import ISOStringFieldPackager from './ISOStringFieldPackager';
import LeftPadder from '../LeftPadder';
import BCDInterpreter from '../BCDInterpreter';
import NullPrefixer from '../NullPrefixer';

class IFB_NUMERIC extends ISOStringFieldPackager {
    /**
     * @param len - field len
     * @param description symbolic descrption
     * @param isLeftPadded left pad
     */
    constructor(len, description, isLeftPadded) {
        super(len, description, LeftPadder.ZERO_PADDER,
            isLeftPadded ? BCDInterpreter.LEFT_PADDED : BCDInterpreter.RIGHT_PADDED,
            NullPrefixer);
    }


    /** Must override ISOFieldPackager method to set the Interpreter correctly */
    setPad(pad:Boolean) {
        this.setInterpreter(pad ? BCDInterpreter.LEFT_PADDED : BCDInterpreter.RIGHT_PADDED);
        this.pad = pad;
    }
}

export default IFB_NUMERIC;