'use strict';

import ISOBinaryField from '../src/ISOBinaryField';
import IFA_LLLLLLBINARY from '../src/packer/IFA_LLLLLLBINARY';
import ISOUtil from '../src/ISOUtil';
import chai from 'chai';
const assert = chai.assert;

  
describe('IFA_LLLLLLBINARY.js', function() {

  it('Should pack', function(done) {
    let field = new ISOBinaryField(12, [28, 13]);
    let packager = new IFA_LLLLLLBINARY(2, "Should be 1C0D");
    assert.deepEqual(ISOUtil.str2bytes('002').concat([28, 13]), packager.pack(field));
    done();
  });

  it('Should unpack', function(done) {
    let raw = ISOUtil.str2bytes('002').concat([28, 13]);
    let packager = new IFA_LLLLLLBINARY(2, "Should be 1c0D");
    let field = new ISOBinaryField(12);
    packager.unpack(field, raw, 0);
    assert.deepEqual([28, 13], field.getValue());
    done();
  });

  it('Should pack and unpack - reversability', function(done) {
    let origin = [28, 52, 86, 120];
    let f = new ISOBinaryField(12, origin);
    let packager = new IFA_LLLLLLBINARY(4, "Should be 1C345678");

    let packagedData = packager.pack(f);
    assert.deepEqual(ISOUtil.str2bytes('004').concat(origin), packagedData);

    let unpack = new ISOBinaryField(12);
    packager.unpack(unpack, packagedData, 0);
    assert.deepEqual(origin, unpack.getValue());
    done();
  });

});