import getComparator from '../src/components/Table/utils/getComparator';
import { Order } from '../src/components/Table/types';

describe('getComparator', () => {
  it('should return a descending ordered array when order is Desc', () => {
    const comparator = getComparator(Order.Desc, 'age');

    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 20 },
    ];

    const sortedData = data.sort(comparator);

    expect(sortedData).toEqual([
      { name: 'Jane', age: 30 },
      { name: 'John', age: 25 },
      { name: 'Bob', age: 20 },
    ]);
  });

  it('should return an ascending ordered array when order is Asc', () => {
    const comparator = getComparator(Order.Asc, 'age');

    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 20 },
    ];

    const sortedData = data.sort(comparator);

    expect(sortedData).toEqual([
      { name: 'Bob', age: 20 },
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ]);
  });
});
