'use strict';

import ISOField from '../src/ISOField';
import IFA_LLLLLCHAR from '../src/packer/IFA_LLLLLCHAR';
import ISOUtil from '../src/ISOUtil';
import chai from 'chai';

const assert = chai.assert;

describe('IFA_LLLLLCHAR.js', function() {

  it('Should pack', function(done) {
    let field = new ISOField(12, "ABCD");
    let packager = new IFA_LLLLLCHAR(10, "Should be 004ABCD");
    assert.deepEqual(ISOUtil.str2bytes("004ABCD"), packager.pack(field));
    done();
  });

  it('Should unpack', function(done) {
    let raw = ISOUtil.str2bytes("004ABCD");
    let packager = new IFA_LLLLLCHAR(10, "Should be 004ABCD");
    let field = new ISOField(12);
    packager.unpack(field, raw, 0);
    assert.equal('ABCD', field.getValue());
    done();
  });

  it('Should pack and unpack - reversability', function(done) {
    let origin = "Abc123:.-";
    let f = new ISOField(12, origin);
    let packager = new IFA_LLLLLCHAR(10, "Should be Abc123:.-");

    let unpack = new ISOField(12);
    packager.unpack(unpack, packager.pack(f), 0);
    assert.deepEqual(origin, unpack.getValue());
    done();
  });

});