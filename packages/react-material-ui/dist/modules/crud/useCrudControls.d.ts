import React, { PropsWithChildren } from 'react';
export declare enum ControlsActionEnum {
    ASSIGN_REFRESH_TABLE = "ASSIGN_REFRESH_TABLE",
    ASSIGN_IS_FORM_VISIBLE = "ASSIGN_IS_FORM_VISIBLE",
    ASSIGN_SET_FORM_VISIBLE = "ASSIGN_SET_FORM_VISIBLE",
    ASSIGN_TABLE_DATA = "ASSIGN_TABLE_DATA"
}
interface ControlsState {
    refreshTable?: () => void;
    isFormVisible?: boolean;
    setFormVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    tableData?: unknown[];
}
type CrudControlsProps = ControlsState & {
    dispatch?: React.Dispatch<ControlsAction>;
};
interface RefreshTableAction {
    type: ControlsActionEnum.ASSIGN_REFRESH_TABLE;
    payload: () => void;
}
interface IsFormVisibleAction {
    type: ControlsActionEnum.ASSIGN_IS_FORM_VISIBLE;
    payload: boolean;
}
interface SetFormVisibleAction {
    type: ControlsActionEnum.ASSIGN_SET_FORM_VISIBLE;
    payload: React.Dispatch<React.SetStateAction<boolean>>;
}
interface TableDataAction {
    type: ControlsActionEnum.ASSIGN_TABLE_DATA;
    payload: unknown[];
}
type ControlsAction = RefreshTableAction | IsFormVisibleAction | SetFormVisibleAction | TableDataAction;
export declare const CrudControls: React.Context<CrudControlsProps>;
export declare const useCrudControls: () => CrudControlsProps;
export declare const CrudControlsProvider: React.FC<PropsWithChildren>;
export {};
