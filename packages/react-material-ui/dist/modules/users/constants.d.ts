import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { FilterDetails } from 'components/submodules/Filter';
import { TableSchemaItem } from 'components/submodules/Table';
export declare const headers: TableSchemaItem[];
export declare const CREATE_EDIT_FORM: {
    formSchema: RJSFSchema;
    formUiSchema: UiSchema<any, RJSFSchema, any>;
};
export declare const DEFAULT_FILTERS: FilterDetails[];
