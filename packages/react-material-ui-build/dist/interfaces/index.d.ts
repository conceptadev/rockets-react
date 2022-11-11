import React from 'react';
export interface RouteProps {
    caseSensitive?: boolean;
    children?: React.ReactNode;
    Component?: React.FC | null;
    index?: boolean;
    path?: string;
}
export interface PathRouteProps {
    caseSensitive?: boolean;
    children?: React.ReactNode;
    Component?: React.FC | null;
    index?: false;
    path: string;
}
export interface LayoutRouteProps {
    children?: React.ReactNode;
    Component?: React.FC | null;
}
export interface IndexRouteProps {
    Component?: React.FC | null;
    index: true;
}
export interface RouterProps {
    isAuth: boolean;
    NotFoundComponent: React.FC;
    UnauthorizedComponent: React.FC;
    children?: React.ReactNode;
}
