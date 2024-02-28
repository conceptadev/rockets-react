import stableSort from '../src/components/Table/utils/stableSort';

describe('stableSort', () => {
  it('should sort the array in ascending order based on the comparator', () => {
    const array = [5, 2, 8, 1, 9];
    const comparator = (a: number, b: number) => a - b;

    const result = stableSort(array, comparator);

    expect(result).toEqual([1, 2, 5, 8, 9]);
  });

  it('should sort the array in descending order based on the comparator', () => {
    const array = [5, 2, 8, 1, 9];
    const comparator = (a: number, b: number) => b - a;

    const result = stableSort(array, comparator);

    expect(result).toEqual([9, 8, 5, 2, 1]);
  });

  it('should maintain the relative order of equal elements', () => {
    const array = [5, 2, 8, 5, 1, 9, 5];
    const comparator = (a: number, b: number) => a - b;

    const result = stableSort(array, comparator);

    expect(result).toEqual([1, 2, 5, 5, 5, 8, 9]);
  });

  it('should handle an empty array', () => {
    const array: number[] = [];
    const comparator = (a: number, b: number) => a - b;

    const result = stableSort(array, comparator);

    expect(result).toEqual([]);
  });

  it('should handle an array with a single element', () => {
    const array = [5];
    const comparator = (a: number, b: number) => a - b;

    const result = stableSort(array, comparator);

    expect(result).toEqual([5]);
  });
});
