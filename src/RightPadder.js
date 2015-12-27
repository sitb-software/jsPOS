/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/27
 */

import Padder from './Padder';

class RightPadder extends Padder {
    padder;

    constructor(padder) {
        super(padder);
        this.padder = padder;
    }


    pad(data:String, maxLength:Number):String {
        let len = data.length;
        if (len < maxLength) {
            let padded = '';
            padded += data;
            for (; len < maxLength; len++) {
                padded += this.padder;
            }
            data = padded;
        } else if (len > maxLength) {
            throw Error(`Data is too long. Max = ${maxLength}`);
        }

        return data;
    }
}

export default RightPadder;
