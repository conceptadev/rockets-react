/// <reference types="react" />
import { FormContextType, RJSFSchema, StrictRJSFSchema, WidgetProps } from '@rjsf/utils';
export default function CustomAutocompleteWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({ schema, id, name, options, label, hideLabel, required, disabled, placeholder, readonly, value, multiple, autofocus, onChange, onBlur, onFocus, rawErrors, size, registry, uiSchema, hideError, formContext, ...textFieldProps }: WidgetProps<T, S, F>): JSX.Element;
