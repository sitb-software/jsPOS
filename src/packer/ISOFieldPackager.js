/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/24
 */

import ISOComponent from '../ISOComponent';
import ISOField from '../ISOField';

class ISOFieldPackager {

    constructor(len, description) {
        this.len = len;
        this.description = description;
        this.pad = false;
    }


    /**
     *
     * @param field {ISOComponent} field iso field component
     * @returns {Array} packed component
     */
    pack(field:ISOComponent):Array {
    }


    /**
     *
     * @param field the Component to unpack
     * @param msg binary image
     * @param offset starting offset within the binary image
     * @returns {Number} consumed bytes
     */
    unpack(field:ISOComponent, msg:Array, offset:Number):Number {
    }

    setPad(pad:Boolean) {
        this.pad = pad;
    }

    getLength() {
        return this.len;
    }

    setLength(len:Number) {
        this.len = len;
    }

    getDescription():String {
        return this.description;
    }

    /**
     * @returns {Number}
     */
    getMaxPackedLength() {
    }

    createComponent(fieldNumber:Number) {
        return new ISOField(fieldNumber, null);
    }

}

export default ISOFieldPackager;
