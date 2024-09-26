import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useReducer,
} from 'react';

export enum ControlsActionEnum {
  ASSIGN_REFRESH_TABLE = 'ASSIGN_REFRESH_TABLE',
  ASSIGN_IS_FORM_VISIBLE = 'ASSIGN_IS_FORM_VISIBLE',
  ASSIGN_SET_FORM_VISIBLE = 'ASSIGN_SET_FORM_VISIBLE',
  ASSIGN_TABLE_DATA = 'ASSIGN_TABLE_DATA',
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

type ControlsAction =
  | RefreshTableAction
  | IsFormVisibleAction
  | SetFormVisibleAction
  | TableDataAction;

export const CrudControls = createContext<CrudControlsProps>({});

export const useCrudControls = () => useContext(CrudControls);

const reducer = (state: ControlsState, action: ControlsAction) => {
  const { type, payload } = action;

  switch (type) {
    case ControlsActionEnum.ASSIGN_REFRESH_TABLE:
      return { ...state, refreshTable: payload };
    case ControlsActionEnum.ASSIGN_IS_FORM_VISIBLE:
      return { ...state, isFormVisible: payload };
    case ControlsActionEnum.ASSIGN_SET_FORM_VISIBLE:
      return { ...state, setFormVisible: payload };
    case ControlsActionEnum.ASSIGN_TABLE_DATA:
      return { ...state, tableData: payload };
    default:
      return state;
  }
};

export const CrudControlsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <CrudControls.Provider
      value={{
        refreshTable: state.refreshTable,
        isFormVisible: state.isFormVisible,
        setFormVisible: state.setFormVisible,
        tableData: state.tableData,
        dispatch,
      }}
    >
      {children}
    </CrudControls.Provider>
  );
};
