'use client';

import { useState } from 'react';
import { Container, Box } from '@mui/material';
import { AutocompleteField } from '@concepta/react-material-ui';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import { type Category } from './constants';

const uri = '/forms/api/autocomplete';

const Autocomplete = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, selectOption] = useState<string | null>(null);

  const { get } = useDataProvider();

  const { isPending: isLoadingCategories } = useQuery(
    () => get({ uri }),
    true,
    {
      onSuccess(data) {
        const transformedData = data.categories.map((category: Category) => ({
          label: category.name,
          value: String(category.id),
        }));

        setOptions(transformedData);
      },
    },
  );

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      <h1>Autocomplete</h1>
      <Box sx={{ marginTop: '32px' }}>
        <p>Select or type a category:</p>
        <Box sx={{ marginTop: '8px' }}>
          <AutocompleteField
            options={options}
            isLoading={isLoadingCategories}
            currentValue={selectedOption || ''}
            defaultValue={undefined}
            onChange={(value) => selectOption(value)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Autocomplete;
