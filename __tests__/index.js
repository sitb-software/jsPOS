/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/27
 */


import Packager from './MyPackager';
import ISOMsg from '../src/ISOMsg';
import ISOUtil from '../src/ISOUtil';


let msg:ISOMsg = Packager.createISOMsg();

msg.setMTI('0800');
msg.setField(11, '000105');
msg.setField(32, '14002244');
msg.setField(41, '00000764');
msg.setField(42, '111000001111002');
msg.setField(60, '00000001003');
msg.setField(63, '001');
console.log(ISOUtil.hexString(msg.pack()));

let msgStr = '08000020000000C00012000105303030303037363431313130303030303131313130303200110000000100300003303031';
let unpackMsg:ISOMsg = Packager.createISOMsg();
unpackMsg.unpack(ISOUtil.hex2byte(msgStr));
console.log(ISOUtil.hexString(unpackMsg.pack()));
