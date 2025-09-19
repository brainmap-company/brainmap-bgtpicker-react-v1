import _configs from './config.json';

const DefaultMode = 'RELEASE';
const ModeTexts = ["RELEASE", "PRE-RELEASE", "DEV"];

let Mode = process.env.MODE || process.env.REACT_APP_CUSTOM_MODE;

export const ApplyModeConfig = (config) => {
    if(Mode in config) {
        for(let keyCur in config[Mode]) {
            config[keyCur] = config[Mode][keyCur];
        }
    }

    for(let itemCur of ModeTexts) {
        delete config[itemCur];
    }

    for(let keyCur in config) {
        if(typeof config[keyCur] == 'object') {
            config[keyCur] = ApplyModeConfig(config[keyCur]);
        }
    }

    return config;
};

Mode = Mode ? ModeTexts.find((str) => { return str === Mode.trim(); }) : DefaultMode;
process.env.MODE = Mode;

const configs = ApplyModeConfig(_configs);
configs.MODE = Mode;

export default configs;