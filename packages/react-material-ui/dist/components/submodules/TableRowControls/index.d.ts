/// <reference types="react" />
type Props = {
    isLoading: boolean;
    viewIndex: number;
    rowsPerPage: number;
    currentPage: number;
    pageCount: number;
    currentIndex: number;
    total: number;
    onPrevious: () => void;
    onNext: () => void;
};
declare const TableRowControls: (props: Props) => JSX.Element;
export default TableRowControls;
