/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOFieldPackager from './ISOFieldPackager';
import Prefixer from '../Prefixer';
import BinaryInterpreter from '../BinaryInterpreter';
import ISOComponent from '../ISOComponent';
import ISOBinaryField from '../ISOBinaryField';


class ISOBinaryFieldPackager extends ISOFieldPackager {

    constructor(maxLength:Number, description:String, interpreter:BinaryInterpreter, prefixer:Prefixer) {
        super(maxLength, description);
        this.interpreter = interpreter;
        this.prefixer = prefixer;
    }

    /**
     * Sets the Interpreter.
     * @param interpreter The interpreter to use in packing and unpacking.
     */
    setInterpreter(interpreter:BinaryInterpreter) {
        this.interpreter = interpreter;
    }

    /**
     * Sets the length prefixer.
     * @param prefixer The length prefixer to use during packing and unpacking.
     */
    setPrefixer(prefixer:Prefixer) {
        this.prefixer = prefixer;
    }

    getMaxPackedLength():Number {
        return this.prefixer.getPackedLength() + this.interpreter.getPackedLength(this.getLength());
    }


    pack(c:ISOComponent):Array {
        let data = c.getBytes();
        let packedLength = this.prefixer.getPackedLength();
        if (packedLength === 0 && data.length != this.getLength()) {
            throw Error(`Binary data length not the same as the packager length (${data.length}/${this.getLength()})`);
        }
        let ret = new Array(this.interpreter.getPackedLength(data.length) + packedLength);
        this.prefixer.encodeLength(data.length, ret);
        this.interpreter.interpret(data, ret, packedLength);
        return ret;
    }


    unpack(field:ISOComponent, b:Array, offset:Number):Number {
        let len = this.prefixer.decodeLength(b, offset);
        if (len === -1) {
            len = this.getLength();
        } else if (this.getLength() > 0 && len > this.getLength()) {
            throw Error(`Field length ${len} too long. Max: ${this.getLength()}`);
        }
        let lenLen = this.prefixer.getPackedLength();
        let unpacked = this.interpreter.uninterpret(b, offset + lenLen, len);
        field.setValue(unpacked);
        return lenLen + this.interpreter.getPackedLength(len);
    }


    createComponent(fieldNumber:Number) {
        return new ISOBinaryField(fieldNumber);
    }

    checkLength(len:Number, maxLength:Number) {
        if (len > maxLength) {
            throw Error(`Length ${len} too long for ${this.name}`);
        }
    }
}

export default ISOBinaryFieldPackager;
