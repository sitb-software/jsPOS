/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/24
 */

import Padder from './Padder';

class LeftPadder extends Padder {

    static ZERO_PADDER = new LeftPadder('0');

    constructor(pader) {
        super();
        this.pader = pader;
    }


    pad(data:String, maxLength:Number):String {
        let padded = '';
        let len = data.length;
        if (len > maxLength) {
            throw Error(`Data is too long. Max = ${maxLength}`);
        }
        for (let i = maxLength - len; i > 0; i--) {
            padded += this.pader;
        }
        padded += data;
        return padded;
    }

    unpad(paddedData:String):String {
        let i = 0,
            len = paddedData.length;
        while (i < len) {
            if (paddedData.charAt(i) != this.pader) {
                return paddedData.substring(i);
            }
            i++;
        }

        return '';
    }
}

export default LeftPadder;