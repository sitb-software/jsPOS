/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import ISOPackager from './ISOPackager';
import ISOBitMapPackager from './packer/ISOBitMapPackager';
import ISOFieldPackager from './packer/ISOFieldPackager';
import ISOMsgFieldPackager from './packer/ISOMsgFieldPackager';
import ISOBitMap from './ISOBitMap';
import ISOComponent from './ISOComponent';
import ISOMsg from './ISOMsg';
import ISOUtil from './ISOUtil';
import Arrays from 'jsdk/util/Arrays';

class ISOBasePackager extends ISOPackager {

    fld = [];
    realm = null;
    headerLength = 0;


    setFieldPackager(fld:Array) {
        this.fld = fld;
    }

    emitBitMap():Boolean {
        return this.fld[1] instanceof ISOBitMapPackager;
    }

    /**
     * usually 2 for normal fields, 1 for bitmap-less
     * or ANSI X9.2
     * @return Number first valid field
     */
    getFirstField():Number {
        if (!(this.fld[0] instanceof ISOMsgFieldPackager) && this.fld.length > 1) {
            return this.fld[1] instanceof ISOBitMapPackager ? 2 : 1;
        }

        return 0;
    }

    getBitMapfieldPackager():ISOFieldPackager {
        return this.fld[1];
    }


    pack(m:ISOComponent):Array {
        if (m.getComposite() != m) {
            throw Error('Can\'t call packager on non Composite');
        }

        let v = [];
        let fields = m.getChildren();
        let len = 0;
        let first = this.getFirstField();
        let c:ISOComponent = fields[0];
        let b = [];
        if (m instanceof ISOMsg && this.headerLength > 0) {
            let h = m.getHeader();
            if (h != null) {
                len += h.length;
            }
        }
        if (first > 0 && c != null) {
            b = this.fld[0].pack(c);
            len += b.length;
            v.push(b);
        }

        if (this.emitBitMap()) {
            c = fields[-1];
            b = this.getBitMapfieldPackager().pack(c);
            len += b.length;
            v.push(b);
        }
        // if Field 1 is a BitMap then we are packing an
        // ISO-8583 message so next field is fld#2.
        // else we are packing an ANSI X9.2 message, first field is 1
        let tmpMaxField = Math.min(m.getMaxField(), 128);

        for (let i = first; i <= tmpMaxField; i++) {
            if ((c = fields[i]) != null) {
                let fp:ISOFieldPackager = this.fld[i];
                if (fp == null) {
                    throw Error(`null field ${i} packager`);
                }
                b = fp.pack(c);
                len += b.length;
                v.push(b);
            }
        }

        if (m.getMaxField() > 128 && this.fld.length > 128) {
            for (let i = 1; i <= 64; i++) {
                if ((c = fields[i + 128]) != null) {
                    b = this.fld[128 + i].pack(c);
                    len += b.length;
                    v.push(b);
                }
            }
        }

        let k = 0;
        let d = new Array(len);

        //if ISOMsg insert header
        if (m instanceof ISOMsg && this.headerLength > 0) {
            let h = m.getHeader();
            if (h != null) {
                Arrays.arraycopy(h, 0, d, k, h.length);
                k += h.length;
            }
        }

        v.forEach(bb => {
            Arrays.arraycopy(bb, 0, d, k, bb.length);
            k += bb.length;
        });

        return d;
    }


    unpack(m:ISOComponent, b:Array):Number {
        let consumed = 0;
        if (m.getComposite() !== m) {
            throw Error('Can\'t call packager on non Composite');
        }

        if (m instanceof ISOMsg) {
            let h = new Array(this.headerLength);
            Arrays.arraycopy(b, 0, h, 0, this.headerLength);
            m.setHeader(h);
            consumed += this.headerLength;
        }

        if (!(this.fld[0] == null) && !(this.fld[0] instanceof ISOBitMapPackager)) {
            let mti:ISOComponent = this.fld[0].createComponent(0);
            consumed += this.fld[0].unpack(mti, b, consumed);
            m.set(mti);
        }

        let bmap = null;
        let maxField = this.fld.length;
        if (this.emitBitMap()) {
            let bitmap = new ISOBitMap(-1);
            consumed += this.getBitMapfieldPackager().unpack(bitmap, b, consumed);
            bmap = bitmap.getValue();
            console.log(bmap.toString());
            m.set(bitmap);
            maxField = Math.min(maxField, bmap.size());
        }

        for (let i = this.getFirstField(); i < maxField; i++) {
            if (bmap == null && this.fld[i] == null) {
                continue;
            }

            if (maxField > 128 && i === 65) {
                continue;
            }

            if (bmap == null || bmap.get(i)) {
                if (this.fld[i] == null) {
                    throw Error(`field packager ${i} is null.`);
                }
                let c = this.fld[i].createComponent(i);
                consumed += this.fld[i].unpack(c, b, consumed);
                m.set(c);
            }
        }
    }

    getFieldDescription(m:ISOComponent, fldNumber:Number):String {
        return this.fld[fldNumber].getDescription();
    }

    getFieldPackager(fldNumber:Number):ISOFieldPackager {
        return this.fld != null && fldNumber < this.fld.length ? this.fld[fldNumber] : null;
    }


    createISOMsg():ISOMsg {
        let msg = new ISOMsg();
        msg.setPackager(this);
        return msg;
    }
}

export default ISOBasePackager;