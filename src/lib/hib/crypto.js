import CryptoJS from 'crypto-js';
import CryptoAes from 'js-crypto-aes';
import * as Config from './config';

const aes_secret = Config.CRYPTO.AES_SECRET;

export const enc = CryptoJS.enc;

export const encTypes = CryptoJS.enc;

export const mode = CryptoJS.mode;

export const pad = CryptoJS.pad;

export const MD5 = (str, enc = encTypes.Hex) => {
    return CryptoJS.MD5(str).toString(enc);
};

export const SHA1 = (str, enc = encTypes.Hex) => {
    return CryptoJS.SHA1(str).toString(enc);
};

export const SHA256 = (str, enc = encTypes.Hex) => {
    return CryptoJS.SHA256(str).toString(enc);
};

export const SHA512 = (str, enc = encTypes.Hex) => {
    return CryptoJS.SHA512(str).toString(enc);
};

export const SHA3 = (str, outLength = 512, enc = encTypes.Hex) => {
    return CryptoJS.SHA3(str, { outputLength: outLength }).toString(enc);
};

export const RIPEMD160 = (str, enc = encTypes.Hex) => {
    return CryptoJS.RIPEMD160(str).toString(enc);
};

export const AES = class {
    static encrypt(str, key = aes_secret) {
        return CryptoJS.AES.encrypt(str, key).toString();
    }

    static decrypt(str, key = aes_secret, dec = encTypes.Utf8) {
        let decrypted = CryptoJS.AES.decrypt(str, key);

        return decrypted.toString(dec);
    }

    static async decryptForIOS(str, key = aes_secret, isBase64Str = false, callback = null) {
        const base = isBase64Str ? Buffer.from(str, 'base64') : null;
        const bufData = isBase64Str ? base.subarray(12, base.length) : Buffer.from(str.substring(12));
        const bufKey = Buffer.from(key);
        const bufIv = isBase64Str ? base.subarray(0, 12) : Buffer.from(str.substring(0, 12));

        let result = null;

        CryptoAes.decrypt(bufData, bufKey, { name: 'AES-GCM', iv: bufIv }).then((decrypted) => {
            result = Buffer.from(decrypted).toString() || '';

            if (callback) callback(result);
        });

        await Utils.waitUntil(() => result != null);

        return result;
    }

    static encryptForOmnifit(str, secretkey) {
        const key = CryptoJS.enc.Utf8.parse(secretkey);
        const iv = CryptoJS.enc.Hex.parse('0000000000000000');

        const encryptedText = CryptoJS.AES.encrypt(str, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
        }).toString();

        return encryptedText;
    }

    static decryptForOmnifit(str, secretkey) {
        const key = CryptoJS.enc.Utf8.parse(secretkey);
        const iv = CryptoJS.enc.Hex.parse('0000000000000000');

        const decrypted = CryptoJS.AES.decrypt(str, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
        });

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

        return decryptedText;
    }
};

export const SHAAES = class {
    static ivDefault = Config.CRYPTO.SHAAES_IV;

    static encrypt(str, key = aes_secret, iv = null) {
        let keyAes = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(key));

        return CryptoJS.AES.encrypt(str, keyAes, { iv: CryptoJS.enc.Hex.parse(iv ? iv : this.ivDefault) }).toString();
    }

    static decrypt(str, key = aes_secret, iv = null) {
        let keyAes = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(key));

        return CryptoJS.AES.decrypt(str, keyAes, { iv: CryptoJS.enc.Hex.parse(iv ? iv : this.ivDefault) }).toString(CryptoJS.enc.Utf8);
    }

    static encryptObject(obj, key = aes_secret) {
        if (obj == null) return null;

        if (key == '') {
            return obj;
        }

        if (typeof obj == 'string') {
            return this.encrypt(obj, key);
        }

        let objNew = {};

        try {
            for (let keyCur in obj) {
                objNew[keyCur] = typeof obj[keyCur] == 'string' ? this.encrypt(obj[keyCur], key) : this.encryptObject(obj[keyCur], key);
            }
        } catch (e) {
            console.error(e);
        }

        return objNew;
    }

    static decryptObject(obj, key = aes_secret) {
        if (obj == null) return null;

        if (key == '') {
            return obj;
        }

        if (typeof obj == 'string') {
            return this.decrypt(obj, key);
        }

        let objNew = {};

        try {
            for (let keyCur in obj) {
                objNew[keyCur] = typeof obj[keyCur] == 'string' ? this.decrypt(obj[keyCur], key) : this.decryptObject(obj[keyCur], key);
            }
        } catch (e) {
            console.error(e);
        }

        return objNew;
    }
};
