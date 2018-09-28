const ffi = require('ffi');
const ref = require('ref');
const path = require('path');
const hardware = {};
const stack = require('callsite');

function hazardous(location) {
  const electronRegex = /[\\/]electron\.asar[\\/]/;
  const asarRegex = /^(?:^\\\\\?\\)?(.*\.asar)[\\/](.*)/;
  /* convert path when use electron asar unpack
   */
  if (!path.isAbsolute(location)) {
    return location;
  }

  if (electronRegex.test(location)) {
    return location;
  }

  const matches = asarRegex.exec(location);
  if (!matches || matches.length !== 3) {
    return location;
  }

  /* Skip monkey patching when an electron method is in the callstack. */
  const skip = stack().some(site => {
    const siteFile = site.getFileName();
    return /^ELECTRON_ASAR/.test(siteFile) || electronRegex.test(siteFile);
  });

  return skip ? location : location.replace(/\.asar([\\/])/, '.asar.unpacked$1');
}


const libsnk = ffi.Library(hazardous(path.join(__dirname, './lib/XZ_F10_API')), {
  SUNSON_OpenCom: [ 'int', [ 'int', 'int' ]],
  SUNSON_CloseCom: [ 'int', [ ]],
  SUNSON_ScanKeyPress: [ 'int', [ 'pointer' ]],
  SUNSON_ResetEPP: [ 'int', [ 'pointer' ]],
  SUNSON_UseEppPlainTextMode: [ 'int', [ 'char', 'pointer' ]],
  SUNSON_LoadMasterKey: [ 'int', [ 'char', 'char', 'pointer', 'pointer' ]],
  SUNSON_LoadWorkKey: [ 'int', [ 'char', 'char', 'char', 'pointer', 'pointer' ]],
  SUNSON_ActiveKey: [ 'int', [ 'char', 'char', 'pointer' ]],
  SUNSON_StartEpp: [ 'int', [ 'char', 'char', 'char', 'pointer' ]],
  SUNSON_ReadCypherPin: [ 'int', [ 'pointer' ]],
  SUNSON_LoadCardNumber: [ 'int', [ 'pointer', 'pointer' ]],
  SUNSON_LoadTerminalNumber: [ 'int', [ 'pointer', 'pointer' ]],
  SUNSON_DataEncrypt: [ 'int', [ 'char', 'pointer', 'pointer' ]],
  SUNSON_DataDecrypt: [ 'int', [ 'char', 'pointer', 'pointer' ]],
  SUNSON_MakeMac: [ 'int', [ 'int', 'pointer', 'pointer' ]],
  SUNSON_SendAscII: [ 'int', [ 'char', 'pointer' ]],
  SUNSON_SetVersion: [ 'int', [ 'pointer', 'pointer', 'pointer' ]],
  SUNSON_GetVersion: [ 'int', [ 'pointer' ]],
  SUNSON_GetSerialNumber: [ 'int', [ 'pointer' ]],
  SUNSON_SetAlgorithmParameter: [ 'int', [ 'char', 'char', 'pointer' ]],
  SUNSON_MakeUBCMac: [ 'int', [ 'int', 'pointer', 'pointer', 'pointer' ]],
  SUNSON_MakeX919ECBMac: [ 'int', [ 'int', 'pointer', 'pointer' ]],
  SUNSON_MakeX99ECBMac: [ 'int', [ 'int', 'pointer', 'pointer' ]],
  SUNSON_MakeBaseMac: [ 'int', [ 'int', 'pointer', 'pointer' ]],
  SUNSON_MakeX99CBCMac: [ 'int', [ 'int', 'pointer', 'pointer', 'pointer' ]],
  SUNSON_SetSimCardIdAndKind: [ 'int', [ 'char', 'char', 'pointer' ]],
  SUNSON_GetSimCardIdAndKind: [ 'int', [ 'char', 'pointer' ]],
  SUNSON_CardPowerOn: [ 'int', [ 'pointer' ]],
  SUNSON_UseAPDU: [ 'int', [ 'char', 'pointer', 'pointer' ]],
  SUNSON_GetPinFromSIM: [ 'int', [ 'char', 'pointer', 'pointer' ]],
});

hardware.OpenCom = port => {
  try {
    const res = libsnk.SUNSON_OpenCom(port, 9600);
    if (res) {
      return { error: -1 };
    }
    return { error: 0 };
  } catch (e) {
    return { error: -1 };
  }
};

hardware.CloseCom = () => {
  try {
    const res = libsnk.SUNSON_CloseCom();
    if (res === 0) {
      return { error: 0 };
    }
    return { error: -1 };
  } catch (e) {
    return { error: -1 };
  }
};

hardware.UseEppPlainTextMode = ucTextModeFormat => {
  try {
    const data = ref.alloc(ref.types.char);
    const res = libsnk.SUNSON_UseEppPlainTextMode(ucTextModeFormat, data);
    const ReturnInfo = data.deref();
    if (res === 0) {
      return { error: 0, data: { ReturnInfo } };
    }
    return { error: -1 };
  } catch (e) {
    return { error: -1 };
  }
};

hardware.SetAlgorithmParameter = (ucPPara, ucFPara) => {
  try {
    const data = ref.alloc(ref.types.char);
    const res = libsnk.SUNSON_SetAlgorithmParameter(ucPPara, ucFPara, data);
    const ReturnInfo = data.deref();
    if (res === 0) {
      return { error: 0, data: { ReturnInfo } };
    }
    return { error: -1 };
  } catch (e) {
    return { error: -1 };
  }
};

hardware.ScanKeyPress = () => {
  try {
    const data = ref.alloc(ref.types.char);
    const res = libsnk.SUNSON_ScanKeyPress(data);
    const ucKeyValue = data.deref();
    if (res === 0) {
      return { error: 0, data: { ucKeyValue } };
    }
    return { error: -1 };
  } catch (e) {
    return { error: -1 };
  }
};

module.exports = hardware;
