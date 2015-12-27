# jsPOS
JavaScript ISO8583.

# install

    npm install jspos --save

# example

    import Packager from './MyPackager';
    import ISOMsg from '../src/ISOMsg';
    import ISOUtil from '../src/ISOUtil';


    let msg:ISOMsg = Packager.createISOMsg();

    msg.setMTI('0800');
    msg.setStrField(11, '000105');
    msg.setStrField(41, '00000764');
    msg.setStrField(42, '848100058126002');
    msg.setStrField(60, '00000001003');
    msg.setStrField(63, '001');
    console.log(ISOUtil.hexString(msg.pack()));

    let msgStr = '08000020000000C00012000105303030303037363438343831303030353831323630303200110000000100300003303031';
    let unpackMsg:ISOMsg = Packager.createISOMsg();
    unpackMsg.unpack(ISOUtil.hex2byte(msgStr));
    console.log(ISOUtil.hexString(unpackMsg.pack()));

# run test.

    npm install
    npm test
