const assert = require('assert');

const libsnk = require('../index');

describe('test com port connect', () => {
  it('should open port successfully', () => {
    const { error } = libsnk.OpenCom(3);
    assert(error === 0);
  });
  it('should open keyboard successfully', () => {
    const res = libsnk.UseEppPlainTextMode(0x03);
    console.log(res);
    assert(res.error === 0);
  });
  it('should set AlgorithmParameter successfully', () => {
    const res = libsnk.SetAlgorithmParameter(0x01, 0x10);
    console.log(res);
    assert(res.error === 0);
  });
  it('should scan key press', () => {
    const res = libsnk.ScanKeyPress();
    console.log(res);
    assert(res.error === 0);
  });
  it('should reset keyboard successfully', () => {
    const res = libsnk.UseEppPlainTextMode(0x00);
    console.log(res);
    assert(res.error === 0);
  });
  after(() => {
    libsnk.CloseCom();
  });
});

