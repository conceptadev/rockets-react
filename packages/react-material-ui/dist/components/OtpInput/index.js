"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYBOARD_KEYS = void 0;
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const TextField_1 = require("../../components/TextField");
const FormLabel_1 = require("../../components/FormLabel");
const NUMBER_REGEX = /^\d$/;
exports.KEYBOARD_KEYS = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    BACKSPACE: 'Backspace',
    HOME: 'Home',
    END: 'End',
};
const OtpInput = react_1.default.forwardRef((_a, ref) => {
    var { value = '', length = 4, autoFocus = false, textFieldProps, name, label, labelProps, className, onComplete, onChange, onBlur } = _a, restBoxProps = __rest(_a, ["value", "length", "autoFocus", "textFieldProps", "name", "label", "labelProps", "className", "onComplete", "onChange", "onBlur"]);
    const checkCompletion = (inputValue) => inputValue.slice(0, length).length === length;
    const initializeInputs = () => Array.from({ length }, (_, index) => {
        var _a;
        return ({
            character: (_a = value[index]) !== null && _a !== void 0 ? _a : '',
            inputRef: react_1.default.createRef(),
        });
    });
    const inputData = initializeInputs();
    const updateValue = (index, char) => value.slice(0, index) + char + value.slice(index + 1);
    const focusInput = (index) => {
        var _a, _b;
        if (index < length)
            (_b = (_a = inputData[index]) === null || _a === void 0 ? void 0 : _a.inputRef.current) === null || _b === void 0 ? void 0 : _b.select();
    };
    const handleChange = (event, index) => {
        var _a;
        if (index === 0 && event.target.value.length > 1) {
            const inputComplete = checkCompletion(event.target.value);
            onChange === null || onChange === void 0 ? void 0 : onChange(event.target.value);
            if (inputComplete)
                onComplete === null || onComplete === void 0 ? void 0 : onComplete(event.target.value);
            focusInput(event.target.value.length - 1);
            return;
        }
        const char = (_a = event.target.value[0]) !== null && _a !== void 0 ? _a : '';
        if (char && !NUMBER_REGEX.test(char))
            return;
        const newValue = updateValue(index, char);
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (char !== '' && NUMBER_REGEX.test(char)) {
            focusInput(newValue.length - 1 < index ? newValue.length : index + 1);
        }
        else if (newValue.length <= index) {
            focusInput(index - 1);
        }
        if (checkCompletion(newValue))
            onComplete === null || onComplete === void 0 ? void 0 : onComplete(newValue);
    };
    const handleKeyDown = (event, index) => {
        const inputElement = event.target;
        const caretAtStart = inputElement.selectionStart === 0 && inputElement.selectionEnd === 0;
        if (inputElement.value === event.key) {
            event.preventDefault();
            focusInput(index + 1);
        }
        else if (event.key === exports.KEYBOARD_KEYS.BACKSPACE) {
            if (!inputElement.value) {
                event.preventDefault();
                focusInput(index - 1);
            }
            else if (caretAtStart) {
                event.preventDefault();
                const newValue = updateValue(index, '');
                onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
                if (newValue.length <= index)
                    focusInput(index - 1);
            }
        }
        else if (event.key === exports.KEYBOARD_KEYS.LEFT) {
            event.preventDefault();
            focusInput(index - 1);
        }
        else if (event.key === exports.KEYBOARD_KEYS.RIGHT) {
            event.preventDefault();
            focusInput(index + 1);
        }
        else if (event.key === exports.KEYBOARD_KEYS.HOME) {
            event.preventDefault();
            focusInput(0);
        }
        else if (event.key === exports.KEYBOARD_KEYS.END) {
            event.preventDefault();
            focusInput(length - 1);
        }
    };
    const handlePaste = (event, index) => {
        const pastedData = event.clipboardData.getData('text/plain');
        const newValue = pastedData.length <= length - index
            ? value.slice(0, index) +
                pastedData +
                value.slice(index + pastedData.length, length)
            : value;
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        if (checkCompletion(newValue)) {
            onComplete === null || onComplete === void 0 ? void 0 : onComplete(newValue);
            focusInput(length - 1);
        }
        else {
            focusInput(newValue.length);
        }
    };
    const handleBlurEvent = (event) => {
        const isInputFocused = inputData.some(({ inputRef }) => inputRef.current === event.relatedTarget);
        if (!isInputFocused) {
            const isComplete = checkCompletion(value);
            onBlur === null || onBlur === void 0 ? void 0 : onBlur(value, isComplete);
        }
    };
    return (react_1.default.createElement(Box_1.default, { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
        !!label && (react_1.default.createElement(FormLabel_1.FormLabel, { name: `${name}-0`, label: label, labelProps: labelProps })),
        react_1.default.createElement(Box_1.default, Object.assign({ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center", ref: ref, className: `otp-input-box ${className || ''}` }, restBoxProps), inputData.map(({ character, inputRef }, index) => {
            const _a = typeof textFieldProps === 'function'
                ? textFieldProps(index) || {}
                : textFieldProps || {}, { onPaste, onFocus, onKeyDown, className, onBlur: textFieldBlur, error, name } = _a, restTextFieldProps = __rest(_a, ["onPaste", "onFocus", "onKeyDown", "className", "onBlur", "error", "name"]);
            return (react_1.default.createElement(TextField_1.TextField, Object.assign({ id: index === 0 ? `${name}-${index}` : undefined, key: `otp-input-${index}`, autoFocus: autoFocus && index === 0, autoComplete: "one-time-code", value: character, error: error, inputRef: inputRef, inputProps: {
                    sx: {
                        textAlign: 'center',
                    },
                }, InputProps: {
                    sx: {
                        caretColor: 'transparent',
                        '.MuiInputBase-input::selection': {
                            backgroundColor: 'transparent',
                        },
                    },
                }, className: className, onPaste: (event) => {
                    event.preventDefault();
                    handlePaste(event, index);
                    onPaste === null || onPaste === void 0 ? void 0 : onPaste(event);
                }, onFocus: (event) => {
                    event.preventDefault();
                    event.target.select();
                    onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
                }, onChange: (event) => handleChange(event, index), onKeyDown: (event) => {
                    handleKeyDown(event, index);
                    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
                }, onBlur: (event) => {
                    textFieldBlur === null || textFieldBlur === void 0 ? void 0 : textFieldBlur(event);
                    handleBlurEvent(event);
                }, name: `${name}-${index}` }, restTextFieldProps)));
        }))));
});
exports.default = OtpInput;
//# sourceMappingURL=index.js.map