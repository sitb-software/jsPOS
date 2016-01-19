/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/15
 */

import ISOStringFieldPackager from './ISOStringFieldPackager';
import LeftPadder from '../LeftPadder';
import AsciiInterpreter from '../AsciiInterpreter';
import NullPrefixer from '../NullPrefixer';

class IFA_NUMERIC extends ISOStringFieldPackager {
    /**
     * @param len - field len
     * @param description symbolic descrption
     */
    constructor(len, description) {
        super(len, description, LeftPadder.ZERO_PADDER, AsciiInterpreter, NullPrefixer);
    }
}

export default IFA_NUMERIC;