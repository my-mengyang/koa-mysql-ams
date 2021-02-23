const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const { SECRETKEY } = require("../config/secret");

/**
 * 加密函数，加密同一个字符串生成的都不一样
 * @param value
 * @returns {*}
 */
function encrypt(value) {
  return CryptoJS.AES.encrypt(JSON.stringify(value), SECRETKEY).toString();
}

/**
 * 解密函数
 * @param value
 * @returns {any}
 */
function decrypt(value) {
  const data = CryptoJS.AES.decrypt(value, SECRETKEY);
  return JSON.parse(data.toString(CryptoJS.enc.Utf8));
}

module.exports = {
  encrypt,
  decrypt,
};
