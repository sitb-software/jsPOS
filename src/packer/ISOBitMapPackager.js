/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOFieldPackager from './ISOFieldPackager';
import ISOComponent from '../ISOComponent';
import ISOBitMap from '../ISOBitMap';

class ISOBitMapPackager extends ISOFieldPackager {

    constructor(len, description) {
        super(len, description);
    }

    createComponent(fieldNumber:Number) {
        return new ISOBitMap(fieldNumber, null);
    }
}

export default ISOBitMapPackager;