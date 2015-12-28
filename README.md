# jsPOS
JavaScript ISO8583. JavaScript version of [JPOS](http://jpos.org).

# Installation

    npm install jspos --save


# Custom packager

```js
    import { ISOBasePackager, packer } from 'jspos';

    let { IFB_NUMERIC, IFB_BITMAP, IFB_LLNUM, IFB_LLLNUM, IF_CHAR, IFB_LLCHAR, IFB_LLLCHAR, IFB_BINARY, IFB_LLBINARY, IFB_LLLBINARY, IFB_AMOUNT } = packer;

    let fld = [
        /*000*/ new IFB_NUMERIC(4, "Message Type Indicator", true),
        /*001*/ new IFB_BITMAP(8, "Bitmap"),
        /*002*/ new IFB_LLNUM(19, "Primary Account number", pad),
        /*003*/ new IFB_NUMERIC(6, "Processing Code", pad),
        /*004*/ new IFB_NUMERIC(12, "Amount, Transaction", pad),
        /*005*/ new IFB_NUMERIC(12, "Amount, Reconciliation", pad),
        /*006*/ new IFB_NUMERIC(12, "Amount, Cardholder billing", pad),
        /*007*/ new IFB_NUMERIC(10, "Date and time, transmission", pad),
        /*008*/ new IFB_NUMERIC(8, "Amount, Cardholder billing fee", pad)
    ];

    class MyPackager extends ISOBasePackager{
         constructor() {
            super();
              this.setFieldPackager(fld);
         }
    }

    export default new MyPackager();
```

# Examples

    import Packager from './MyPackager';
    import { ISOUtil, ISOMsg } from 'jspos';


    let msg:ISOMsg = Packager.createISOMsg();

    msg.setMTI('0800');
    msg.setField(11, '000105');
    msg.setField(41, '00000764');
    msg.setField(42, '111000001111002');
    msg.setField(60, '00000001003');
    msg.setField(63, '001');
    console.log(ISOUtil.hexString(msg.pack()));

    let msgStr = '08000020000000C00012000105303030303037363431313130303030303131313130303200110000000100300003303031';
    let unpackMsg:ISOMsg = Packager.createISOMsg();
    unpackMsg.unpack(ISOUtil.hex2byte(msgStr));
    console.log(ISOUtil.hexString(unpackMsg.pack()));

# run test.

    npm install
    npm test
