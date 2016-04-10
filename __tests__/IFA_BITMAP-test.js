'use strict';

import ISOBitMap from '../src/ISOBitMap';
import IFA_BITMAP from '../src/packer/IFA_BITMAP';
import ISOUtil from '../src/ISOUtil';
import chai from 'chai';
const assert = chai.assert;

describe('IFA_BITMAP.js', function() {

  it('Should test 32 length byte Bitmap with only 16 bytes used', function(done) {

    let c = new ISOBitMap(1);
    let packager32Bytes = new IFA_BITMAP(32, '32 byte bitmap');
    let sixteenByteBitMapIn32Bytes = ISOUtil.str2bytes('7F81421FF12418F18F81421FF12418F18081421FF12418F1');
    let consumed = packager32Bytes.unpack(c, sixteenByteBitMapIn32Bytes, 0);

    assert.equal(16, consumed, '16 bytes should be consumed as the 2nd bitmap indicator is off');
    assert.equal(64, c.getValue().length() - 1, '32 byte bitmap with just 16 bytes used should have a maximum field of');

    let packager16Bytes = new IFA_BITMAP(16, "16 byte bitmap");
    let outBytes = packager16Bytes.pack(c);
    assert.equal(ISOUtil.hexString(sixteenByteBitMapIn32Bytes, 0, 16), ISOUtil.hexString(outBytes), '32 Byte (16 bytes used) bitmap pack should reflect unpack');
    done();
  });

  it('Should test 48 byte Bitmap with only 17 bytes used', function(done) {
    let c = new ISOBitMap(1);
    let fortyeightBytes = new IFA_BITMAP(48, "48 byte bitmap");
    let sixteenByteBitMapIn48Bytes = ISOUtil.str2bytes('7F81421FF12418F17F81421FF12418F18081421FF12418F1');
    let consumed = fortyeightBytes.unpack(c, sixteenByteBitMapIn48Bytes, 0);

    assert.equal(16, consumed, '16 bytes should be consumed as the 2nd bitmap indicator is off');
    assert.equal(64, c.getValue().length() - 1, "48 byte bitmap with just 16 bytes used should have a maximum field of");

    let outBytes = fortyeightBytes.pack(c);
    assert.equal(ISOUtil.hexString(sixteenByteBitMapIn48Bytes, 0, 16), ISOUtil.hexString(outBytes), "48 Byte (16 bytes used) bitmap pack should reflect unpack");
    done();
  });

  it('Should pack and unpack be equals', function(done) {
    let b = ISOUtil.hex2byte("F23C04800AE00000800000000000010863BC780000000010");
    let bs1 = ISOUtil.byte2BitSet(b, 0, 192);
    let bmap = new ISOBitMap(-1);
    bmap.setValue(bs1);

    let ifa = new IFA_BITMAP(24, "BITMAP");
    let b1 = ifa.pack(bmap);
    
    assert.equal(ISOUtil.hexString(b), ISOUtil.byte2str(b1, 0, b1.length), "Pack should be equal to unpack");
    done();
  });

});