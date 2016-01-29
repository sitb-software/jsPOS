'use strict';

import ISOField from '../src/ISOField';
import IFA_AMOUNT from '../src/packer/IFA_AMOUNT';
import chai from 'chai';

const assert = chai.assert;

describe('IFA_AMOUNT.js', function() {

  it('Should pack', function(done) {
    let field = new ISOField(12, 'D123');
    let packager = new IFA_AMOUNT(6, 'Should be D00123');
    assert.deepEqual([68, 48, 48, 49, 50, 51], packager.pack(field));
    done();
  });

  it('Should unpack', function(done) {
    let raw = [68, 48, 48, 49, 50, 51];
    let packager = new IFA_AMOUNT(6, 'Should be D00123');
    let field = new ISOField(-1);
    packager.unpack(field, raw, 0);
    assert.equal('D00123', field.getValue());
    done();
  });

  it('Should pack and unpack - reversability', function(done) {
    let origin = 'E0123456';
    let f = new ISOField(12, origin);
    let packager = new IFA_AMOUNT(8, 'Should be E0123456');

    let unpack = new ISOField(-1);
    packager.unpack(unpack, packager.pack(f), 0);
    assert.equal(origin, unpack.getValue());
    done();
  });

});