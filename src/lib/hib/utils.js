import { waitUntil } from 'async-wait-until';
import CryptoJS from 'crypto-js'
import moment from 'moment';
import * as Config from './config';

export { waitUntil, moment };

export const delay = (time) => new Promise((res) => setTimeout(res, time));

export const date2str = (date, format) => {
    return moment(date).format(format);
};

export const replaceAll = (str, searchStr, replaceStr) => {
    return str.split(searchStr).join(replaceStr);
};

export const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createRandomString = (length = 5, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
    let text = '';

    for (let i = 0; i < length; i++) {
        let randIndex = randInt(0, chars.length - 1);

        text += chars.charAt(randIndex);
    }

    return text;
};

export const getAge = (birthday, bAmericanAge = true, date = null) => {
    birthday = moment(birthday).toDate();
    date = date ? moment(date).toDate() : moment().toDate();

    if (bAmericanAge == true) {
        let birth = date2str(birthday, 'yyyy-MM-dd');
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;

        let monthDay = month.toString() + day.toString();

        birth = birth.replace('-', '').replace('-', '');

        let birthdayy = birth.substr(0, 4);
        let birthdaymd = birth.substr(4, 4);

        return monthDay < birthdaymd ? year - birthdayy - 1 : year - birthdayy;
    }

    return date.getFullYear() - birthday.getFullYear() + 1;
};

export const objLength = (obj) => {
    if (obj == null) return 0;

    return obj.length == null ? Object.keys(obj).length : obj.length;
};

export const colFilter = (obj, filter) => {
    if (obj == null || filter == null) return obj;

    let newObj = {};

    for (let i = 0; i < filter.length; i++) {
        let keyCur = filter[i];

        if (keyCur in obj == false) continue;

        newObj[keyCur] = obj[keyCur];
    }

    return newObj;
};

export const checkKeyExists = (obj, keyArray) => {
    if (obj == null || keyArray == null || typeof obj != 'object') return false;

    for (let i = 0; i < keyArray.length; i++) {
        let keyCur = keyArray[i];

        if (keyCur in obj == false) return false;
    }

    return true;
};

export const replaceAt = function (input, index, character) {
    return input.substr(0, index) + character + input.substr(index + character.length);
};

export const replacePhoneNumString = (str) => {
    if (!str) return str;

    let number = str.replace(/[^0-9]/g, '');
    let phone = '';
    // 02-1234-1234 10
    // 02-123-1234 9
    if (number.startsWith('02')) {
        if (number.length < 4) {
            return number;
        } else if (number.length < 7) {
            phone += number.substr(0, 2);
            phone += '-';
            phone += number.substr(2);
        } else if (number.length < 10) {
            phone += number.substr(0, 2);
            phone += '-';
            phone += number.substr(2, 3);
            phone += '-';
            phone += number.substr(5);
        } else {
            phone += number.substr(0, 2);
            phone += '-';
            phone += number.substr(2, 4);
            phone += '-';
            phone += number.substr(6);
        }
    } else {
        if (number.length < 4) {
            return number;
        } else if (number.length < 7) {
            phone += number.substr(0, 3);
            phone += '-';
            phone += number.substr(3);
        } else if (number.length < 11) {
            phone += number.substr(0, 3);
            phone += '-';
            phone += number.substr(3, 3);
            phone += '-';
            phone += number.substr(6);
        } else {
            phone += number.substr(0, 3);
            phone += '-';
            phone += number.substr(3, 4);
            phone += '-';
            phone += number.substr(7);
        }
    }

    return phone;
};

export const isIDString = (str, minLength = 6, maxLength = 20) => {
    return str && str.length >= minLength && str.length <= maxLength ? true : false;
};

export const isEmailString = (str) => {
    return str && str.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? true : false;
};

export const isUrlString = (str) => {
    return str && str.match(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/) ? true : false;
};

export const isPhoneNumString = (str) => {
    return str && /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(str) ? true : false;
};

export const isPasswordString = (str, minLength = 8, maxLength = 16, checkAlphabet = true, checkNumber = true, checkSpecialChar = false) => {
    if (!str || str.length < minLength || str.length > maxLength) return false;
    if (checkAlphabet && isContainAlphabetChar(str) == false) return false;
    if (checkNumber && isContainNumberChar(str) == false) return false;
    if (checkSpecialChar && isContainSpecialChar(str) == false) return false;

    return true;
};

export const isContainAlphabetChar = (str) => {
    return str.match(/.*[A-Za-z].*/) ? true : false;
};

export const isContainNumberChar = (str) => {
    return str.match(/.*[0-9].*/) ? true : false;
};

export const isContainSpecialChar = (str) => {
    return str.match(/[~!@\#$%^&*\()\=\-`.,_+|\\/:;?""<>']/) ? true : false;
};

export const replaceNumberString = (str) => {
    return str.replace(/[^0-9]/g, '');
};

export const replaceNameString = (str) => {
    return str.replace(/[~!@\#$%^&*\()\=\-`.,_+|\\/:;?""<>']/, '');
};

export const replaceIDString = (str) => {
    return str.replace(/[^a-zA-Z0-9]/, '');
};

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeNewlineString = (str) => {
    return str.replace(/\n|\r/g, '');
};

export const removeNewlineBlankString = (str) => {
    return str.replace(/\n|\r| /g, '');
};

export const createObjectWithNewKey = (obj, newKey = 'ID') => {
    if (obj == null) return {};

    let newObj = {};

    for (let key in obj) {
        let itemCur = obj[key];

        newObj[itemCur[newKey] + ''] = itemCur;
    }

    return newObj;
};

export const createObjectWithNewKeyFromArray = (arr, newKey = 'ID') => {
    if (arr == null) return {};

    let newObj = {};

    for (let i = 0; i < arr.length; i++) {
        let itemCur = arr[i];

        newObj[itemCur[newKey] + ''] = itemCur;
    }

    return newObj;
};

export const cloneObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

export const itemIDtoIndex = (ID, array, keyID = 'ID') => {
    if (ID == null || array == null || keyID == null) return null;

    // 복수일 경우 index object로 리턴
    if (typeof ID == 'string' && ID.indexOf(',') > 0) {
        let retVal = {};

        let arrParsed = ID.split(',');

        for (let idCur of arrParsed) {
            for (let i = 0; i < array.length; i++) {
                if (array[i][keyID] == idCur) {
                    retVal[i.toString()] = '';

                    break;
                }
            }
        }

        return retVal;
    } else {
        for (let i = 0; i < array.length; i++) {
            if (array[i][keyID] == ID) {
                return i;
            }
        }
    }

    return null;
};

// ...args 로 넘어온 argument 들 중 하나라도 null 이거나 "" 인 경우 true 리턴
export const checkNullOrEmpty = (...args) => {
    let checkParams = [...args];

    for (let i = 0; i < checkParams.length; i++) {
        if (checkParams[i] == null || checkParams[i].length < 1) {
            return true;
        }
    }

    return false;
};

export const mergeObject = (...objects) => {
    let objectResult = {};

    for (let objectCur of objects) {
        if (objectCur == null) continue;

        objectResult = { ...objectResult, ...objectCur };
    }

    return objectResult;
};

export const deleteNullKeys = (object) => {
    for (let keyCur in object) {
        if (object[keyCur] == null) {
            delete object[keyCur];
        }
    }

    return object;
};

// 오브젝트의 키와 값을 맵 테이블 정의대로 변환
export const applyMap = (obj, mapTable) => {
    let result = [];

    let isArray = Array.isArray(obj);

    let list = isArray == true ? obj : [obj];

    for (let itemCur of list) {
        let resultCur = {};

        for (let field in itemCur) {
            let fieldCur = field;
            let valueCur = itemCur[field];

            if (field in mapTable) {
                if ('key' in mapTable[field]) {
                    fieldCur = mapTable[field]['key'];
                } else if ('field' in mapTable[field]) {
                    fieldCur = mapTable[field]['field'];
                }

                if ('value' in mapTable[field] && valueCur in mapTable[field]['value']) {
                    valueCur = mapTable[field]['value'][valueCur];
                }
            }

            if (fieldCur.length > 0) {
                resultCur[fieldCur] = valueCur;
            }
        }

        result.push(resultCur);
    }

    return isArray == true ? result : result.length > 0 ? result[0] : null;
};

// 디비에 저장된 스트링 타입 데이터 오브젝트로 변환
export const dbDataToObject = (strData) => {
    let objData = {};

    if (strData != null && strData.length > 0) {
        let arrData = strData.split(',');

        for (let i = 0; i < arrData.length; i++) {
            let kv = arrData[i].split('=');

            if (kv.length < 2) continue;

            let id = kv[0];
            let value = kv[1];

            if (id.length < 1) continue;

            objData[id] = value;
        }
    }

    return objData;
};

export const objectToDBData = (obj) => {
    let strData = '';

    for (let key in obj) {
        strData += (strData.length > 0 ? ',' : '') + key + '=' + replaceAll(obj[key], ',', '`');
    }

    return strData;
};

export const getClientIP = (ctx) => {
    const header = ctx && ctx.request && ctx.request.header ? ctx.request.header : null;

    let ipAddr = !header ? null : header['x-real-ip'] ? header['x-real-ip'] : header['x-forwarded-for'] ? header['x-forwarded-for'] : null;

    if (!ipAddr) {
        ipAddr = ctx.req.connection.remoteAddress
            ? ctx.req.connection.remoteAddress
            : ctx.req.socket.remoteAddress
                ? ctx.req.socket.remoteAddress
                : null;
    }

    return ipAddr;
};

export const joinPath = (...args) => {
    let arr = [...args];

    let path = arr.join('/');

    do {
        path = path.split('//').join('/');
    } while (path.indexOf('//') >= 0);

    return path.indexOf('https:/') >= 0
        ? path.replace('https:/', 'https://')
        : path.indexOf('http:/') >= 0
            ? path.replace('http:/', 'http://')
            : path;
};

export const dec2hex = (number) => {
    return number.toString(16);
};

export const hex2dec = (hex) => {
    return parseInt(hex, 16);
};

export const hexToBytes = (hex) => {
    for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
};

export const opacity2hex = (opacity) => {
    let number = opacity * 255;

    number = number < 0 ? 0 : number > 255 ? 255 : number;

    const hexNum = number.toString(16);

    return hexNum.indexOf('.') ? hexNum.substring(0, hexNum.indexOf('.')) : hexNum;
};

export const getObjectItemByIndex = (object, index) => {
    if (!object) return null;

    if (Array.isArray(object)) return object[index];

    let keys = Object.keys(object);

    return object[keys[index]];
};

export const getObjectLength = (object) => {
    if (!object) return null;

    if (Array.isArray(object)) return object.length;

    return Object.keys(object).length;
};

export const getFirstObjectItem = (object) => {
    return getObjectItemByIndex(object, 0);
};

export const reverseArray = (arr) => {
    let reversed = JSON.parse(JSON.stringify(arr));

    return reversed.reverse();
};

// object / array / value recursive로 내용 비교. 같으면 true 리턴
// keyArray 가 null 이 아닌 경우 => 둘 다 object 인 경우에 keyArray 의 key 값들만 비교
export const compareRecursive = (obj1, obj2, keyArray = null) => {
    if (obj1 == null && obj2 == null) return true;
    if ((obj1 == null && obj2 != null) || (obj1 != null && obj2 == null)) return false;
    if (Array.isArray(obj1) != Array.isArray(obj2)) return false;
    if (Array.isArray(obj1) == Array.isArray(obj2)) {
        if (obj1.length != obj2.length) return false;

        for (let i = 0; i < obj1.length; i++) {
            if (!compareRecursive(obj1[i], obj2[i])) return false;
        }

        return true;
    } else if (typeof obj1 == 'object' && typeof obj2 == 'object') {
        if (Object.keys(obj1).length != Object.keys(obj2).length) return false;

        const keys = keyArray || obj1;

        for (let keyCur in keys) {
            if (!compareRecursive(obj1[keyCur], obj2[keyCur])) return false;
        }

        return true;
    }

    return obj1 == obj2 ? true : false;
};

// object 에서 key 값들만 분리해서 리턴
export const popKeysFromObject = (keyArray, object, removeFromOrigin = true) => {
    if (!keyArray || !object) return {};

    let newObj = {};

    for (let keyCur of keyArray) {
        if (keyCur in object) {
            newObj[keyCur] = object[keyCur];

            if (removeFromOrigin) {
                delete object[keyCur];
            }
        }
    }

    return newObj;
};

export const shuffleArray = (inputArray) => {
    return inputArray.sort(() => Math.random() - 0.5);
};

export const makeArrayGroup = (array, groupMaxCount = 2) => {
    const arrayGroups = [];

    let groupCur = [];

    for (let i = 0; i < array.length; i++) {
        groupCur.push({ value: array[i], index: i });

        if (groupCur.length >= groupMaxCount) {
            arrayGroups.push(groupCur);

            groupCur = [];
        }
    }

    if (groupCur.length > 0) arrayGroups.push(groupCur);

    return arrayGroups;
};

export const findInArray = (value, array) => {
    return array.find((str) => str === value) == value ? true : false;
};

export const openInNewTab = (url, type = '_self') => {
    const newWindow = window.open(url, type, 'noopener, noreferrer');
    if (newWindow) {
        newWindow.opener = null;
    }
};

export const applyOpacityToHex = (color, opacity) => {
    if (typeof opacity !== 'number' || opacity < 0 || opacity > 1) {
        throw new Error('opacity 값은 0에서 1 사이의 숫자여야 합니다.');
    }

    // Hex 색상 코드 처리
    if (typeof color === 'string' && /^#([A-Fa-f0-9]{6})$/.test(color)) {
        // 16진수 색상 코드에서 RGB 값 추출
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // opacity 값을 16진수로 변환
        const alpha = Math.round(opacity * 255);
        const alphaHex = alpha.toString(16).padStart(2, '0');

        // 새로운 16진수 색상 코드 생성
        const newHex = `#${color.slice(1)}${alphaHex}`;
        return newHex;
    }

    // RGBA 또는 RGB 색상 코드 처리
    if (typeof color === 'string' && /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*\d*(\.\d+)?)?\s*\)$/.test(color)) {
        const rgbaValues = color.match(/\d+(\.\d+)?/g).map(Number);
        const [r, g, b, a] = rgbaValues;

        // 기존의 alpha 값이 있으면 그 값에 opacity를 곱하고, 없으면 opacity를 그대로 사용
        const newAlpha = a !== undefined ? Math.round(a * opacity * 100) / 100 : opacity;

        return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
    }

    throw new Error('유효한 16진수 색상 코드(#RRGGBB), rgb(r, g, b), 또는 rgba(r, g, b, a) 값을 입력해주세요.');
};

export const createFormData = (params) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(params)) {
        value && formData.append(key, value);
    }

    return formData;
};

/**
 * 스토리지 주소를 생성해서 반환
 * 1. AWS S3
 */
export function storagePath(url) {
    const encryptedPath = CryptoJS.AES.encrypt(url, Config.CRYPTO.STORAGE_KEY).toString().replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return `${Config.REQUEST[0].url}/secure/asset/${encryptedPath}`;
}

/**
 * 주소에 따른 fetch 결과를 반환
 * 1. AWS S3 - 주소에 s3.ap-northeast-2.amazonaws.com가 포함되면 스토리지 주소로 fetch 결과를 반환
 * 2. 그 외 - 요청한 주소의 fetch 결과를 반환
 */
export async function storageFetch(url) {
    if (url.includes('s3.ap-northeast-2.amazonaws.com')) {
        return await fetch(storagePath(url), { method: 'GET', headers: { 'Accept-Encoding': 'gzip' }, credentials: 'include' });
    }
    return await fetch(url);
}
