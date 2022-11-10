"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProps = void 0;
const filterProps = (props) => ({
    id: props.id,
    value: props.value,
    required: props.required,
    disabled: props.disabled,
    readonly: props.readonly,
    autofocus: props.autofocus,
    placeholder: props.placeholder,
    onChange: props.onChange,
    label: props.label,
    maxLength: props.maxLength,
    type: props.type,
});
exports.filterProps = filterProps;
//# sourceMappingURL=utils.js.map