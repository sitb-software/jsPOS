'use strict';

import AsciiHexInterpreter from '../src/AsciiHexInterpreter';
import ISOUtil from '../src/ISOUtil';
import chai from 'chai';
const assert = chai.assert;

describe('AsciiHexInterpreter.js', function() {

  it('Should interpret', function(done) {
    let data = [255, 18];
    let b = new Array(4);
    AsciiHexInterpreter.interpret(data, b, 0);
    assert.deepEqual([70, 70, 49, 50], b);
    done();
  });

  it('Should uninterpret', function(done) {
    let data = [255, 18];
    let b = [70, 70, 49, 50]; //FF12
    assert.deepEqual(data, AsciiHexInterpreter.uninterpret(b, 0, 2));
    done();
  });

  it('Should uninterpret and test ISOUtil compatibility', function(done) {
    let b = ISOUtil.hex2byte("66656637656236643736323431653438");
    let n = AsciiHexInterpreter.uninterpret(b, 0, 8);
    let a = ISOUtil.hex2byte("46454637454236443736323431453438");
    let n1 = AsciiHexInterpreter.uninterpret(a, 0, 8);
    let expected = ISOUtil.hex2byte("fef7eb6d76241e48");

    assert.equal(ISOUtil.hexString(expected), ISOUtil.hexString(n));
    assert.equal(ISOUtil.hexString(expected), ISOUtil.hexString(n1));
    done();
  });

  it('Should interpret and uninterpret - reversability', function(done) {
    let data = [1, 35, 69, 103, 137, 171, 205, 239];
    let b = new Array(AsciiHexInterpreter.getPackedLength(data.length));
    AsciiHexInterpreter.interpret(data, b, 0);

    assert.deepEqual(data, AsciiHexInterpreter.uninterpret(b, 0, data.length));
    done();
  });

});