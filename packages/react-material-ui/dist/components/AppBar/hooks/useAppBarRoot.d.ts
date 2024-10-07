/// <reference types="react" />
export type AppBarContextProps = {
    isMobileOpen: boolean;
    toggleMobileOpen: () => void;
};
export declare const AppBarContext: import("react").Context<AppBarContextProps>;
export declare const useAppBarRoot: () => AppBarContextProps;
