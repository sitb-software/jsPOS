/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/18
 */

import ISOFieldPackager from './ISOFieldPackager';
import Padder from '../Padder';
import Interpreter from '../Interpreter';
import Prefixer from '../Prefixer';
import ISOComponent from '../ISOComponent';

class ISOAmountFieldPackager extends ISOFieldPackager {

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
    setPadder(padder:Padder) {
        this.padder = padder;
    }

    /**
     * Sets the Interpreter.
     * @param interpreter The interpreter to use in packing and unpacking.
     */
    setInterpreter(interpreter:Interpreter) {
        this.interpreter = interpreter;
    }

    setPrefixer(prefixer:Prefixer) {
        this.prefixer = prefixer;
    }

    checkLength(len:Number, maxLength:Number) {
        if (len > maxLength) {
            throw Error(`Length ${len} too long for ${this.name}`);
        }
    }

    /**
     * Returns the prefixer's packed length and the interpreter's packed length.
     */
    getMaxPackedLength():Number {
        return this.prefixer.getPackedLength() + this.interpreter.getPackedLength(this.getLength());
    }

    pack(field:ISOComponent):Array {
        let data = field.getValue();
        if (data.length > this.getLength()) {
            throw Error(`Field length ${data.length} too long. Max: ${this.getLength()}`)
        }

        let sign = data.substring(0, 1);
        let amount = data.substring(1);

        let paddedData = this.padder.pad(amount, this.getLength() -1);
        let signLength = this.interpreter.getPackedLength(1);

        let len = this.prefixer.getPackedLength() + this.interpreter.getPackedLength(paddedData.length);
        
        let rawData = new Array(this.prefixer.getPackedLength()
                    + signLength
                    + this.interpreter.getPackedLength(paddedData.length));

        this.prefixer.encodeLength(paddedData.length, rawData);

        this.interpreter.interpret(sign, rawData, this.prefixer.getPackedLength());
        this.interpreter.interpret(paddedData, rawData, this.prefixer.getPackedLength() + signLength);

        return rawData;
    }

    unpack(field:ISOComponent, b:Array, offset:Number):Number {
        let len = this.prefixer.decodeLength(b, offset);
        if (len === -1) {
            // The prefixer doesn't know how long the field is, so use
            // maxLength instead
            len = this.getLength();
        }
        else if (this.getLength() > 0 && len > this.getLength()) {
            throw Error(`Field length ${len} too long. Max: ${this.getLength()}`)
        }

        let lenLen = this.prefixer.getPackedLength();
        let unpacked = this.interpreter.uninterpret(b, offset + lenLen, len);
        field.setValue(unpacked);
        return lenLen + this.interpreter.getPackedLength(len);
    }
}

export default ISOAmountFieldPackager;
