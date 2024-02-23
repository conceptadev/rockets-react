import descendingComparator from '../src/components/Table/utils/descendingComparator';

describe('descendingComparator', () => {
  it('should return -1 when b[orderBy] is less than a[orderBy]', () => {
    const a = { name: 'John', age: 30 };
    const b = { name: 'Jane', age: 25 };
    const orderBy = 'age';

    const result = descendingComparator(a, b, orderBy);

    expect(result).toBe(-1);
  });

  it('should return 1 when b[orderBy] is greater than a[orderBy]', () => {
    const a = { name: 'John', age: 25 };
    const b = { name: 'Jane', age: 30 };
    const orderBy = 'age';

    const result = descendingComparator(a, b, orderBy);

    expect(result).toBe(1);
  });

  it('should return 0 when b[orderBy] is equal to a[orderBy]', () => {
    const a = { name: 'John', age: 30 };
    const b = { name: 'Jane', age: 30 };
    const orderBy = 'age';

    const result = descendingComparator(a, b, orderBy);

    expect(result).toBe(0);
  });
});
