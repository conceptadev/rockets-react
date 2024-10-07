type Assignee = {
    id: string;
};
type ListItem = {
    id: string;
    label: string;
    hide?: boolean;
};
type Settings = {
    key: string;
    assignee: Assignee;
    type: string;
    data: ListItem[];
};
type Props = {
    setListCallback?: (list?: Settings['data']) => void;
    cacheApiPath?: string;
} & Omit<Settings, 'assignee'>;
export declare const useSettingsStorage: (props: Props) => {
    settings: ListItem[];
    updateSettings: (items: Settings['data']) => void;
    clearSettings: () => void;
};
export {};
