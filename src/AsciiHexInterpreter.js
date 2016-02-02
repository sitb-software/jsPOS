/**
 * @author Bruno bruno.camargos@gmail.com
 * @date 2016/01/18
 */


import BinaryInterpreter from './BinaryInterpreter';
import {
    Character
}
from 'jsdk';

/** 0-15 to ASCII hex digit lookup table. */
let HEX_ASCII = [
    0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37,
    0x38, 0x39, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46
];

class AsciiHexInterpreter extends BinaryInterpreter {

    interpret(data: Array, b: Array, offset: Number) {
        for (let i = 0; i < data.length; i++) {
            b[offset + i * 2] = HEX_ASCII[(data[i] & 0xF0) >> 4];
            // b[offset + i * 2] = ((data[i] & 0xF0) >> 4).toString(16).charCodeAt(0); /*it works too, but in lowercase*/
            b[offset + i * 2 + 1] = HEX_ASCII[data[i] & 0x0F];
            // b[offset + i * 2 + 1] = (data[i] & 0x0F).toString(16).charCodeAt(0); /*it works too, but in lowercase*/
        }
    }

    uninterpret(rawData: Array, offset: Number, length: Number): Array {
        let d = new Array(length);
        for (let i = 0; i < length * 2; i++) {
            let shift = i % 2 === 1 ? 0 : 4;
            d[i >> 1] |= parseInt(String.fromCharCode(rawData[offset + i]), 16) << shift;
        }
        return d;
    }

    getPackedLength(nBytes: Number): Number {
        return nBytes * 2;
    }
}

export default new AsciiHexInterpreter();