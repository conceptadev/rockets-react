'use client';

import type { UiSchema, WidgetProps } from '@rjsf/utils';
import type { IChangeEvent } from '@rjsf/core';

import { useState } from 'react';
import {
  Box,
  Container,
  Card,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import {
  SchemaForm,
  AutocompleteField,
} from '@concepta/react-material-ui/dist';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import {
  type Category,
  type BookFormData,
  schema,
  widgets,
  getMaskedPageNumber,
  getMaskedCurrency,
} from './constants';

const uri = '/forms/api/autocomplete';

const AutocompleteWidget = (props: WidgetProps) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, selectOption] = useState<string | null>(null);

  const { get } = useDataProvider();

  const { isPending } = useQuery(
    () => get({ uri: `${uri}/categories` }),
    true,
    {
      onSuccess(data) {
        const transformedData = data.map((category: Category) => ({
          label: category.name,
          value: String(category.id),
        }));

        setOptions(transformedData);
      },
    },
  );

  const handleChange = (value: string | null) => {
    selectOption(value);
    props.onChange(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      <label htmlFor="file-input">
        <Typography sx={{ fontSize: '14px' }}>{`${props.label} ${
          props.required ? '*' : ''
        }`}</Typography>
      </label>
      <Box sx={{ padding: '4px 0', width: '100%' }}>
        <AutocompleteField
          fullWidth
          size="small"
          options={options}
          isLoading={isPending}
          currentValue={selectedOption || ''}
          defaultValue={undefined}
          onChange={(value) => handleChange(value)}
        />
      </Box>
    </Box>
  );
};

const uiSchema: UiSchema = {
  categoryId: {
    'ui:widget': AutocompleteWidget,
  },
  pages: {
    'ui:formatter': (value: string) => getMaskedPageNumber(value),
  },
  price: {
    'ui:formatter': (value: string) => getMaskedCurrency(value),
  },
};

const Autocomplete = () => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    categoryId: null,
    pages: '',
    price: '',
  });

  const { post } = useDataProvider();

  const { execute: submitBook, isPending } = useQuery(
    (body) => post({ uri, body }),
    false,
  );

  const handleSubmit = async (values: IChangeEvent<BookFormData>) => {
    await submitBook(values.formData);
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      <h1>Autocomplete</h1>
      <Card sx={{ marginTop: '48px', padding: '24px' }}>
        <SchemaForm.Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={({ formData }) => {
            setFormData(formData);
          }}
          onSubmit={handleSubmit}
          widgets={widgets}
          noHtml5Validate={true}
          showErrorList={false}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={false}
              sx={{ flex: 1 }}
            >
              {isPending ? (
                <CircularProgress sx={{ color: 'white' }} size={24} />
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
        </SchemaForm.Form>
      </Card>
    </Container>
  );
};

export default Autocomplete;
