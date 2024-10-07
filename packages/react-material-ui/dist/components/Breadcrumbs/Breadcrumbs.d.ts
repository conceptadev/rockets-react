/// <reference types="react" />
type RouteItem = {
    href: string;
    label: string;
};
type Props = {
    routes: RouteItem[];
};
export default function Breadcrumbs({ routes }: Props): JSX.Element;
export {};
