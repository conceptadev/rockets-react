import React, { FC } from 'react';
declare const CustomDialog: StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;
export interface DialogTitleProps {
    children?: React.ReactNode;
    onClose: () => void;
}
declare const CustomDialogTitle: FC<DialogTitleProps>;
export { CustomDialog, CustomDialogTitle };
