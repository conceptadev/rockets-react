/// <reference types="react" />
import { RowProps } from '../../Table/types';
interface Props {
    currentRow: RowProps | null;
    onClose: () => void;
    titleSrc?: string;
}
declare const MobileRowModal: ({ currentRow, onClose, titleSrc }: Props) => JSX.Element;
export default MobileRowModal;
