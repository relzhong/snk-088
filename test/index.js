const assert = require('assert');

const libsnk = require('../index');

describe('test keyboard input', () => {
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


describe('test keyboard crypto', () => {
  let encryptedData = '';
  it('should open port successfully', () => {
    const { error } = libsnk.OpenCom(3);
    assert(error === 0);
  });
  it('should download work key successfully', () => {
    let res;
    res = libsnk.SetAlgorithmParameter(0x00, 0x20);
    assert(res.error === 0);
    res = libsnk.SetAlgorithmParameter(0x05, 0x04);
    assert(res.error === 0);
    res = libsnk.LoadWorkKey(0x00, 0x00, '5A7F21B2553421D8CBBDE84609322268');
    assert(res.error === 0);
  });
  it('should activate key successfully', () => {
    let res = libsnk.SetAlgorithmParameter(0x07, 0x20);
    assert(res.error === 0);
    res = libsnk.ActiveKey(0x00, 0x00);
    assert(res.error === 0);
  });
  it('should encrypt data successfully', () => {
    const res = libsnk.DataEncrypt('1234567812345678');
    encryptedData = res.data.ReturnInfo;
    console.log(res);
    assert(res.error === 0);
  });
  it('should decrypt data successfully', () => {
    const res = libsnk.DataDecrypt(encryptedData);
    console.log(res);
    assert(res.error === 0);
  });
  it('should calc mac successfully', () => {
    let res;
    res = libsnk.SetAlgorithmParameter(0x07, 0x10);
    assert(res.error === 0);
    res = libsnk.ActiveKey(0x00, 0x01);
    assert(res.error === 0);
    res = libsnk.MakeX99ECBMac('1234567812345678');
    console.log(res);
    assert(res.error === 0);
  });
  after(() => {
    libsnk.CloseCom();
  });
});

