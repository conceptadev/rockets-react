"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSettingsStorage = void 0;
const react_1 = require("react");
const debounce_1 = __importDefault(require("lodash/debounce"));
const react_data_provider_1 = __importStar(require("@concepta/react-data-provider"));
const react_auth_provider_1 = require("@concepta/react-auth-provider");
const parseDataStringToSettings = (data) => {
    return JSON.parse(data.replace(/'/g, '"'));
};
const parseSettingsToDataString = (data) => {
    return data.replace(/"/g, "'");
};
const DEBOUNCE_TIME_IN_MS = 1500;
const getSettingsFromStorage = (params) => {
    const storageItem = JSON.parse(localStorage.getItem(params.type));
    if (!storageItem) {
        return [];
    }
    const settingsItem = storageItem.find(({ assignee, key }) => assignee.id === params.assignee.id && key === params.key);
    return settingsItem ? settingsItem.data : [];
};
const getSettingsFromCacheList = (params) => {
    const settingsItem = params.cacheList.find((item) => item.key === params.key &&
        item.type === params.type &&
        item.assignee.id === params.assignee.id);
    if (!settingsItem) {
        return null;
    }
    return Object.assign(Object.assign({}, settingsItem), { data: parseDataStringToSettings(settingsItem.data) });
};
const updateSettingsStorage = (params) => {
    const storageItem = JSON.parse(localStorage.getItem(params.type));
    if (!storageItem) {
        localStorage.setItem(params.type, JSON.stringify([params]));
        return;
    }
    const settingsItemIndex = storageItem.findIndex((item) => item.assignee.id === params.assignee.id && item.key === params.key);
    if (settingsItemIndex > -1) {
        storageItem[settingsItemIndex] = params;
    }
    else {
        storageItem.push(params);
    }
    localStorage.setItem(params.type, JSON.stringify(storageItem));
};
const deleteSettingsStorage = (params) => {
    const storageItem = JSON.parse(localStorage.getItem(params.type));
    if (!storageItem || !(storageItem === null || storageItem === void 0 ? void 0 : storageItem.length)) {
        return;
    }
    let updatedStorageItem = [...storageItem];
    const settingsItemIndex = storageItem.findIndex(({ assignee, key }) => assignee.id === params.assignee.id && key === params.key);
    if (settingsItemIndex > -1) {
        updatedStorageItem = storageItem.splice(settingsItemIndex, 1);
    }
    localStorage.setItem(params.type, JSON.stringify(updatedStorageItem));
};
const useSettingsStorage = (props) => {
    const [cacheId, setCacheId] = (0, react_1.useState)('');
    const [settings, setSettings] = (0, react_1.useState)([]);
    const auth = (0, react_auth_provider_1.useAuth)();
    const { get, put, del } = (0, react_data_provider_1.default)();
    const cacheConfig = {
        key: props.key || window.location.pathname,
        type: props.type,
        assignee: {
            id: (auth === null || auth === void 0 ? void 0 : auth.user) ? auth.user.id : '',
        },
    };
    const { execute: createCache } = (0, react_data_provider_1.useQuery)((cache) => put({
        uri: `${props.cacheApiPath}/${crypto.randomUUID()}`,
        body: Object.assign(Object.assign({}, cacheConfig), { data: cache }),
    }), false, {
        onSuccess: (res) => setCacheId(res.id),
    });
    const { execute: updateCache } = (0, react_data_provider_1.useQuery)((list) => put({
        uri: `${props.cacheApiPath}/${cacheId}`,
        body: Object.assign(Object.assign({}, cacheConfig), { data: parseSettingsToDataString(JSON.stringify(list)) }),
    }), false, {
        onSuccess: (res) => setCacheId(res.id),
    });
    const { execute: deleteCache } = (0, react_data_provider_1.useQuery)(() => del({ uri: `${props.cacheApiPath}/${cacheId}` }), false, { onSuccess: () => setCacheId('') });
    const { execute: fetchOrCreateCache } = (0, react_data_provider_1.useQuery)(() => get({ uri: props.cacheApiPath }), false, {
        onSuccess: (fetchedData) => {
            const cachedSettings = getSettingsFromCacheList(Object.assign(Object.assign({}, cacheConfig), { cacheList: fetchedData }));
            if (!cachedSettings) {
                createCache(parseSettingsToDataString(JSON.stringify(props.data)));
                return;
            }
            if (cachedSettings) {
                setCacheId(cachedSettings.id);
                if (!getSettingsFromStorage(cacheConfig).length) {
                    setSettings(cachedSettings.data);
                    props.setListCallback(cachedSettings.data);
                }
            }
        },
    });
    const debouncedCacheUpdate = (0, debounce_1.default)((items) => updateCache(items), DEBOUNCE_TIME_IN_MS);
    const updateSettings = (items) => {
        setSettings(items);
        updateSettingsStorage(Object.assign(Object.assign({}, cacheConfig), { data: items }));
        if (props.cacheApiPath) {
            debouncedCacheUpdate(items);
        }
    };
    const clearSettings = () => {
        deleteSettingsStorage(cacheConfig);
        if (props.cacheApiPath) {
            deleteCache();
        }
    };
    (0, react_1.useEffect)(() => {
        const storageData = getSettingsFromStorage(cacheConfig);
        if (storageData.length) {
            setSettings(storageData);
            props.setListCallback(storageData);
        }
        if (props.cacheApiPath) {
            fetchOrCreateCache();
        }
    }, []);
    return { settings, updateSettings, clearSettings };
};
exports.useSettingsStorage = useSettingsStorage;
//# sourceMappingURL=useSettingsStorage.js.map