'use strict';

import ISOField from '../src/ISOField';
import IFA_NUMERIC from '../src/packer/IFA_NUMERIC';
import ISOUtil from '../src/ISOUtil';
import chai from 'chai';

const assert = chai.assert;

describe('IFA_NUMERIC.js', function() {

  it('Should pack', function(done) {
    let field = new ISOField(12, "1234");
    let packager = new IFA_NUMERIC(10, "Should be 0000001234");
    assert.deepEqual(ISOUtil.str2bytes("0000001234"), packager.pack(field));
    done();
  });

  it('Should unpack', function(done) {
    let raw = ISOUtil.str2bytes("0000001234");
    let packager = new IFA_NUMERIC(10, "Should be 0000001234");
    let field = new ISOField(12);
    packager.unpack(field, raw, 0);
    assert.equal('0000001234', field.getValue());
    done();
  });

  it('Should pack and unpack - reversability', function(done) {
    let origin = "1234567890";
    let f = new ISOField(12, origin);
    let packager = new IFA_NUMERIC(10, "Should be 1234567890");

    let unpack = new ISOField(12);
    packager.unpack(unpack, packager.pack(f), 0);
    assert.deepEqual(origin, unpack.getValue());
    done();
  });

});