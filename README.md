# jsPOS
JavaScript ISO8583. JavaScript version of [JPOS](http://jpos.org).

# Installation

    npm install jspos --save


# Examples

    import Packager from './MyPackager';
    import { ISOUtil, ISOMsg } from 'jspos';


    let msg:ISOMsg = Packager.createISOMsg();

    msg.setMTI('0800');
    msg.setField(11, '000105');
    msg.setField(41, '00000764');
    msg.setField(42, '111000001111002');
    msg.setField(60, '00000001003');
    msg.setStrField(63, '001');
    console.log(ISOUtil.hexString(msg.pack()));

    let msgStr = '08000020000000C00012000105303030303037363438343831303030353831323630303200110000000100300003303031';
    let unpackMsg:ISOMsg = Packager.createISOMsg();
    unpackMsg.unpack(ISOUtil.hex2byte(msgStr));
    console.log(ISOUtil.hexString(unpackMsg.pack()));

# run test.

    npm install
    npm test
