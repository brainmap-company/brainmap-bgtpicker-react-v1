import axios from 'axios';

const getToken = async (name) => {
    const tokenData = localStorage.getItem(name);
    if (tokenData) {
        try {
            const parsed = JSON.parse(tokenData);
            return parsed.data;
        } catch (error) {
            return tokenData;
        }
    }
    return null;
};

const setToken = async (name, token) => {
    return localStorage.setItem(name, token);
};

class Request {
    static #_defaultApiUrl = 'https://v2-beta.psytune.com/api/brainmap';

    static #_credentialConfigs = [
        {
            url: 'https://v2-beta.psytune.com/api/brainmap',
            token_name: 'access_token',
            aes_secret: '',
            aes_iv: '',
            attach_token_to_param: false,
            attach_token_to_header: true,
            default_api_url: true,
        },
    ];

    static setCredentialConfig(configs) {
        this.#_credentialConfigs = configs;

        for (let itemCur of configs) {
            if (!this.#_defaultApiUrl || itemCur.default_api_url === true) {
                this.#_defaultApiUrl = itemCur.url;

                break;
            }
        }
    }

    static #_applyCredentialConfigs = async (url, data, config, bodyTypeParam = true) => {
        let credentialConfig = null;

        if (url.indexOf('preset[') == 0) {
            const presetIndex = url.substring(7, url.indexOf(']'));

            if (presetIndex < this.#_credentialConfigs.length) {
                credentialConfig = this.#_credentialConfigs[presetIndex];

                url = credentialConfig.url + url.substring(url.indexOf(']') + 1);
            }
        }

        if (url.indexOf('://') < 0 && this.#_defaultApiUrl) {
            url = this.#_defaultApiUrl + (url.startsWith('/') ? url : '/' + url);
        }

        if (!credentialConfig) {
            credentialConfig = this.#_credentialConfigs.find((obj) => {
                return url.indexOf(obj.url) === 0 ? true : false;
            });
        }

        if (credentialConfig) {
            if (credentialConfig.token_name) {
                let token = await getToken(credentialConfig.token_name);

                if (credentialConfig.attach_token_to_param) {
                    if (!data) data = {};

                    if (typeof data == 'object') {
                        if (data?.constructor?.name == 'FormData') {
                            data.append(credentialConfig.token_name, token);
                        } else {
                            data[credentialConfig.token_name] = token;
                        }
                    }
                }

                if (!config) config = {};

                if (typeof config == 'object') {
                    config['withCredentials'] = true;

                    if (token && credentialConfig.attach_token_to_header) {
                        if (!config.headers) config.headers = {};

                        config.headers['Authorization'] = `Bearer ${token}`;
                    }
                }
            }

            if (credentialConfig.aes_secret && credentialConfig.aes_iv) {
                if (typeof data == 'object' && data?.constructor?.name == 'Object') {
                    for (let keyCur in data) {
                        data[keyCur] = data[keyCur]; // 암호화 로직 제거
                    }
                } else if (typeof data == 'string') {
                    data = data; // 암호화 로직 제거
                }
            }
        }

        if (!bodyTypeParam && typeof data == 'object') {
            let queryStr = '';

            for (let keyCur in data) {
                queryStr += (queryStr.length > 0 ? '&' : '') + keyCur + '=' + data[keyCur];
            }

            url += (url.indexOf('?') > 0 ? '&' : '?') + queryStr;
        }

        return {
            url,
            data,
            config,
            credentialConfig,
        };
    };

    static #_checkResult = async (response, credentialConfig) => {
        if (response?.data) {
            if (credentialConfig?.token_name && typeof response.data == 'object' && 'token' in response.data) {
                const tokenData = {
                    data: response.data.token,
                    type: "string",
                    encrypted: true,
                    expiredTime: null
                };
                await setToken(credentialConfig.token_name, JSON.stringify(tokenData));

                delete response.data.token;
            }
        }

        return response?.data ? response : { data: null };
    };


    static async post(url, data, config = null) {
        let response = null;

        const appliedData = await this.#_applyCredentialConfigs(url, data, config, true);

        try {
            response = await axios.post(appliedData.url, appliedData.data, appliedData.config);
        } catch (e) {
            response = e.response;
            response.isError = true;
        }

        return await this.#_checkResult(response, appliedData.credentialConfig);
    }

    static async get(url, data, config = null) {
        let response = null;

        const appliedData = await this.#_applyCredentialConfigs(url, data, config, false);

        try {
            response = await axios.get(appliedData.url, appliedData.config);
        } catch (e) {
            response = e.response;
            response.isError = true;
        }

        return await this.#_checkResult(response, appliedData.credentialConfig);
    }


    static Configs = {
        Headers: {
            ContentType: {
                ApplicationJson: 'Application/json',
                ApplicationXWwwFormUrlencode: 'Application/x-www-form-urlencode',
                ApplicationXml: 'Application/xml',

                TextCss: 'text/css',
                TextHtml: 'text/html',
                TextJavascript: 'text/javascript',
                TextPlain: 'text/plain',
                Textxml: 'text/xml',
                TextXml: 'text/xml',

                MultipartFormedData: 'multipart/formed-data',
            },
        },
    };
}

export default Request;
