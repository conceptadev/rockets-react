import { Order } from '../types';
import descendingComparator from './descendingComparator';

/**
 * @param order - Order
 * @param orderBy - Order by
 */
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === Order.Desc
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default getComparator;
