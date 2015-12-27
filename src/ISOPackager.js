/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOComponent from './ISOComponent';
import ISOMsg from './ISOMsg';

class ISOPackager {

    /**
     * @param   m   the Component to pack
     * @return Array     Message image
     */
    pack(m:ISOComponent):Array {
    }

    /**
     * @param   m   the Container of this message
     * @param   b   ISO message image
     * @return Number     consumed bytes
     */
    unpack(m:ISOComponent, b:Array):Number {
    }

    /**
     * @return String  Packager's Description
     */
    getDescription():String {
    }


    /**
     * @param   m   the Container (i.e. an ISOMsg)
     * @param   fldNumber the Field Number
     * @return  String Field Description
     */
    getFieldDescription(m:ISOComponent, fldNumber:Number):String {
    }

    /**
     * @return ISOMsg as ISOMsg;
     */
    createISOMsg():ISOMsg {
    }

}


export default ISOPackager;