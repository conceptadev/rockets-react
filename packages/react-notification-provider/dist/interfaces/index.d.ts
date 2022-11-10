export interface Notification {
    title: string;
    message: string;
    type: 'success' | 'warning' | 'info' | 'error';
}
