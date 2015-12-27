/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOBitMapPackager from './ISOBitMapPackager';
import ISOComponent from '../ISOComponent';
import ISOUtil from '../ISOUtil';
import BitSet from 'jsdk/util/BitSet';

class IFB_BITMAP extends ISOBitMapPackager {

    constructor(len:Number, description:String) {
        super(len, description);
    }


    pack(field:ISOComponent):Array {
        //noinspection JSValidateTypes
        let b:BitSet = field.getValue();
        let len = this.getLength() >= 8 ? b.length() + 62 >> 6 << 3 : this.getLength();
        return ISOUtil.bitSet2byte(b, len);
    }


    unpack(field:ISOComponent, msg:Array, offset:Number):Number {
        let len,
            bmap = ISOUtil.byte2BitSet(msg, offset, this.getLength() << 3);
        field.setValue(bmap);
        len = bmap.get(1) ? 128 : 64;
        if (this.getLength() > 16 && bmap.get(65)) {
            len = 192;
        }

        return Math.min(this.getLength(), len >> 3);
    }
}

export default IFB_BITMAP;