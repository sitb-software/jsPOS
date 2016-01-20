/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/15
 */

import ISOBitMapPackager from './ISOBitMapPackager';
import ISOComponent from '../ISOComponent';
import ISOUtil from '../ISOUtil';
import BitSet from 'jsdk/util/BitSet';

class IFA_BITMAP extends ISOBitMapPackager {

    constructor(len: Number, description: String) {
        super(len, description);
    }

    pack(field: ISOComponent): Array {
        //noinspection JSValidateTypes
        let b: BitSet = field.getValue();
        let len = this.getLength() >= 8 ? b.length() + 62 >> 6 << 3 : this.getLength();
        
        let hexString = ISOUtil.hexString(ISOUtil.bitSet2byte(b, len));
       
        var result = [];
        for (var i = 0; i < hexString.length; i++) {
            result.push(hexString.charCodeAt(i));
        }

        return result;
    }

    getMaxPackedLength() {
        return this.getLength() >> 2;
    }

    unpack(field: ISOComponent, msg: Array, offset: Number): Number {
        let len,
            bmap: BitSet = ISOUtil.hex2BitSet(msg, offset, this.getLength() << 3);
        field.setValue(bmap);

        len = bmap.get(1) ? 128 : 64;
        if (this.getLength() > 16 && bmap.get(65)) {
            len = 192;
            bmap.clear(65);
        }

        return Math.min(this.getLength() << 1, len >> 2);
    }
}

export default IFA_BITMAP;