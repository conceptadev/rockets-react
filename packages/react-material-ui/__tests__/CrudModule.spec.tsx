/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import CrudModule, { ModuleProps } from '../src/modules/crud';
import { RJSFSchema } from '@rjsf/utils';

const mockData = [
  {
    id: '1',
    name: 'Test Name 1',
    email: 'testname1@test.com',
  },
  {
    id: '2',
    name: 'Test Name 2',
    email: 'testname3@test.com',
  },
];

jest.mock('next/navigation', () => ({
  useRouter: () => {
    return {
      replace: jest.fn(),
    };
  },
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@concepta/react-data-provider', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    del: jest.fn(),
  })),
  useQuery: jest.fn(() => ({
    status: 'success',
    data: {
      count: 2,
      total: 2,
      page: 1,
      pageCount: 1,
      data: mockData,
    },
    error: undefined,
    isPending: false,
    execute: jest.fn(),
    refresh: jest.fn(),
  })),
}));

describe('CrudModule Component', () => {
  const schema: RJSFSchema = {
    type: 'object',
    properties: {
      name: { type: 'string', title: 'Name' },
      email: { type: 'string', title: 'Email' },
    },
  };

  const props: ModuleProps = {
    title: 'Test title',
    resource: 'user',
    tableProps: {
      tableSchema: [
        {
          id: 'name',
          label: 'Name',
        },
        {
          id: 'email',
          label: 'Email',
        },
      ],
      filters: [
        {
          id: 'testFilter',
          label: 'Test Filter',
          operator: 'contL',
          type: 'text',
          columns: 4,
        },
      ],
    },
    createFormProps: {
      formSchema: schema,
    },
    detailsFormProps: {
      formSchema: schema,
    },
    editFormProps: {
      formSchema: schema,
    },
  };

  // General tests

  it('should render correctly', () => {
    const { getByTestId } = render(<CrudModule {...props} />);

    const dropDownButton = getByTestId('SettingsSuggestIcon');
    expect(dropDownButton).toBeInTheDocument();
  });

  it('should render title correctly', () => {
    const { getAllByText } = render(<CrudModule {...props} />);

    // title will be rendered twice as it also appears in the page breadcrumbs
    const titleElements = getAllByText('Test title');
    expect(titleElements).toHaveLength(2);
  });

  it('formContainerVariation displays the form in a Drawer according to its value', async () => {
    const { getByText, findByRole } = render(
      <CrudModule {...props} formContainerVariation="drawer" />,
    );

    const addButton = getByText('Add new');
    addButton && fireEvent.click(addButton);

    const presentation = await findByRole('presentation');
    expect(presentation).toBeInTheDocument();
    expect(presentation).toHaveClass('MuiDrawer-root');
  });

  it('formContainerVariation displays the form in a Modal according to its value', async () => {
    const { getByText, findAllByRole } = render(
      <CrudModule {...props} formContainerVariation="modal" />,
    );

    const addButton = getByText('Add new');
    addButton && fireEvent.click(addButton);

    const presentation = await findAllByRole('presentation');
    expect(presentation).toHaveLength(2);
    expect(presentation[0]).toHaveClass('MuiDialog-root');
  });

  // Table tests

  it('should render correct table headers', () => {
    const { container } = render(<CrudModule {...props} />);
    const tableHeader = container.querySelector('.MuiTableHead-root');
    const tableSchema = props.tableProps.tableSchema;

    for (let i = 0; i < tableSchema.length; i++) {
      const headerLabel = tableSchema[i].label;
      expect(tableHeader).toHaveTextContent(headerLabel);
    }
  });

  it('should render correct table rows', () => {
    const { container } = render(<CrudModule {...props} />);
    const tableBody = container.querySelector('tbody');

    const tableRows = tableBody?.querySelectorAll('tr');
    expect(tableBody).toBeInTheDocument();

    expect(tableRows).toHaveLength(2);

    mockData.forEach((data, index) => {
      expect(tableRows?.[index]).toHaveTextContent(data.name);
      expect(tableRows?.[index]).toHaveTextContent(data.email);
    });
  });

  it('hideActionsColumn prop should hide the action buttons', () => {
    const { container, queryAllByTestId } = render(
      <CrudModule
        {...props}
        tableProps={{ ...props.tableProps, hideActionsColumn: true }}
      />,
    );
    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();

    const editIcons = queryAllByTestId('EditIcon');
    const deleteIcons = queryAllByTestId('DeleteIcon');
    const chevronRightIcons = queryAllByTestId('ChevronRightIcon');

    expect(editIcons).toHaveLength(0);
    expect(deleteIcons).toHaveLength(0);
    expect(chevronRightIcons).toHaveLength(0);
  });

  it('hideDeleteButton prop should hide the delete icon from the table rows', () => {
    const { container, queryAllByTestId } = render(
      <CrudModule {...props} hideDeleteButton />,
    );
    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();

    const editIcons = queryAllByTestId('EditIcon');
    const deleteIcons = queryAllByTestId('DeleteIcon');
    const chevronRightIcons = queryAllByTestId('ChevronRightIcon');

    expect(editIcons).toHaveLength(2);
    expect(deleteIcons).toHaveLength(0);
    expect(chevronRightIcons).toHaveLength(2);
  });

  // Forms tests

  it('should hide the "add new" button if createFormProps is not passed', () => {
    const _props = { ...props, createFormProps: undefined };
    const { queryByText } = render(<CrudModule {..._props} />);

    const addButton = queryByText('Add new');
    expect(addButton).not.toBeInTheDocument();
  });

  it('should open create form on "add new" button click', async () => {
    const { getByText, getByLabelText, findByRole } = render(
      <CrudModule {...props} />,
    );

    const addButton = getByText('Add new');
    addButton && fireEvent.click(addButton);

    await findByRole('presentation');

    const schemaProps = schema.properties;

    for (const key in schemaProps) {
      const prop = schemaProps[key];
      if (typeof prop !== 'boolean') {
        expect(prop.title).toBeTruthy();
        prop.title && expect(getByLabelText(prop.title)).toBeInTheDocument();
      }
    }
  });

  it('should show "save" and "close" button on create form', async () => {
    const { getByText, findByRole } = render(<CrudModule {...props} />);

    const addButton = getByText('Add new');
    addButton && fireEvent.click(addButton);

    await findByRole('presentation');

    const saveButton = getByText('Save');
    const closeButton = getByText('Close');

    expect(saveButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it('should hide edit icon if editFormProps is not passed', () => {
    const { editFormProps, ...restProps } = props;

    const { container, queryAllByTestId } = render(
      <CrudModule {...restProps} />,
    );

    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();

    const editIcons = queryAllByTestId('edit-button');
    expect(editIcons).toHaveLength(0);
  });

  it('should open edit form on edit button click', async () => {
    const { container, queryAllByTestId, findByRole, getByLabelText } = render(
      <CrudModule {...props} />,
    );
    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();

    const editIcons = queryAllByTestId('edit-button');

    editIcons[0] && fireEvent.click(editIcons[0]);

    await findByRole('presentation');

    const schemaProps = schema.properties;

    for (const key in schemaProps) {
      const prop = schemaProps[key];
      if (typeof prop !== 'boolean') {
        expect(prop.title).toBeTruthy();
        prop.title && expect(getByLabelText(prop.title)).toBeInTheDocument();
      }
    }
  });

  it('should show "save" and "close" button on edit form', async () => {
    const { container, queryAllByTestId, findByRole, getByText } = render(
      <CrudModule {...props} />,
    );
    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();

    const editIcons = queryAllByTestId('edit-button');

    editIcons[0] && fireEvent.click(editIcons[0]);

    await findByRole('presentation');

    const saveButton = getByText('Save');
    const closeButton = getByText('Close');

    expect(saveButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it('should hide details icon if detailsFormProps is not passed', () => {
    const _props = { ...props, detailsFormProps: undefined };
    const { queryAllByTestId } = render(<CrudModule {..._props} />);

    const chevronRightIcons = queryAllByTestId('details-button');
    expect(chevronRightIcons).toHaveLength(0);
  });

  it('should open details form on details button click / inputs should be disabled', async () => {
    const { container, queryAllByTestId, findByRole, getByLabelText } = render(
      <CrudModule {...props} />,
    );
    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();

    const chevronRightIcons = queryAllByTestId('details-button');

    chevronRightIcons[0] && fireEvent.click(chevronRightIcons[0]);

    await findByRole('presentation');

    const schemaProps = schema.properties;

    for (const key in schemaProps) {
      const prop = schemaProps[key];
      if (typeof prop !== 'boolean') {
        expect(prop.title).toBeTruthy();
        prop.title && expect(getByLabelText(prop.title)).toBeInTheDocument();
        prop.title && getByLabelText(prop.title).hasAttribute('disabled');
      }
    }
  });

  it('details form should show only the "close" button', async () => {
    const { container, queryAllByTestId, findByRole, getByText, queryByText } =
      render(<CrudModule {...props} />);
    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();

    const chevronRightIcons = queryAllByTestId('details-button');

    chevronRightIcons[0] && fireEvent.click(chevronRightIcons[0]);

    await findByRole('presentation');

    const saveButton = queryByText('Save');
    const closeButton = getByText('Close');

    expect(saveButton).not.toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  // FormProps Tests

  it('submitButtonTitle and cancelButtonTitle props should change the buttons labels correctly', async () => {
    const { getByText, findByRole } = render(
      <CrudModule
        {...props}
        createFormProps={{
          ...schema,
          submitButtonTitle: 'TestSubmit',
          cancelButtonTitle: 'TestCancel',
        }}
      />,
    );

    const addButton = getByText('Add new');
    addButton && fireEvent.click(addButton);

    await findByRole('presentation');

    const submitButton = getByText('TestSubmit');
    const cancelButton = getByText('TestCancel');

    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});
