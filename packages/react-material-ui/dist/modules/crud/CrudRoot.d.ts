import { PropsWithChildren } from 'react';
import { CrudContextProps, FilterValues } from './useCrudRoot';
type Props = Omit<CrudContextProps, 'filterValues' | 'setFilterValues'> & {
    filterCallback?: (filter: FilterValues) => void;
};
declare const CrudRoot: (props: PropsWithChildren<Props>) => JSX.Element;
export default CrudRoot;
