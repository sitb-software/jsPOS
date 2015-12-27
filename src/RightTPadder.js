/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */
import RightPadder from './RightPadder';

class RightTPadder extends RightPadder {

    static SPACE_PADDER = new RightTPadder(' ');

    constructor(padder) {
        super(padder);
    }


    pad(data:String, maxLength:Number):String {
        if (data.length > maxLength) {
            return super.pad(data.substring(0, maxLength), maxLength);
        } else {
            return super.pad(data, maxLength);
        }

    }
}

export default RightTPadder;