/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/24
 */

import ISOFieldPackager from './ISOFieldPackager';
import Padder from '../Padder';
import Interpreter from '../Interpreter';
import Prefixer from '../Prefixer';
import ISOComponent from '../ISOComponent';

class ISOStringFieldPackager extends ISOFieldPackager {

    constructor(maxLength, description, padder, interpreter, prefixer) {
        super(maxLength, description);
        this.interpreter = interpreter;
        this.padder = padder;
        this.prefixer = prefixer;
    }

    /**
     * Sets the Padder.
     * @param padder The padder to use during packing and unpacking.
     */
    setPadder(padder: Padder) {
        this.padder = padder;
    }

    /**
     * Sets the Interpreter.
     * @param interpreter The interpreter to use in packing and unpacking.
     */
    setInterpreter(interpreter: Interpreter) {
        this.interpreter = interpreter;
    }

    setPrefixer(prefixer: Prefixer) {
        this.prefixer = prefixer;
    }

    checkLength(len: Number, maxLength: Number) {
        if (len > maxLength) {
            throw Error(`Length ${len} too long for ${this.name}`);
        }
    }


    /**
     * Returns the prefixer's packed length and the interpreter's packed length.
     */
    getMaxPackedLength(): Number {
        return this.prefixer.getPackedLength() + this.interpreter.getPackedLength(this.getLength());
    }


    pack(field: ISOComponent): Array {
        let data = field.getValue().toString();
        if (data.length > this.getLength()) {
            throw Error(`Field length ${data.length} too long. Max: ${this.getLength()}`)
        }
        let paddedData = this.padder.pad(data, this.getLength());
        let len = this.prefixer.getPackedLength() + this.interpreter.getPackedLength(paddedData.length);
        let rawData = new Array(len);
        this.prefixer.encodeLength(paddedData.length, rawData);
        this.interpreter.interpret(paddedData, rawData, this.prefixer.getPackedLength());
        return rawData;
    }

    unpack(field: ISOComponent, msg: Array, offset: Number): Number {
        let len = this.prefixer.decodeLength(msg, offset);
        if (len === -1) {
            // The prefixer doesn't know how long the field is, so use
            // maxLength instead
            len = this.getLength();
        } else if (this.getLength() > 0 && len > this.getLength()) {
            throw Error(`Field length ${len} to long. Max: ${this.getLength()}`);
        }

        let lenLen = this.prefixer.getPackedLength();
        let unpacked = this.interpreter.uninterpret(msg, offset + lenLen, len);
        field.setValue(unpacked);
        return lenLen + this.interpreter.getPackedLength(len);
    }
}

export default ISOStringFieldPackager;