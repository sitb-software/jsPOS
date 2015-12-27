/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOComponent from './ISOComponent';
class ISOBitMap extends ISOComponent {

    constructor(n:Number, value) {
        super(n, value);
        this.fieldNumber = n;
        this.value = value;
    }


    setFieldNumber(fieldNumber:Number) {
        this.fieldNumber = fieldNumber;
    }

    getFieldNumber():Number {
        return this.fieldNumber;
    }


    getKey():Object {
        return this.fieldNumber;
    }

    getValue():Object {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }
}

export default ISOBitMap;