/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/27
 */


import Padder from './Padder';

class NullPadder extends Padder {

    constructor() {
        super();
    }


    pad(data:String, maxLength:Number):String {
        return data;
    }

    unpad(paddedData:String):String {
        return paddedData;
    }
}


export default new NullPadder();
