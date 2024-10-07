/// <reference types="react" />
type Props = {
    type: 'add' | 'remove';
    onClick: () => void;
};
declare const ArrayFieldActionButton: (props: Props) => JSX.Element;
export default ArrayFieldActionButton;
