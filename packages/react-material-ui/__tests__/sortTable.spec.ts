import { Order } from '../src/components/Table/types';
import getComparator from '../src/components/Table/utils/sortTable';

describe('getComparator', () => {
  const data = [
    {
      id: 'sandra',
      name: 'Sandra',
      age: 45,
      company: {
        value: '3456',
        title: 'Company C',
        sortableValue: 'Company C',
      },
    },
    {
      id: 'alex',
      name: 'Alex',
      age: 40,
      company: {
        value: '2345',
        title: 'Company B',
        sortableValue: 'Company B',
      },
    },
    {
      id: 'john',
      name: 'John',
      age: 20,
      company: {
        value: '1234',
        title: 'Company A',
        sortableValue: 'Company A',
      },
    },
    {
      id: 'doe',
      name: 'Doe',
      age: 30,
      company: {
        value: '4567',
        title: 'Company D',
        sortableValue: 'Company D',
      },
    },
  ];

  it('should sort by name (string) in ascending order', () => {
    const sortedData = data.sort((a, b) =>
      getComparator(a, b, Order.Asc, 'name'),
    );
    expect(sortedData).toEqual([
      {
        id: 'alex',
        name: 'Alex',
        age: 40,
        company: {
          value: '2345',
          title: 'Company B',
          sortableValue: 'Company B',
        },
      },
      {
        id: 'doe',
        name: 'Doe',
        age: 30,
        company: {
          value: '4567',
          title: 'Company D',
          sortableValue: 'Company D',
        },
      },
      {
        id: 'john',
        name: 'John',
        age: 20,
        company: {
          value: '1234',
          title: 'Company A',
          sortableValue: 'Company A',
        },
      },
      {
        id: 'sandra',
        name: 'Sandra',
        age: 45,
        company: {
          value: '3456',
          title: 'Company C',
          sortableValue: 'Company C',
        },
      },
    ]);
  });

  it('should sort by name (string) in descending order', () => {
    const sortedData = data.sort((a, b) =>
      getComparator(a, b, Order.Desc, 'name'),
    );
    expect(sortedData).toEqual([
      {
        id: 'sandra',
        name: 'Sandra',
        age: 45,
        company: {
          value: '3456',
          title: 'Company C',
          sortableValue: 'Company C',
        },
      },
      {
        id: 'john',
        name: 'John',
        age: 20,
        company: {
          value: '1234',
          title: 'Company A',
          sortableValue: 'Company A',
        },
      },
      {
        id: 'doe',
        name: 'Doe',
        age: 30,
        company: {
          value: '4567',
          title: 'Company D',
          sortableValue: 'Company D',
        },
      },
      {
        id: 'alex',
        name: 'Alex',
        age: 40,
        company: {
          value: '2345',
          title: 'Company B',
          sortableValue: 'Company B',
        },
      },
    ]);
  });

  it('should sort by age (number) in ascending order', () => {
    const sortedData = data.sort((a, b) =>
      getComparator(a, b, Order.Asc, 'age'),
    );
    expect(sortedData).toEqual([
      {
        id: 'john',
        name: 'John',
        age: 20,
        company: {
          value: '1234',
          title: 'Company A',
          sortableValue: 'Company A',
        },
      },
      {
        id: 'doe',
        name: 'Doe',
        age: 30,
        company: {
          value: '4567',
          title: 'Company D',
          sortableValue: 'Company D',
        },
      },
      {
        id: 'alex',
        name: 'Alex',
        age: 40,
        company: {
          value: '2345',
          title: 'Company B',
          sortableValue: 'Company B',
        },
      },
      {
        id: 'sandra',
        name: 'Sandra',
        age: 45,
        company: {
          value: '3456',
          title: 'Company C',
          sortableValue: 'Company C',
        },
      },
    ]);
  });

  it('should sort by age (number) in descending order', () => {
    const sortedData = data.sort((a, b) =>
      getComparator(a, b, Order.Desc, 'age'),
    );
    expect(sortedData).toEqual([
      {
        id: 'sandra',
        name: 'Sandra',
        age: 45,
        company: {
          value: '3456',
          title: 'Company C',
          sortableValue: 'Company C',
        },
      },
      {
        id: 'alex',
        name: 'Alex',
        age: 40,
        company: {
          value: '2345',
          title: 'Company B',
          sortableValue: 'Company B',
        },
      },
      {
        id: 'doe',
        name: 'Doe',
        age: 30,
        company: {
          value: '4567',
          title: 'Company D',
          sortableValue: 'Company D',
        },
      },
      {
        id: 'john',
        name: 'John',
        age: 20,
        company: {
          value: '1234',
          title: 'Company A',
          sortableValue: 'Company A',
        },
      },
    ]);
  });

  it('should sort by company (object with sortableValue) in ascending order', () => {
    const sortedData = data.sort((a, b) =>
      getComparator(a, b, Order.Asc, 'company'),
    );
    expect(sortedData).toEqual([
      {
        id: 'john',
        name: 'John',
        age: 20,
        company: {
          value: '1234',
          title: 'Company A',
          sortableValue: 'Company A',
        },
      },
      {
        id: 'alex',
        name: 'Alex',
        age: 40,
        company: {
          value: '2345',
          title: 'Company B',
          sortableValue: 'Company B',
        },
      },
      {
        id: 'sandra',
        name: 'Sandra',
        age: 45,
        company: {
          value: '3456',
          title: 'Company C',
          sortableValue: 'Company C',
        },
      },
      {
        id: 'doe',
        name: 'Doe',
        age: 30,
        company: {
          value: '4567',
          title: 'Company D',
          sortableValue: 'Company D',
        },
      },
    ]);
  });

  it('should sort by company (object with sortableValue) in descending order', () => {
    const sortedData = data.sort((a, b) =>
      getComparator(a, b, Order.Desc, 'company'),
    );
    expect(sortedData).toEqual([
      {
        id: 'doe',
        name: 'Doe',
        age: 30,
        company: {
          value: '4567',
          title: 'Company D',
          sortableValue: 'Company D',
        },
      },
      {
        id: 'sandra',
        name: 'Sandra',
        age: 45,
        company: {
          value: '3456',
          title: 'Company C',
          sortableValue: 'Company C',
        },
      },
      {
        id: 'alex',
        name: 'Alex',
        age: 40,
        company: {
          value: '2345',
          title: 'Company B',
          sortableValue: 'Company B',
        },
      },
      {
        id: 'john',
        name: 'John',
        age: 20,
        company: {
          value: '1234',
          title: 'Company A',
          sortableValue: 'Company A',
        },
      },
    ]);
  });
});
