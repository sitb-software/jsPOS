/**
 * ISO Msg
 * @author Sean sean.snow@live.com
 * @date 2015/12/22
 */
import ISOUtil from './ISOUtil';
import ISOComponent from './ISOComponent';
import ISOField from './ISOField';
import ISOHeader from './ISOHeader';
import ISOBasePackager from './ISOBasePackager';
import ISOBinaryFieldPackager from './packer/ISOBinaryFieldPackager';
import ISOBinaryField from './ISOBinaryField';
import BitSet from 'jsdk/util/BitSet';
import ISOBitMap from './ISOBitMap';

class ISOMsg extends ISOComponent {

    fields = {};
    maxField = -1;
    dirty = true;
    maxFieldDirty = true;
    direction = 0;
    header = null;
    trailer = null;
    fieldNumber = -1;
    packager:ISOBasePackager = null;


    setPackager(packager:ISOBasePackager) {
        this.packager = packager;
    }


    setFieldNumber(fieldNumber:Number) {
        this.fieldNumber = fieldNumber;
    }

    setMTI(mti:String) {
        if (this.isInnter()) {
            throw Error('can\'t setMTI on inner message');
        }
        this.set(new ISOField(0, mti));
    }

    isInnter():Boolean {
        return this.fieldNumber > -1;
    }

    set(c) {
        if (c != null) {
            let i = c.getKey();
            this.fields[i] = c;
            if (i > this.maxField) {
                this.maxField = i;
            }
            this.dirty = true;
        }
    }

    unset(fldno:Number) {
        if (this.fields[fldno] != null) {
            this.dirty = this.maxFieldDirty = true;
            delete this.fields[fldno];
        }
    }

    setField(fldno:Number, value) {
        if (value != null) {
            if (!(this.packager instanceof ISOBasePackager)) {
                this.set(new ISOField(fldno, value));
            } else {
                let obj = this.packager.getFieldPackager(fldno);
                if (obj instanceof ISOBinaryFieldPackager) {
                    this.set(new ISOBinaryField(fldno, ISOUtil.hex2byte(value)));
                } else {
                    this.set(new ISOField(fldno, value));
                }
            }

        } else {
            this.unset(fldno);
        }
    }


    getComposite():ISOComponent {
        //noinspection JSValidateTypes
        return this;
    }


    getChildren():Object {
        return this.fields;
    }

    setHeader(header:ISOHeader) {
        this.header = header;
    }

    getHeader():Array {
        return this.header != null ? this.header.pack() : null;
    }

    getMaxField():Number {
        if (this.maxFieldDirty) {
            this._recalcMaxField();
        }
        return this.maxField;
    }


    pack():Array {
        this._recalcBitMap();
        return this.packager.pack(this);
    }

    unpack(b:Array):Number {
        return this.packager.unpack(this, b);
    }


    _recalcBitMap() {
        if (!this.dirty) {
            return;
        }
        let mf = Math.min(this.getMaxField(), 192);
        let bmap = new BitSet(mf + 62 >> 6 << 6);
        for (let i = 1; i <= mf; i++) {
            if (this.fields[i] != null) {
                bmap.set(i);
            }
        }
        this.set(new ISOBitMap(-1, bmap));
        this.dirty = false;
    }

    /**
     *
     * @private
     */
    _recalcMaxField() {
        this.maxField = 0;
        Object.keys(this.fields).forEach(key => {
            this.maxField = Math.max(this.maxField, Number(key));
        });
        this.maxFieldDirty = false;
    }

}

export default ISOMsg;