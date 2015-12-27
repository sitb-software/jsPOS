/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOComponent from './ISOComponent';
import ISOUtil from './ISOUtil';

class ISOField extends ISOComponent {

    constructor(n:Number, v:String) {
        super(n, v);
        this.fieldNumber = n;
        this.value = v;
    }


    getKey():Object {
        return this.fieldNumber;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }


    getBytes():Array {
        return this.value != null ? ISOUtil.str2bytes(this.value) : [];
    }
}

export default ISOField;
