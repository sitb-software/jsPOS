/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOComponent from './ISOComponent';


class ISOBinaryField extends ISOComponent {

    fieldNumber = null;
    value = null;

    constructor(n:Number, v:Array) {
        super(n, v);
        this.fieldNumber = n;
        this.value = v;
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

    getBytes():Array {
        return this.value;
    }
}


export default ISOBinaryField;