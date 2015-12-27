/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */


import ISOFieldPackager from './ISOFieldPackager';
import ISOPackager from '../ISOPackager';
import ISOComponent from '../ISOComponent';
import ISOMsg from '../ISOMsg';

class ISOMsgFieldPackager extends ISOFieldPackager {

    constructor(fieldPackager:ISOFieldPackager, msgPackager:ISOPackager) {
        super(fieldPackager.getLength(), fieldPackager.getDescription());
        this.msgPackager = msgPackager;
        this.fieldPackager = fieldPackager;
    }


    pack(field:ISOComponent):Array {
        if (field instanceof ISOMsg) {

        }
        return this.fieldPackager.pack(field);
    }
}

export default ISOMsgFieldPackager;